
const CATEGORIES = /*__CATEGORIES__*/;

const ARTICLES_CONTENT = /*__ARTICLES_CONTENT__*/;

const ARTICLES_CONTENT_DE = /*__ARTICLES_CONTENT_DE__*/;

// ── i18n ──────────────────────────────────────────────
const I18N = /*__I18N__*/;

// ── State ─────────────────────────────────────────────
const lang = ref('en');
const codeBlocks = {};
const currentView = ref('home');
const currentSlug = ref(null);
const searchQuery = ref('');
const sidebarCollapsed = ref(false);
const currentTag = ref(null);
const expandedCategories = ref(new Set(['Getting Started']));
const currentCategory = ref(null);

function t(key) { return (I18N[lang.value] && I18N[lang.value][key]) || I18N.en[key] || key; }
function toggleLang() { lang.value = lang.value === 'en' ? 'de' : 'en'; }

// ── Computed ──────────────────────────────────────────
const allArticles = computed(() => CATEGORIES.flatMap(cat => cat.articles.map(art => ({ ...art, category: cat.name }))));
const currentArticle = computed(() => currentSlug.value ? allArticles.value.find(a => a.slug === currentSlug.value) || null : null);
const currentCategoryObj = computed(() => currentCategory.value ? CATEGORIES.find(c => c.name === currentCategory.value) || null : null);

function getContent(slug) {
  if (lang.value === 'de' && ARTICLES_CONTENT_DE[slug]) return ARTICLES_CONTENT_DE[slug];
  return ARTICLES_CONTENT[slug] || '';
}

const renderedContent = computed(() => {
  if (!currentArticle.value || currentArticle.value.status === 'coming_soon') return '';
  return renderMarkdown(getContent(currentSlug.value));
});

const tocItems = computed(() => {
  if (!currentArticle.value) return [];
  const content = getContent(currentSlug.value);
  if (!content) return [];
  return content.split('\n')
    .filter(l => l.startsWith('## ') || l.startsWith('### '))
    .map(l => ({ text: l.replace(/^#{2,3} /, ''), anchor: slugify(l.replace(/^#{2,3} /, '')), level: l.startsWith('### ') ? 3 : 2 }));
});

const searchResults = computed(() => {
  const q = searchQuery.value.toLowerCase();
  if (q.length < 2) return [];
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return allArticles.value
    .filter(a => a.status !== 'coming_soon')
    .map(art => {
      let score = 0;
      if (art.title.toLowerCase().includes(q)) score += 10;
      if (art.tags.some(t => t.includes(q))) score += 5;
      const content = getContent(art.slug);
      score += (content.toLowerCase().match(new RegExp(esc, 'g')) || []).length;
      let snippet = '';
      if (content) {
        const idx = content.toLowerCase().indexOf(q);
        const start = Math.max(0, idx >= 0 ? idx - 55 : 0);
        const raw = content.slice(start, start + 140)
          .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
          .replace(/[#*`|:\[\]()]+/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        snippet = (start > 0 ? '...' : '') + hlText(raw) + '...';
      }
      return { ...art, score, snippet };
    })
    .filter(a => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
});

const tagResults = computed(() => currentTag.value ? allArticles.value.filter(a => a.tags.includes(currentTag.value) && a.status !== 'coming_soon') : []);

const popularTags = computed(() => {
  const cnt = {};
  allArticles.value.filter(a => a.status !== 'coming_soon').forEach(a => a.tags.forEach(tg => { cnt[tg] = (cnt[tg] || 0) + 1; }));
  return Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([tg]) => tg);
});

const publishedCount = computed(() => allArticles.value.filter(a => a.status === 'published').length);
const totalCount = computed(() => allArticles.value.length);

const prevArticle = computed(() => {
  if (!currentArticle.value) return null;
  const flat = allArticles.value;
  const idx = flat.findIndex(a => a.slug === currentSlug.value);
  return idx > 0 ? flat[idx - 1] : null;
});

const nextArticle = computed(() => {
  if (!currentArticle.value) return null;
  const flat = allArticles.value;
  const idx = flat.findIndex(a => a.slug === currentSlug.value);
  return idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;
});

// ── Navigation ────────────────────────────────────────
function navigateTo(slug) {
  const art = allArticles.value.find(a => a.slug === slug);
  if (!art) {
    console.warn('KB: unknown slug', slug);
    return;
  }
  currentSlug.value = slug;
  currentView.value = 'article';
  const s = new Set(expandedCategories.value);
  s.add(art.category);
  expandedCategories.value = s;
  setTimeout(() => { document.getElementById('kb-content')?.scrollTo(0, 0); }, 0);
}

function goHome() {
  currentView.value = 'home';
  currentSlug.value = null;
  currentCategory.value = null;
  searchQuery.value = '';
  currentTag.value = null;
  expandedCategories.value = new Set(['Getting Started']);
  setTimeout(() => { document.getElementById('kb-content')?.scrollTo(0, 0); }, 0);
}

function openCategory(name) {
  currentCategory.value = name;
  currentView.value = 'category';
  currentSlug.value = null;
  const s = new Set(expandedCategories.value);
  s.add(name);
  expandedCategories.value = s;
  setTimeout(() => { document.getElementById('kb-content')?.scrollTo(0, 0); }, 0);
}

function toggleCategory(name) {
  const s = new Set(expandedCategories.value);
  if (s.has(name)) { s.delete(name); } else { s.add(name); }
  expandedCategories.value = s;
}

function filterByTag(tag) {
  currentTag.value = tag;
  currentView.value = 'tag';
  setTimeout(() => { document.getElementById('kb-content')?.scrollTo(0, 0); }, 0);
}

function onSearch() {
  if (searchQuery.value.length >= 2) { currentView.value = 'search'; }
  else if (!searchQuery.value) { currentView.value = currentSlug.value ? 'article' : 'home'; }
}

function clearSearch() {
  searchQuery.value = '';
  currentView.value = currentSlug.value ? 'article' : 'home';
}

function hlText(text) {
  if (!searchQuery.value || searchQuery.value.length < 2) return text;
  const esc = searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(esc, 'gi'), m => '<mark style="background:#FF79C9;color:#4D2B41;border-radius:2px;padding:0 2px;font-weight:700;">' + m + '</mark>');
}

function scrollToAnchor(anchor) {
  const el = document.getElementById(anchor);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleContentClick(e) {
  const btn = e.target.closest('[data-copy-id]');
  if (btn) {
    if (btn.dataset.copying === '1') return;
    const code = codeBlocks[btn.getAttribute('data-copy-id')];
    if (code) {
      btn.dataset.copying = '1';
      navigator.clipboard.writeText(code).catch(() => {});
      const originalText = btn.textContent;
      const originalBg = btn.style.background;
      btn.textContent = 'Copied!';
      btn.style.background = 'rgba(30,73,71,.4)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = originalBg;
        delete btn.dataset.copying;
      }, 2000);
    }
    return;
  }
  const link = e.target.closest('[data-nav]');
  if (link) { e.preventDefault(); navigateTo(link.getAttribute('data-nav')); }
}

// ── Markdown renderer ─────────────────────────────────
function slugify(t) { return t.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function escHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function renderInline(t) {
  const lnk = 'color:#FF79C9;font-weight:600;text-decoration:none;border-bottom:1px solid rgba(255,121,201,.4);padding-bottom:1px;cursor:pointer;';
  return t
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(255,121,201,.14);color:#FF79C9;padding:.1em .42em;border-radius:4px;font-size:.85em;font-family:\'JetBrains Mono\',\'Fira Code\',monospace;">$1</code>')
    .replace(/\u2192 \[([^\]]+)\]\(#([^)]+)\)/g, function(_, txt, slug) { return '<a data-nav="' + slug + '" href="#" style="' + lnk + '">\u2192 ' + txt + '</a>'; })
    .replace(/\[([^\]]+)\]\(#([^)]+)\)/g, function(_, txt, slug) { return '<a data-nav="' + slug + '" href="#" style="' + lnk + '">' + txt + '</a>'; })
    .replace(/\[([^\]]+)\]\((https?[^)]+)\)/g, function(_, txt, url) { return '<a href="' + url + '" target="_blank" style="' + lnk + '">' + txt + ' \u2197</a>'; });
}

function renderMarkdown(md) {
  if (!md) return '';
  Object.keys(codeBlocks).forEach(k => delete codeBlocks[k]);
  const lines = md.split('\n');
  let html = '', i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'code';
      let code = '', j = i + 1;
      while (j < lines.length && !lines[j].startsWith('```')) { code += lines[j] + '\n'; j++; }
      code = code.trimEnd();
      const id = 'cb' + (Object.keys(codeBlocks).length + 1);
      codeBlocks[id] = code;
      html += '<div style="border-radius:10px;overflow:hidden;margin:1.25rem 0;background:#1a0f16;border:1px solid rgba(255,121,201,.15);"><div style="display:flex;justify-content:space-between;align-items:center;padding:.4rem .9rem;background:#2d1524;"><span style="font-size:.6rem;font-weight:800;color:#FF79C9;text-transform:uppercase;letter-spacing:.12em;font-family:\'Sofia Sans\',sans-serif;">' + escHtml(lang) + '</span><button style="font-size:.68rem;background:rgba(255,121,201,.15);color:#FF79C9;border:1px solid rgba(255,121,201,.25);border-radius:4px;padding:.15rem .55rem;cursor:pointer;font-family:\'Sofia Sans\',sans-serif;" data-copy-id="' + id + '">Copy</button></div><pre style="margin:0;padding:1rem;overflow-x:auto;background:transparent;"><code class="language-' + lang + '" style="font-family:\'JetBrains Mono\',\'Fira Code\',monospace;font-size:.8rem;line-height:1.7;background:none;padding:0;color:#e8d5f5;">' + escHtml(code) + '</code></pre></div>';
      i = j + 1; continue;
    }
    if (line.startsWith(':::')) {
      const type = line.slice(3).trim();
      let content = '', j = i + 1;
      while (j < lines.length && !lines[j].startsWith(':::')) { content += lines[j] + '\n'; j++; }
      content = content.trim();
      if (type === 'next') {
        // Skipped — navigation handled by prev/next buttons
      } else {
        const icons = { info: 'info', warning: 'warning_amber', tip: 'lightbulb' };
        const cBg = { info:'rgba(30,73,71,.15)', warning:'rgba(255,121,201,.1)', tip:'rgba(255,121,201,.08)' };
        const cBorder = { info:'#1E4947', warning:'#FF79C9', tip:'rgba(255,121,201,.6)' };
        const cIconColor = { info:'#1E4947', warning:'#FF79C9', tip:'#FF79C9' };
        const bg = cBg[type] || cBg.info;
        const border = cBorder[type] || cBorder.info;
        const ic = cIconColor[type] || cIconColor.info;
        html += '<div style="border-radius:8px;padding:.8rem 1rem;margin:1.1rem 0;display:flex;gap:.75rem;align-items:flex-start;background:' + bg + ';border-left:3px solid ' + border + ';"><span class="material-icons-round" style="font-size:18px;flex-shrink:0;margin-top:2px;color:' + ic + ';">' + (icons[type] || 'info') + '</span><div style="line-height:1.78;">' + renderInline(content) + '</div></div>';
      }
      i = j + 1; continue;
    }
    if (line.startsWith('## ')) { const tt = line.slice(3); html += '<h2 id="' + slugify(tt) + '" style="font-size:1.4rem;font-weight:800;margin:2rem 0 .75rem;color:var(--kb-h2,#4D2B41);letter-spacing:-.02em;padding-bottom:.5rem;border-bottom:2px solid rgba(255,121,201,.3);">' + renderInline(tt) + '</h2>'; i++; continue; }
    if (line.startsWith('### ')) { const tt = line.slice(4); html += '<h3 id="' + slugify(tt) + '" style="font-size:1.05rem;font-weight:700;margin:1.5rem 0 .5rem;color:inherit;">' + renderInline(tt) + '</h3>'; i++; continue; }
    if (line.startsWith('#### ')) { html += '<h4 style="font-size:.92rem;font-weight:700;margin:1rem 0 .25rem;color:inherit;">' + renderInline(line.slice(5)) + '</h4>'; i++; continue; }
    if (line.startsWith('|')) {
      let tLines = [];
      while (i < lines.length && lines[i].startsWith('|')) { tLines.push(lines[i]); i++; }
      tLines = tLines.filter(l => !l.match(/^\|[\s\-:]+[\|\s\-:]+\|?\s*$/));
      if (tLines.length > 0) {
        const heads = tLines[0].split('|').slice(1, -1).map(c => c.trim());
        const rows = tLines.slice(1);
      html += '<div style="overflow:hidden;border-radius:10px;border:1px solid rgba(150,90,120,.22);margin:1.5rem 0;"><table style="width:100%;border-collapse:collapse;font-size:.87rem;"><thead><tr>' + heads.map(c => '<th style="background:#4D2B41;color:#FFEFF8;padding:.62rem 1rem;text-align:left;font-weight:800;font-size:.68rem;letter-spacing:.07em;text-transform:uppercase;">' + renderInline(c) + '</th>').join('') + '</tr></thead><tbody>' + rows.map((r, ri) => '<tr>' + r.split('|').slice(1, -1).map(c => '<td style="padding:.65rem 1rem;border-bottom:' + (ri === rows.length - 1 ? 'none' : '1px solid rgba(150,90,120,.18)') + ';vertical-align:top;line-height:1.68;">' + renderInline(c.trim()) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
      }
      continue;
    }
    if (/^\d+\. /.test(line)) {
      let items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, '')); i++; }
      html += '<div style="padding:0;margin:.9rem 0;">' + items.map((it, idx) => '<div style="display:flex;gap:.85rem;align-items:flex-start;margin:.75rem 0;"><span style="min-width:1.7rem;height:1.7rem;background:#FF79C9;color:#4D2B41;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:900;flex-shrink:0;margin-top:.18rem;">' + (idx + 1) + '</span><div style="line-height:1.82;">' + renderInline(it) + '</div></div>').join('') + '</div>';
      continue;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      let items = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) { items.push(lines[i].slice(2)); i++; }
      html += '<ul style="padding-left:1.5rem;margin:.7rem 0;">' + items.map(it => '<li style="margin:.42rem 0;line-height:1.82;list-style:disc;">' + renderInline(it) + '</li>').join('') + '</ul>';
      continue;
    }
    if (line.match(/^-{3,}$/) || line.match(/^\*{3,}$/)) { html += '<div style="border:none;border-top:1px solid rgba(180,100,150,.25);margin:2rem 0;"></div>'; i++; continue; }
    if (!line.trim()) { html += '<div style="height:.4rem"></div>'; i++; continue; }
    html += '<p style="margin:.7rem 0;line-height:1.85;">' + renderInline(line) + '</p>';
    i++;
  }
  return html;
}

// ── Lifecycle ─────────────────────────────────────────
// ── Dark mode detection via system preference ──────────
const isDark = ref(false);
const tagSt = computed(() => ({
  display: 'inline-flex', alignItems: 'center',
  background: isDark.value ? '#FF79C9' : '#4D2B41',
  color: isDark.value ? '#4D2B41' : '#FF79C9',
  fontSize: '.68rem', fontWeight: 700, padding: '.22rem .65rem',
  borderRadius: '9999px', cursor: 'pointer', border: 'none', lineHeight: 1, whiteSpace: 'nowrap'
}));
const tagStSm = computed(() => ({ ...tagSt.value, fontSize: '.63rem', padding: '.14rem .48rem' }));

function applyHighlight() {
  setTimeout(() => {
    if (!window.hljs) return;
    document.querySelectorAll('#kb-content pre code:not([data-highlighted])').forEach(block => {
      window.hljs.highlightElement(block);
    });
  }, 80);
}

watch(renderedContent, () => { applyHighlight(); }, { flush: 'post' });

onMounted(() => {
  // Dark mode via system media query
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  isDark.value = mq.matches;
  mq.addEventListener('change', e => { isDark.value = e.matches; });

  // Fonts
  ['https://fonts.googleapis.com/css2?family=Sofia+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap',
   'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
   'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css'
  ].forEach(href => {
    if (!document.querySelector('[href="' + href + '"]')) {
      const el = document.createElement('link');
      el.rel = 'stylesheet'; el.href = href;
      document.head.appendChild(el);
    }
  });

  // highlight.js
  if (!window.hljs) {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    s.onload = applyHighlight;
    document.head.appendChild(s);
  }

  expandedCategories.value = new Set(['Getting Started']);
});

const setupReturn = {
  CATEGORIES, lang, sidebarCollapsed, searchQuery, currentView, currentSlug, currentTag,
  expandedCategories, currentCategory, currentArticle, currentCategoryObj, renderedContent, tocItems, searchResults,
  tagResults, popularTags, publishedCount, totalCount, prevArticle, nextArticle,
  t, toggleLang, navigateTo, goHome, openCategory, toggleCategory, filterByTag,
  onSearch, clearSearch, hlText, handleContentClick, scrollToAnchor,
  tagSt, tagStSm, isDark
};
