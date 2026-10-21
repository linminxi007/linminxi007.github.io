#!/usr/bin/env python3
"""本地预览：缩小首页 Hero，将 Research Gallery 翻页控件移至相册右下方。

放在 Quarto 网站根目录（与 _quarto.yml 同级），运行：
    python3 preview_home_gallery.py
    quarto render
    quarto preview

本脚本只修改 assets/site.css 和 assets/gallery.css，自动备份，绝不提交 Git。
重复执行不会重复插入 CSS。
"""
from pathlib import Path
import shutil
import sys

ROOT = Path(__file__).resolve().parent
if not (ROOT / "_quarto.yml").is_file():
    sys.exit("错误：请把脚本放在含 _quarto.yml 的网站根目录。")

HERO_MARK = "/* LOCAL HOMEPAGE HERO COMPACT PREVIEW v1 */"
GALLERY_MARK = "/* LOCAL GALLERY NAV BELOW CARDS PREVIEW v1 */"
HERO_CSS = f"""

{HERO_MARK}
/* 仅缩小首页首屏，不影响文章正文和导航栏。 */
.home-page .site-main {{
  padding-top: 24px;
}}
.home-page .home-hero {{
  align-items: center;
  gap: clamp(25px, 3.5vw, 55px);
  padding-bottom: 20px;
}}
.home-page .home-hero h1 {{
  font-size: clamp(38px, 3.35vw, 52px);
  line-height: 1.16;
  letter-spacing: -.035em;
  margin: 14px 0 16px;
}}
.home-page .hero-description {{
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 20px;
}}
.home-page .home-hero .soft-button {{
  min-width: 165px;
  padding: 12px 19px;
}}
.home-page .home-side {{
  padding: 14px 0 10px 26px;
}}
.home-page .home-side h2 {{
  font-size: 18px;
  line-height: 1.36;
  margin: 14px 0 10px;
}}
.home-page .home-side p {{
  font-size: 13px;
  line-height: 1.58;
  margin: 8px 0;
}}
.home-page .axis-decoration {{
  height: 42px;
  margin-top: 17px;
}}
@media (max-width: 720px) {{
  .home-page .site-main {{ padding-top: 18px; }}
  .home-page .home-hero {{ padding-bottom: 18px; }}
  .home-page .home-hero h1 {{
    font-size: clamp(32px, 8vw, 40px);
    line-height: 1.18;
    margin: 13px 0 14px;
  }}
  .home-page .hero-description {{
    font-size: 15px;
    line-height: 1.55;
    margin-bottom: 16px;
  }}
  .home-page .home-hero .soft-button {{
    min-width: 150px;
    padding: 10px 16px;
  }}
}}
"""

GALLERY_CSS = f"""

{GALLERY_MARK}
/* 只改变视觉排列顺序，不修改相册 DOM，也不影响翻页 JavaScript。 */
.home-gallery {{
  display: flex;
  flex-direction: column;
  padding-bottom: 36px;
}}
.home-gallery > .section-heading {{
  order: 0;
  padding-top: 14px;
  padding-bottom: 12px;
  margin-bottom: 0;
}}
.home-gallery > .research-gallery-track {{ order: 1; }}
.home-gallery > .research-gallery-controls {{
  order: 2;
  justify-content: flex-end;
  align-self: stretch;
  padding: 8px 4px 0;
}}
.home-gallery > .research-gallery-status {{ order: 3; }}
.home-gallery > .research-gallery-status:empty {{ display: none; }}
@media (max-width: 720px) {{
  .home-gallery {{ padding-bottom: 28px; }}
}}
"""

for name, mark, addition in (
    ("assets/site.css", HERO_MARK, HERO_CSS),
    ("assets/gallery.css", GALLERY_MARK, GALLERY_CSS),
):
    path = ROOT / name
    if not path.is_file():
        sys.exit(f"错误：找不到 {name}，请确认网站已安装相册。")
    original = path.read_text(encoding="utf-8")
    if mark in original:
        print(f"已应用，跳过：{name}")
        continue
    backup = Path(str(path) + ".before_gallery_preview.bak")
    if not backup.exists():
        shutil.copy2(path, backup)
    path.write_text(original.rstrip() + addition + "\n", encoding="utf-8")
    print(f"已修改：{name}（备份：{backup.relative_to(ROOT)}）")

print("\n完成。分别运行 quarto render 和 quarto preview，本地检查后再自行 git commit / push。")
