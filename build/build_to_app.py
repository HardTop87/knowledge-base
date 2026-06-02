#!/usr/bin/env python3
"""
build_to_app.py  —  Repo (manifest.json + en/*.md + de/*.md + app/script.template.js)
                    -> app/script.rebuilt.js  (das fertige Vue-Script fuer die App)

Der eigentliche Push in die App passiert ueber CoCoCo-MCP (update_custom_app)
und wird bewusst manuell ausgeloest (siehe README). Dieses Skript erzeugt nur
das Script-Artefakt und prueft die interne Konsistenz.

Lauf:  python3 build/build_to_app.py
"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

def body(lang, slug):
    txt = (ROOT / lang / f'{slug}.md').read_text(encoding='utf-8')
    parts = txt.split('---\n\n', 1)
    if len(parts) != 2:
        raise ValueError(f'Kein Frontmatter/Body-Trenner in {lang}/{slug}.md')
    return parts[1]

def main():
    manifest = json.loads((ROOT / 'manifest.json').read_text(encoding='utf-8'))
    tmpl = (ROOT / 'app' / 'script.template.js').read_text(encoding='utf-8')

    # CATEGORIES = manifest categories ohne das repo-interne 'id'-Feld
    CATEGORIES = [{'name': c['name'], 'icon': c['icon'],
                   'description': c['description'], 'articles': c['articles']}
                  for c in manifest['categories']]

    # Konsistenz: jede Registry-Slug braucht en+de Datei; Parity pruefen
    en_files = {p.stem for p in (ROOT / 'en').glob('*.md')}
    de_files = {p.stem for p in (ROOT / 'de').glob('*.md')}
    if en_files != de_files:
        raise SystemExit(f'EN/DE-Parity verletzt: {sorted(en_files ^ de_files)}')

    EN, DE = {}, {}
    for c in manifest['categories']:
        for a in c['articles']:
            s = a['slug']
            be, bd = body('en', s), body('de', s)
            # coming_soon-Artikel haben leere Bodies -> nicht in die Content-Maps
            if a['status'] != 'coming_soon':
                if not be or not bd:
                    raise SystemExit(f'Artikel {s} ist published, aber Body fehlt')
            if be: EN[s] = be
            if bd: DE[s] = bd

    j = lambda o: json.dumps(o, ensure_ascii=False)
    rebuilt = (tmpl.replace('/*__CATEGORIES__*/', j(CATEGORIES))
                   .replace('/*__ARTICLES_CONTENT__*/', j(EN))
                   .replace('/*__ARTICLES_CONTENT_DE__*/', j(DE))
                   .replace('/*__I18N__*/', j(manifest['i18n'])))
    for marker in ['/*__CATEGORIES__*/', '/*__ARTICLES_CONTENT__*/',
                   '/*__ARTICLES_CONTENT_DE__*/', '/*__I18N__*/']:
        if marker in rebuilt:
            raise SystemExit(f'Marker nicht ersetzt: {marker}')

    out = ROOT / 'app' / 'script.rebuilt.js'
    out.write_text(rebuilt, encoding='utf-8')
    print(f'OK  -> {out}  ({len(rebuilt)} chars)')
    print(f'    EN bodies: {len(EN)}  DE bodies: {len(DE)}  '
          f'categories: {len(CATEGORIES)}')

if __name__ == '__main__':
    main()
