#!/usr/bin/env python3
"""
extract_from_app.py  —  EINMALIGER Bootstrap (bereits ausgefuehrt).
Liest das via CoCoCo:read_custom_app gelesene App-JSON und schreibt
manifest.json + en/*.md + de/*.md + app/*. Hier als Referenz aufbewahrt;
im Normalbetrieb ist das Repo die Quelle der Wahrheit und es wird NICHT
re-extrahiert (das wuerde lokale Aenderungen ueberschreiben).

Lauf:  python3 build/extract_from_app.py <read_custom_app.json>
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OPENB, CLOSEB = {'{': '}', '[': ']'}, {'}', ']'}

def literal(s, name):
    i = re.search(r'(?:const|let|var)\s+' + re.escape(name) + r'\s*=\s*', s).end()
    while s[i] not in OPENB: i += 1
    start, depth, q, esc = i, 0, None, False
    while i < len(s):
        c = s[i]
        if q:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == q: q = None
        else:
            if c in ('"', "'", '`'): q = c
            elif c == '/' and s[i+1] == '/': i = s.index('\n', i)
            elif c == '/' and s[i+1] == '*': i = s.index('*/', i) + 1
            elif c in OPENB: depth += 1
            elif c in CLOSEB:
                depth -= 1
                if depth == 0: return s[start:i+1]
        i += 1

def main(path):
    raw = json.load(open(path))
    inner = json.loads(raw[0]['text']) if isinstance(raw, list) else raw
    print('Hinweis: Auswertung der JS-Literale via Node empfohlen '
          '(EN nutzt einfache Quotes, DE Template-Literals).')
    print('Gefundene Bloecke:',
          [n for n in ['CATEGORIES','ARTICLES_CONTENT','ARTICLES_CONTENT_DE','I18N']
           if literal(inner['script'], n)])

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(0)
    main(sys.argv[1])
