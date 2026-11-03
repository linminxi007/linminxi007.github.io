"""Check analytics coverage and resource resolution in the rendered Quarto site."""
from pathlib import Path
from html.parser import HTMLParser

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.scripts = []
        self.links = []
        self.ids = []
        self.note = False
        self.body = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'script': self.scripts.append(a.get('src', ''))
        if tag == 'link': self.links.append(a.get('href', ''))
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'body': self.note = 'reading-page' in a.get('class', '')
        if 'article-body' in a.get('class', '').split(): self.body = True

root = Path('_site')
pages = []
notes = []
for path in root.rglob('*.html'):
    html = path.read_text(encoding='utf-8')
    if 'data-version="3.1"' not in html or '<body' not in html: continue  # copied attachments are not site pages
    parsed = Page()
    parsed.feed(html)
    scripts = [s for s in parsed.scripts if 'assets/analytics.js?' in s]
    assert len(scripts) == 1, (path, scripts)
    assert not any('googletagmanager.com' in s for s in parsed.scripts), path
    for src in scripts + [s for s in parsed.links if 'assets/analytics.css?' in s]:
        assert (path.parent / src.split('?')[0]).is_file(), (path, src)
    assert sum('assets/analytics.css?' in s for s in parsed.links) == 1, path
    assert parsed.ids.count('analytics-consent') == 1, path
    assert parsed.ids.count('analytics-settings') == 1, path
    assert 'privacy.html' in html, path
    if parsed.note:
        assert parsed.body, path
        notes.append(path)
    pages.append(path)
assert root.joinpath('index.html') in pages
assert root.joinpath('about.html') in pages
assert root.joinpath('privacy.html') in pages
assert any('.en.html' in p.name for p in notes)
assert any('.en.html' not in p.name for p in notes)
script = root.joinpath('assets/analytics.js').read_text()
assert script.count("window.gtag('config',") == 1
assert script.count('https://www.googletagmanager.com/gtag/js?id=') == 1
print(f'PASS: {len(pages)} site pages, {len(notes)} note pages; one loader per page; all assets resolve.')
