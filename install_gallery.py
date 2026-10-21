#!/usr/bin/env python3
"""Apply the Research Gallery to an existing Quarto Reading Room checkout.
Place this file and the assets/ folder in the project root; run once.
The operation is idempotent and creates an index.qmd backup before modification.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent
INDEX = ROOT / "index.qmd"
ANCHOR = '<div class="home-recent" id="recent-notes-render">'
START = '<!-- RESEARCH GALLERY: BEGIN -->'
BLOCK = '''```{=html}
<!-- RESEARCH GALLERY: BEGIN -->
<link rel="stylesheet" href="assets/gallery.css">
<section class="home-gallery" id="research-gallery" aria-label="Research Gallery">
  <div class="section-heading">
    <h2><span class="lang-zh">研究图片相册</span><span class="lang-en">Research Gallery</span></h2>
    <span>VISUAL RESEARCH NOTES</span>
  </div>
  <div class="research-gallery-controls">
    <span class="research-gallery-counter" data-gallery-counter aria-live="off">00 / 00</span>
    <button class="research-gallery-nav" data-gallery-prev type="button" aria-label="上一张 / Previous" disabled>‹</button>
    <button class="research-gallery-nav" data-gallery-next type="button" aria-label="下一张 / Next" disabled>›</button>
  </div>
  <div class="research-gallery-track" aria-label="Article illustrations" role="region" tabindex="0"></div>
  <p class="research-gallery-status" data-gallery-status role="status"></p>
  <noscript>请开启 JavaScript 以显示相册。 / Enable JavaScript to see this gallery.</noscript>
</section>
<script defer src="assets/gallery.js"></script>
<!-- RESEARCH GALLERY: END -->
```

'''

def main():
    if not INDEX.is_file():
        sys.exit('ERROR: Cannot find index.qmd. Copy installer to your Quarto site root (the directory containing _quarto.yml).')
    if not (ROOT / '_quarto.yml').is_file():
        sys.exit('ERROR: Cannot find _quarto.yml. Run in your Quarto site root.')
    for relative in ['assets/gallery.json', 'assets/gallery.js', 'assets/gallery.css']:
        if not (ROOT / relative).is_file():
            sys.exit(f'ERROR: Missing {relative}. Extract the entire package to the site root.')
    content = INDEX.read_text(encoding='utf-8-sig')
    if START in content:
        print('Research Gallery already installed; index.qmd not changed.')
        return
    if content.count(ANCHOR) != 1:
        sys.exit('ERROR: Cannot safely locate the Recent Research Notes section in index.qmd; no changes made.')
    backup = INDEX.with_suffix('.qmd.before-gallery.bak')
    if not backup.exists():
        backup.write_text(content, encoding='utf-8')
    content = content.replace(ANCHOR, BLOCK + ANCHOR, 1)
    INDEX.write_text(content, encoding='utf-8')
    print('Installed Research Gallery above Recent Research Notes.')
    print('Edit assets/gallery.json to reorder/select article images.')
    print('Then run: quarto render && git add index.qmd assets/gallery.* && git commit -m "Add research gallery" && git push origin main')

if __name__ == '__main__':
    main()
