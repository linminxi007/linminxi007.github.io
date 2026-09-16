/* Reading Room V3.1 / Courtyard: local navigation, file reader and private in-browser search.
   No backend, trackers, CDN or third-party JavaScript dependencies. */
(() => {
  'use strict';
  const body = document.body;
  const root = new URL(body.dataset.root || './', location.href);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, context = document) => context.querySelector(s);
  const $$ = (s, context = document) => Array.from(context.querySelectorAll(s));
  let catalog = {notes: [], files: []};
  try { catalog = JSON.parse($('#site-catalog')?.textContent || '{}'); } catch { /* Static links still work. */ }
  catalog.notes ||= []; catalog.files ||= [];

  const preferenceKey = 'courtyard-reading-v3.1';
  let preferences = {};
  try { preferences = window.ReadingRoomBoot?.data || JSON.parse(localStorage.getItem(preferenceKey) || localStorage.getItem('courtyard-reading-v3') || '{}') || {}; } catch {}
  const defaults = {size: 22, weight: 500, sidebar: true, focus: false, ui: 'zh', theme: 'light'};
  preferences = {...defaults, ...preferences};
  if (!Number.isFinite(preferences.size) || preferences.size < 18 || preferences.size > 28) preferences.size = 22;
  if (![400, 500, 600].includes(preferences.weight)) preferences.weight = 500;
  preferences.theme = preferences.theme === 'dark' ? 'dark' : 'light';
  const contentLanguage = (body.dataset.contentLang || 'zh').startsWith('en') ? 'en' : 'zh';
  const requestedUI = new URL(location.href).searchParams.get('ui');
  let uiLang = ['zh','en'].includes(requestedUI) ? requestedUI : body.classList.contains('reading-page') ? contentLanguage : preferences.ui === 'en' ? 'en' : 'zh';
  const dictionary = {
    zh: {top:'顶部',skip:'跳到正文',notes:'笔记',topics:'分类',files:'关联文件',about:'关于',allNotes:'全部笔记',contents:'目录',focus:'专注阅读',connections:'关联文件',asideFoot:'保留来处，继续思考。',demo:'演示笔记 · 非研究定稿',backlinks:'哪些笔记引用了这里',continueThought:'沿着这个问题，继续阅读',gestureHint:'仅在此区域：右滑返回，左滑打开下一份关联文件。',footer:'Out of the box',typeTitle:'你的阅读方式',regular:'常规',clear:'大字清晰',fontSize:'文字大小',fontWeight:'文字粗细',weight400:'常规',weight500:'适中',weight600:'加粗',typeSample:'给公式与思考，留出空间。',focusHint:'收起目录与非必要导航',savedLocally:'偏好只保存在当前浏览器。',reset:'恢复默认',searchTitle:'搜索笔记与文件',searchHint:'本地索引搜索，不上传你的输入。',searchPlaceholder:'输入标题、正文关键词或文件名…',returnShort:'返回',returnHome:'回到首页',returnFile:'返回上一份文件',returnIndex:'返回笔记目录',returnCaption:'从一篇笔记，开始阅读',trail:'阅读路径',noLinks:'这篇笔记还没有关联文件。',noNext:'这篇笔记还没有可跳转的关联链接。',allCount:'全部笔记 / {n} 篇',categoryCount:'{category} / {n} 篇',emptyFilter:'这个分类还没有笔记。',searchCount:'找到 {n} 项',searchEmpty:'没有找到匹配项，试试更短的关键词。',startReading:'全部笔记',spaceForThought:'给思考，留出空间。',recentNotes:'最近的笔记',browseAll:'浏览全部笔记',demoNotice:'当前为排版与关联阅读示例，尚未加入你的科研文档。',clearFilter:'清除分类筛选',sample:'演示',openViewer:'在阅读器中打开 ↗',readingTime:'约 {n} 分钟',copy:'复制',copied:'已复制',copyFailed:'复制失败，请手动选择代码。',working:'持续修订',reviewed:'已核对',archived:'已归档',missingTranslation:'这篇笔记尚无中文版，当前保留英文原文。界面已切换为中文。',openOriginal:'新窗口打开 ↗',download:'下载文件 ↓',viewerHelp:'返回键会恢复来源笔记的位置。附件内容保留原始语言。',selectFile:'请从一篇笔记或“文件”页面选择文件。',invalidPath:'文件路径无效。',scopeError:'这里只能预览本站 files/ 或 assets/ 中的文件。',imageError:'图片加载失败，请检查文件是否已复制。',pdfHelp:'PDF 显示取决于浏览器。无法显示时请下载或在新窗口打开。返回键始终保留。',htmlHelp:'HTML 在隔离框中运行。同源请求可能受限；确认文件可信后可以新窗口打开。框内跳转不计入外层路径。',texHelp:'此处显示 LaTeX 源码，不会编译完整论文。内容保留原始语言。',textHelp:'UTF-8 文本预览，CSV 与 Notebook 不会被执行。',unknownFormat:'此格式暂不支持内嵌预览，请下载或在新窗口打开。',previewError:'无法预览：',largeFile:'文件超过 2 MB，请下载查看。',viewer:'文件阅读器',fileDesc:'查看细节，不丢掉来时的阅读位置。',fileTitle:'关联文件',fileDescription:'与笔记相连的原始材料。',aboutTitle:'关于这个笔记空间',aboutDescription:'保留问题、推导和资料之间的联系。',noteDescription:'让问题、推导与资料，在同一条阅读路径上。',fallbackLabel:'暂仅中文',readingDemo:'当前为演示状态',styleTitle:'按钮与阅读控件',styleDescription:'返回用 01，下陷打开用 02，跳转用 05。统一的哑光实体控件。'},
    en: {top:'Top',skip:'Skip to content',notes:'Notes',topics:'Topics',files:'Files',about:'About',allNotes:'All notes',contents:'Contents',focus:'Focus reading',connections:'Connected files',asideFoot:'Keep the thread. Follow the thought.',demo:'Demo note · not research',backlinks:'Notes that link here',continueThought:'Follow the question',gestureHint:'In this area only: swipe right to return, left to open a linked file.',footer:'Think. Write. Connect.',typeTitle:'Your reading space',regular:'Regular',clear:'Large & clear',fontSize:'Text size',fontWeight:'Text weight',weight400:'Regular',weight500:'Medium',weight600:'Bold',typeSample:'Space for equations and ideas.',focusHint:'Tuck away contents and navigation',savedLocally:'Saved only in this browser.',reset:'Reset',searchTitle:'Search notes & files',searchHint:'Search stays in this browser.',searchPlaceholder:'Title, text, keyword or filename…',returnShort:'Back',returnHome:'Back to home',returnFile:'Back to previous file',returnIndex:'Back to all notes',returnCaption:'Start with a question',trail:'Reading trail',noLinks:'This note has no connected files yet.',noNext:'No connected link is available in this note.',allCount:'All notes / {n}',categoryCount:'{category} / {n}',emptyFilter:'No notes in this topic yet.',searchCount:'{n} results',searchEmpty:'No matches. Try a shorter keyword.',startReading:'All Notes',spaceForThought:'Room for a thought.',recentNotes:'Recent notes',browseAll:'Browse all notes',demoNotice:'Layout samples only. Your research files have not been added yet.',clearFilter:'Clear topic filter',sample:'Demo',openViewer:'Open in viewer ↗',readingTime:'About {n} min',copy:'Copy',copied:'Copied',copyFailed:'Copy failed. Please select the code manually.',working:'Working note',reviewed:'Checked',archived:'Archived',missingTranslation:'This note has no English translation yet. The Chinese original is shown below; the interface is in English.',openOriginal:'Open original ↗',download:'Download ↓',viewerHelp:'Return to the source note and its saved position. Attachments keep their original language.',selectFile:'Choose a file from a note or the Files page.',invalidPath:'Invalid file path.',scopeError:'Only files/ and assets/ within this site can be previewed here.',imageError:'The image could not be loaded. Check that it was copied.',pdfHelp:'PDF preview depends on the browser. Use Download or Open original if necessary. The return button remains available.',htmlHelp:'HTML runs in a sandbox. Same-origin requests may be limited; open the original only when you trust it. Navigation inside the frame is not part of the note trail.',texHelp:'LaTeX source preview; a complete paper is not compiled here. The original language is preserved.',textHelp:'UTF-8 text preview. CSV files and notebooks are not executed.',unknownFormat:'This format has no embedded preview. Download it or open the original.',previewError:'Preview unavailable: ',largeFile:'The file exceeds 2 MB. Please download it.',viewer:'File viewer',fileDesc:'Inspect the detail without losing your place.',fileTitle:'Connected files',fileDescription:'Original materials connected to the notes.',aboutTitle:'About this notebook',aboutDescription:'Keep questions, derivations and files connected.',noteDescription:'A continuous reading path through questions, derivations and materials.',fallbackLabel:'Chinese only',readingDemo:'Demo state',styleTitle:'Buttons & reading controls',styleDescription:'01 for returning, 02 for opening, 05 for linked navigation. Solid, matte controls.'}
  };
  const t = (id, values = {}) => {
    let text = dictionary[uiLang]?.[id] || dictionary.zh[id] || id;
    Object.entries(values).forEach(([k,v]) => { text = text.replaceAll(`{${k}}`, String(v)); });
    return text;
  };
  const topicNames = {'版式样例':'Reading layout','数学推导':'Mathematics','研究记录':'Research notes','阅读摘记':'Reading notes','写作与迁移':'Writing & migration','网站维护':'Site maintenance','未分类':'Uncategorized','方法工具':'Tools & methods','光谱':'Spectroscopy','物理':'Physics','化学':'Chemistry','电子转移':'Electron transfer'};
  const topicLabel = name => uiLang === 'en' ? topicNames[name] || name : name;
  const preferredNote = n => catalog.notes.find(x => x.group === n.group && x.lang === uiLang) || n;
  const savePreferences = () => { preferences.ui = uiLang; try { localStorage.setItem(preferenceKey, JSON.stringify(preferences)); } catch {} };
  const prefix = `courtyard:${root.pathname}:`;
  const memory = {};
  const storage = {
    read(key, fallback) {
      try { return JSON.parse(sessionStorage.getItem(prefix + key) || 'null') ?? fallback; }
      catch { return memory[key] ?? fallback; }
    },
    write(key, value) {
      memory[key] = value;
      try { sessionStorage.setItem(prefix + key, JSON.stringify(value)); } catch { /* Private/blocked storage fallback. */ }
    },
    remove(key) { delete memory[key]; try { sessionStorage.removeItem(prefix + key); } catch {} }
  };
  const key = (value = location.href) => {
    const u = new URL(value, location.href);
    let path = u.pathname;
    if (path.endsWith('/')) path += 'index.html';
    return path + u.search;
  };
  const isInternal = (u) => u.origin === root.origin && u.pathname.startsWith(root.pathname);
  const relativePath = (u) => {
    try { return decodeURIComponent(u.pathname.slice(root.pathname.length)); }
    catch { return u.pathname.slice(root.pathname.length); }
  };
  const pageTitle = () => $('h1')?.textContent.replace(/\s+/g, ' ').trim() || 'linminxi007';
  let trail = storage.read('trail', []);
  if (!Array.isArray(trail)) trail = [];
  trail = trail.filter(item => {
    try { return isInternal(new URL(item.url)) && Date.now() - item.time < 43200000; }
    catch { return false; }
  }).slice(-40);
  const persistTrail = () => storage.write('trail', trail);
  let navigating = false;
  const returnButton = $('#return-button');
  const topButton = $('#top-button');
  topButton?.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: reduced ? 'auto' : 'smooth'});
  });

  const toast = (message) => {
    const el = $('#toast'); if (!el) return;
    el.textContent = message; el.hidden = false;
    clearTimeout(toast.timer); toast.timer = setTimeout(() => { el.hidden = true; }, 2500);
  };
  const savePosition = () => {
    const positions = storage.read('positions', {});
    positions[key()] = {y: scrollY, at: Date.now()};
    const keys = Object.keys(positions).sort((a, b) => positions[b].at - positions[a].at);
    keys.slice(60).forEach(k => delete positions[k]);
    storage.write('positions', positions);
  };
  function updateReturn() {
    const previous = trail.at(-1);
    const currentIsHome = body.classList.contains('home-page');
    if (!returnButton) return;
    const atIndex = body.dataset.page === 'notes/index.html';
    returnButton.hidden = currentIsHome && !previous;
    returnButton.href = previous?.url || new URL(atIndex ? 'index.html' : 'notes/index.html', root).href;
    // The compact face never contains a filename; the destination stays accessible.
    $('#return-label').textContent = t('returnShort');
    const destinationLabel = previous ? `${t('returnFile')}：${previous.title}` : atIndex ? t('returnHome') : t('returnIndex');
    returnButton.title = destinationLabel;
    returnButton.setAttribute('aria-label', destinationLabel);
    const crumb = $('#reading-trail');
    if (crumb && previous) {
      crumb.hidden = false; crumb.replaceChildren();
      const lead = document.createElement('span'); lead.textContent = t('trail'); crumb.append(lead);
      trail.slice(-3).forEach(item => {
        const sep = document.createElement('span'); sep.textContent = ' / '; crumb.append(sep);
        const link = document.createElement('a'); link.href = item.url; link.textContent = item.title; crumb.append(link);
      });
    }
  }
  function navigate(value, {back = false} = {}) {
    const dest = new URL(value, location.href);
    if (!isInternal(dest) || navigating) return;
    if (key(dest.href) === key() && !back) {
      if (dest.hash) smoothAnchor(dest.hash);
      return;
    }
    navigating = true;
    savePosition();
    let restoreY = null;
    if (back && trail.length) {
      const previous = trail.pop();
      dest.href = previous.url;
      restoreY = Number.isFinite(previous.y) ? previous.y : 0;
    } else {
      const last = trail.at(-1);
      const item = {url: location.href, title: pageTitle(), y: scrollY, time: Date.now()};
      if (last && key(last.url) === key()) trail[trail.length - 1] = item;
      else trail.push(item);
      trail = trail.slice(-40);
    }
    persistTrail();
    storage.write('pending', {to: key(dest.href), direction: back ? 'back' : 'forward', restoreY, time: Date.now()});
    body.style.setProperty('--exit-shift', back ? '18px' : '-18px');
    body.classList.remove('is-entering');
    if (!reduced) body.classList.add('is-leaving');
    setTimeout(() => { location.assign(dest.href); }, reduced ? 0 : 145);
  }
  function goBack() {
    if (trail.length) navigate(trail.at(-1).url, {back: true});
    else navigate(new URL(body.dataset.page === 'notes/index.html' ? 'index.html' : 'notes/index.html', root).href);
  }
  returnButton?.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); event.stopPropagation(); goBack();
  });

  // The left contents panel uses the same return history as the floating return key.
  const asideReturnButton = $('#aside-return-button');
  asideReturnButton?.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.stopPropagation();
    goBack();
  });
  function restore(y) {
    // Restore immediately and after resources finish laying out; do not force it repeatedly.
    const apply = () => {
      const old = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, Math.max(0, y));
      requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = old; });
    };
    apply();
    if (document.readyState !== 'complete') window.addEventListener('load', apply, {once: true});
  }
  function onPageShow(event) {
    navigating = false;
    body.classList.remove('is-leaving');
    trail = storage.read('trail', trail);
    const pending = storage.read('pending', null);
    const navigationType = performance.getEntriesByType('navigation')[0]?.type;
    const matched = pending && pending.to === key() && Date.now() - pending.time < 60000;
    if (matched) {
      body.style.setProperty('--entry-shift', pending.direction === 'back' ? '-24px' : '24px');
      if (pending.restoreY !== null) restore(pending.restoreY);
      storage.remove('pending');
    } else if (event.persisted || navigationType === 'back_forward') {
      const index = trail.findLastIndex(item => key(item.url) === key());
      if (index >= 0) { const item = trail[index]; trail = trail.slice(0, index); restore(item.y); }
      else { const saved = storage.read('positions', {})[key()]; if (saved) restore(saved.y); }
      persistTrail();
    }
    if (!reduced && !event.persisted) {
      body.classList.add('is-entering');
      setTimeout(() => body.classList.remove('is-entering'), 330);
    }
    updateReturn();
  }
  window.addEventListener('pageshow', onPageShow);
  window.addEventListener('pagehide', savePosition);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') savePosition(); });
  updateReturn();
  function smoothAnchor(hash) {
    let id; try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    history.replaceState(history.state, '', hash);
    target.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block: 'start'});
  }
  const attachmentExtensions = new Set(['html', 'htm', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif', 'tex', 'md', 'txt', 'csv', 'tsv', 'json', 'py', 'bib', 'ipynb', 'zip', 'xlsx']);
  const isAttachment = (u) => {
    const p = relativePath(u);
    return isInternal(u) && ((p.startsWith('files/') && !p.endsWith('/')) || (p.startsWith('assets/') && attachmentExtensions.has(p.split('.').pop().toLowerCase())));
  };
  const viewerUrl = (u) => {
    const dest = new URL('viewer.html', root);
    dest.searchParams.set('file', relativePath(u));
    if (u.hash) dest.searchParams.set('anchor', u.hash.slice(1));
    return dest;
  };
  function routeLink(link) {
    let u = new URL(link.href, location.href);
    if (isAttachment(u)) u = viewerUrl(u);
    // Also tolerate standard relative Markdown links that survive HTML conversion.
    if (relativePath(u).startsWith('notes/')) u.pathname = u.pathname.replace(/\.(?:qmd|md)$/i, '.html');
    const note = catalog.notes.find(n => n.path === relativePath(u));
    if (note) {
      const translated = preferredNote(note);
      u.pathname = new URL(translated.path, root).pathname;
      if (translated.lang !== uiLang) u.searchParams.set('ui', uiLang);
    }
    return u;
  }
  document.addEventListener('click' , (event) => {
    const a = event.target.closest?.('a[href]');
    if (!a || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || a.hasAttribute('download') || a.target === '_blank' || a.dataset.native !== undefined) return;
    let u; try { u = routeLink(a); } catch { return; }
    if (!isInternal(u) || !['http:', 'https:', 'file:'].includes(u.protocol)) return;
    if (key(u.href) === key() && u.hash) { event.preventDefault(); smoothAnchor(u.hash); return; }
    if (u.pathname.endsWith('.html') || u.pathname.endsWith('/')) {
      event.preventDefault();
      const dialog = $('#search-dialog'); if (dialog?.open) dialog.close();
      navigate(u.href);
    }
  });
  // Header stays visually uncluttered; category filters live only at the upper right.
  $('#menu-toggle')?.addEventListener('click', () => {
    const nav = $('#main-nav'); const open = nav.classList.toggle('is-open');
    $('#menu-toggle').setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (event) => {
    $$('.category-menu[open]').forEach(el => { if (!el.contains(event.target)) el.open = false; });
    const headerRight = $('.header-right');
    if (headerRight && !headerRight.contains(event.target)) {
      $('#main-nav')?.classList.remove('is-open'); $('#menu-toggle')?.setAttribute('aria-expanded', 'false');
    }
  });
  const page = body.dataset.page || '';
  const section = page.startsWith('notes/') ? 'notes' : /^(files|viewer)\.html$/.test(page) ? 'files' : page === 'about.html' ? 'about' : page === 'index.html' ? 'home' : '';
  $$('[data-section]').forEach(el => {
    if (el.dataset.section === section) { el.classList.add('is-active'); el.setAttribute('aria-current', 'page'); }
  });
  // Link relationships are derived from Markdown links and images at render time.
  function makeRelatedLink(path, label = '') {
    const n = catalog.notes.find(n => n.path === path);
    const a = document.createElement('a'); a.className = 'related-link button-open'; a.href = new URL(path, root).href;
    const span = document.createElement('span');
    span.append(document.createTextNode(label || n?.title || path.split('/').pop()));
    const small = document.createElement('small'); small.textContent = n ? 'NOTE / MARKDOWN' : `FILE / ${path.split('.').pop().toUpperCase()}`;
    span.append(small); a.append(span); return a;
  }
  function renderBacklinks(target, container, sectionElement) {
    if (!container) return;
    container.replaceChildren();
    const matched = catalog.notes.filter(n => n.path !== page && n.links.includes(target));
    const incoming = [...new Map(matched.map(n => [n.group, preferredNote(n)])).values()];
    incoming.forEach(n => {
      const a = document.createElement('a'); a.href = new URL(n.path, root).href; a.className = 'backlink'; a.textContent = `↖ ${n.title}`; container.append(a);
    });
    if (sectionElement) sectionElement.hidden = incoming.length === 0;
  }
  const currentNote = catalog.notes.find(n => n.path === page);
  if (currentNote) {
    const related = $('#related-links');
    if (related) {
      currentNote.links.filter(p => p !== page).forEach(p => related.append(makeRelatedLink(p)));
      if (!related.children.length) { const p = document.createElement('p'); p.className = 'viewer-help'; p.textContent = t('noLinks'); related.append(p); }
    }
    renderBacklinks(page, $('#backlinks'), $('#backlinks-section'));
  }
  // Swipe is deliberately scoped to this dedicated pad; text selection and code scrolling stay native.
  const gesture = $('#reading-gesture');
  if (gesture) {
    let start = null;
    const follow = (right) => {
      if (right) { goBack(); return; }
      const candidates = $$('.article-body a[href]').filter(a => {
        try { const u = routeLink(a); return isInternal(u) && key(u.href) !== key() && !a.hasAttribute('download') && a.target !== '_blank'; } catch { return false; }
      });
      if (candidates.length) candidates[0].click(); else toast(t('noNext'));
    };
    gesture.addEventListener('touchstart', e => { if (e.touches.length === 1) start = {x: e.touches[0].clientX, y: e.touches[0].clientY, at: Date.now()}; }, {passive: true});
    gesture.addEventListener('touchend', e => {
      if (!start || !e.changedTouches.length) return;
      const dx = e.changedTouches[0].clientX - start.x, dy = e.changedTouches[0].clientY - start.y;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6 && Date.now() - start.at < 900) follow(dx > 0);
      start = null;
    }, {passive: true});
    gesture.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); follow(true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); follow(false); }
    });
    let wheelX = 0, lastWheel = 0;
    gesture.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      if (Date.now() - lastWheel > 300) wheelX = 0;
      wheelX += e.deltaX; lastWheel = Date.now();
      if (Math.abs(wheelX) > 140) { follow(wheelX < 0); wheelX = 0; }
    }, {passive: true});
  }
  // Reading progress and current TOC anchor.
  const progress = () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    if ($('#reading-progress-bar')) $('#reading-progress-bar').style.width = body.classList.contains('reading-page') && total > 0 ? `${Math.min(100, scrollY / total * 100)}%` : '0';
  };
  let raf = false;
  addEventListener('scroll', () => { if (!raf) { raf = true; requestAnimationFrame(() => { progress();
  const updateTopButton = () => {
    if (!topButton) return;
    topButton.hidden = scrollY < 600;
  };
  addEventListener('scroll', updateTopButton, {passive:true});
  updateTopButton();
 raf = false; }); } }, {passive: true});
  progress();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $$('.page-toc a').forEach(a => { let id; try { id = decodeURIComponent(new URL(a.href).hash.slice(1)); } catch { id = ''; } a.classList.toggle('is-current', id === entry.target.id); if(id === entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current'); });
        }
      });
    }, {rootMargin: '-100px 0px -65% 0px'});
    $$('.article-body section[id], .article-body h2[id], .article-body h3[id]').forEach(el => observer.observe(el));
  }
  // Search uses only the embedded build-time catalog. It never sends queries over the network.
  const searchDialog = $('#search-dialog');
  const searchInput = $('#search-input');
  const openSearch = () => { if (!searchDialog.open) searchDialog.showModal(); setTimeout(() => searchInput.focus(), 20); };
  $('#search-toggle')?.addEventListener('click', openSearch);
  $('#search-close')?.addEventListener('click', () => searchDialog.close());
  searchDialog?.addEventListener('click', e => { if (e.target === searchDialog) { const r = searchDialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) searchDialog.close(); } });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') { $$('.category-menu').forEach(el => { el.open = false; }); $('#main-nav')?.classList.remove('is-open'); $('#menu-toggle')?.setAttribute('aria-expanded', 'false'); }
  });
  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const results = $('#search-results'); results.replaceChildren();
    if (!query) { $('#search-status').textContent = t('searchHint'); return; }
    const words = query.split(/\s+/);
    let items = catalog.notes.map(n => ({...n, kind: 'NOTE', haystack: [n.title, n.description, n.text, ...n.categories].join(' ').toLocaleLowerCase()}))
      .concat(catalog.files.map(f => ({...f, title: f.name, description: f.path, kind: 'FILE', haystack: (f.name + ' ' + f.path).toLocaleLowerCase()})))
      .filter(n => words.every(w => n.haystack.includes(w)))
      .sort((a, b) => Number(b.title.toLocaleLowerCase().includes(query)) - Number(a.title.toLocaleLowerCase().includes(query)));
    const grouped = new Map();
    items.forEach(n => { const id = n.group || n.path; if (!grouped.has(id)) grouped.set(id, n.group ? {...n, ...preferredNote(n), kind:'NOTE'} : n); });
    items = [...grouped.values()];
    $('#search-status').textContent = items.length ? t('searchCount',{n:items.length}) + (items.length > 40 ? ' (40 shown)' : '') : t('searchEmpty');
    items.slice(0, 40).forEach(item => {
      const a = document.createElement('a'); a.href = new URL(item.path, root).href; a.className = 'search-result';
      const type = document.createElement('small'); type.textContent = item.kind;
      const title = document.createElement('strong'); title.textContent = item.title;
      const description = document.createElement('p'); description.textContent = item.description || (item.text || '').slice(0, 120);
      a.append(type, title, description); results.append(a);
    });
  });
  // Attachment reader: never inject arbitrary file content into the parent page.
  async function initViewer() {
    const surface = $('#file-preview'); if (!surface) return;
    const params = new URL(location.href).searchParams;
    const path = params.get('file');
    const showMessage = message => { const p = document.createElement('p'); p.className = 'empty-state'; p.textContent = message; surface.replaceChildren(p); };
    if (!path) { showMessage(t('selectFile')); return; }
    let u;
    try { u = new URL(path, root); } catch { showMessage(t('invalidPath')); return; }
    if (!isInternal(u) || !['files/', 'assets/'].some(p => relativePath(u).startsWith(p))) { showMessage(t('scopeError')); return; }
    const decoded = relativePath(u);
    const ext = decoded.split('.').pop().toLowerCase();
    surface.dataset.ext = ext;
    const name = decoded.split('/').pop();
    $('h1').textContent = name;
    document.title = `${name} · linminxi007`;
    $('#viewer-path').textContent = decoded;
    const raw = $('#open-original'), download = $('#download-file');
    raw.href = u.href; download.href = u.href; download.setAttribute('download', name);
    raw.hidden = false; download.hidden = false;
    renderBacklinks(decoded, $('#viewer-backlinks-list'), $('#viewer-backlinks'));
    surface.replaceChildren();
    if (['png','jpg','jpeg','gif','webp','svg','avif'].includes(ext)) {
      const img = document.createElement('img'); img.src = u.href; img.alt = name;
      img.addEventListener('error', () => showMessage(t('imageError')));
      surface.append(img);
    } else if (['html','htm','pdf'].includes(ext)) {
      const frame = document.createElement('iframe');
      if (params.get('anchor')) u.hash = params.get('anchor');
      frame.src = u.href; frame.title = `File preview: ${name}`;
      if (ext !== 'pdf') frame.setAttribute('sandbox', 'allow-scripts allow-downloads');
      frame.referrerPolicy = 'no-referrer'; surface.append(frame);
      $('#viewer-help').textContent = ext === 'pdf' ? t('pdfHelp') : t('htmlHelp');
    } else if (['tex','md','txt','csv','tsv','json','py','bib','ipynb','log','yml','yaml'].includes(ext)) {
      try {
        const response = await fetch(u.href);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const limit = 2 * 1024 * 1024;
        if (Number(response.headers.get('content-length')) > limit) throw new Error(t('largeFile'));
        const reader = response.body?.getReader();
        let content;
        if (reader) {
          let size = 0; const chunks = [];
          while (true) { const {done, value} = await reader.read(); if (done) break; size += value.length; if (size > limit) { await reader.cancel(); throw new Error(t('largeFile')); } chunks.push(value); }
          const data = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { data.set(chunk, offset); offset += chunk.length; }
          content = new TextDecoder('utf-8').decode(data);
        } else { content = await response.text(); if (content.length > limit) throw new Error(t('largeFile')); }
        const pre = document.createElement('pre'); pre.textContent = content; surface.append(pre);
        $('#viewer-help').textContent = ext === 'tex' ? t('texHelp') : t('textHelp');
      } catch (error) { showMessage(t('previewError') + error.message); }
    } else { showMessage(t('unknownFormat')); }
  }

  function refreshListing() {
    const requestedCategory = new URL(location.href).searchParams.get('category');
    const chosen = new Map();
    catalog.notes.forEach(n => { if (!chosen.has(n.group)) chosen.set(n.group, preferredNote(n)); });
    $$('.note-list').forEach(list => {
      const limit = Number(list.dataset.limit) || Infinity;
      let visible = 0;
      $$('.note-row', list).forEach(row => {
        const note = catalog.notes.find(n => n.path === row.dataset.path);
        const isChosen = note && chosen.get(note.group)?.path === note.path;
        const matches = !requestedCategory || note?.categories.includes(requestedCategory);
        const show = isChosen && matches && visible < limit;
        row.hidden = !show;
        if (show) {
          visible++;
          $('.note-number',row).textContent = String(visible).padStart(2,'0');
          $('.category-label',row).textContent = note.categories.map(topicLabel).join(' / ');
          $('.sample-label',row).textContent = note.demo ? t('sample') : note.lang !== uiLang ? t('fallbackLabel') : '';
        }
      });
      if (page === 'notes/index.html') {
        if ($('#filter-status')) $('#filter-status').textContent = requestedCategory ? t('categoryCount',{category:topicLabel(requestedCategory),n:visible}) : t('allCount',{n:visible});
        if ($('#filter-empty')) { $('#filter-empty').hidden = visible !== 0; $('#filter-empty').textContent = t('emptyFilter'); }
        if ($('h1')) $('h1').textContent = requestedCategory ? topicLabel(requestedCategory) : t('allNotes');
      }
    });
  }
  function updateInterface() {
    document.documentElement.dataset.ui = uiLang;
    document.documentElement.lang = uiLang === 'en' ? 'en' : 'zh-CN';
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $('#language-toggle')?.setAttribute('aria-checked', String(uiLang === 'en'));
    $('#language-toggle')?.setAttribute('title', uiLang === 'en' ? 'E / 中 · Switch to Chinese' : 'E / 中 · 切换到英文版本');
    const titleMap = {'about.html':'aboutTitle','files.html':'fileTitle','viewer.html':'viewer','style-guide.html':'styleTitle'};
    const descMap = {'about.html':'aboutDescription','files.html':'fileDescription','viewer.html':'fileDesc','notes/index.html':'noteDescription','style-guide.html':'styleDescription'};
    if (titleMap[page] && !(page === 'viewer.html' && new URL(location.href).searchParams.has('file'))) $('h1').textContent = t(titleMap[page]);
    if (descMap[page] && $('.page-heading>p')) $('.page-heading>p').textContent = t(descMap[page]);
    if ($('#search-input')) $('#search-input').placeholder = t('searchPlaceholder');
    if ($('#search-status') && !$('#search-input').value) $('#search-status').textContent = t('searchHint');
    $$('.dropdown-panel a').forEach(a => {
      const cat = new URL(a.href).searchParams.get('category');
      if (cat) a.textContent = topicLabel(cat);
    });
    $$('.file-card-action').forEach(a => a.textContent = t('openViewer'));
    if ($('#open-original')) $('#open-original').textContent = t('openOriginal');
    if ($('#download-file')) $('#download-file').textContent = t('download');
    if ($('#top-label')) {
  $('#top-label').textContent = t('top');
}

if ($('#top-button')) {
  $('#top-button').setAttribute('aria-label', t('top'));
  $('#top-button').title = t('top');
}
    if ($('#viewer-help')) {
      const ext = $('#file-preview')?.dataset.ext;
      $('#viewer-help').textContent = t(ext === 'pdf' ? 'pdfHelp' : ['html','htm'].includes(ext) ? 'htmlHelp' : ext === 'tex' ? 'texHelp' : ext ? 'textHelp' : 'viewerHelp');
    }
    if (currentNote) {
      if ($('#translation-notice')) {
        $('#translation-notice').hidden = currentNote.lang === uiLang;
        $('#translation-notice').textContent = t('missingTranslation');
      }
      if ($('.article-categories')) $('.article-categories').textContent = currentNote.categories.map(topicLabel).join(' / ');
      const text = $('.article-body')?.textContent || '';
      const han = (text.match(/[\u3400-\u9fff]/g)||[]).length;
      const words = (text.replace(/[\u3400-\u9fff]/g,' ').match(/\b\w+\b/g)||[]).length;
      //if ($('#reading-time')) $('#reading-time').textContent = t('readingTime',{n:Math.max(1,Math.ceil(han/350+words/220))}); 修改为了在文章顶上添加字数
       const minutes =
 Math.max(1, Math.ceil(han / 350 + words / 220));

if ($('#reading-time')) {

  const totalCount = han + words;

  $('#reading-time').textContent =
    uiLang === 'en'
      ? `${t('readingTime',{n:minutes})} · ${totalCount} words`
      : `${t('readingTime',{n:minutes})}阅读 · 共计${totalCount}字`;

}
 Math.max(1, Math.ceil(han / 350 + words / 220));

if ($('#reading-time')) {

  const totalCount = han + words;

  $('#reading-time').textContent =
    uiLang === 'en'
      ? `${t('readingTime',{n:minutes})} · ${totalCount} words`
      : `${t('readingTime',{n:minutes})}阅读 · 共计${totalCount}字`;

}
      if ($('#note-status')) $('#note-status').textContent = t(currentNote.status || 'working');
    }
    refreshListing(); updateReturn();
  }
  function applyPreferences({keepPosition = false} = {}) {
    let anchor = null, before = 0;
    if (keepPosition) {
      anchor = $$('.article-body h2,.article-body h3,.article-body p').find(el => {const r=el.getBoundingClientRect(); return r.bottom>120 && r.top<innerHeight;});
      if (anchor) before = anchor.getBoundingClientRect().top;
    }
    const h = document.documentElement;
    h.style.setProperty('--reader-size',preferences.size+'px');
    h.style.setProperty('--reader-weight',preferences.weight);
    h.dataset.theme = preferences.theme;
    $('#theme-toggle')?.setAttribute('aria-checked', String(preferences.theme === 'dark'));
    h.dataset.sidebar = preferences.sidebar ? 'open' : 'closed';
    h.dataset.focus = preferences.focus ? 'on' : 'off';
    $('.reading-aside')?.classList.remove('is-mobile-open');
    $$('.focus-switch').forEach(el => el.setAttribute('aria-checked',String(preferences.focus)));
    $$('[data-weight]').forEach(el => el.setAttribute('aria-pressed',String(Number(el.dataset.weight)===preferences.weight)));
    $$('[data-preset]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.preset==='regular' ? preferences.size===20 && preferences.weight===400 : preferences.size===24 && preferences.weight===600)));
    $('#size-slider').value = preferences.size; $('#size-output').textContent = preferences.size+' px';
    $('#toc-reopen')?.setAttribute('aria-expanded','false');
    $('#toc-collapse')?.setAttribute('aria-expanded',String(preferences.sidebar && !preferences.focus));
    savePreferences();
    if (anchor) {
      const delta = anchor.getBoundingClientRect().top - before;
      const old=h.style.scrollBehavior;h.style.scrollBehavior='auto';window.scrollBy(0,delta);h.style.scrollBehavior=old;
    }
  }
  const typeDialog = $('#type-dialog');
  $('#type-toggle')?.setAttribute('aria-expanded','false');
  $('#type-toggle')?.addEventListener('click', () => { if (!typeDialog.open) {typeDialog.showModal();$('#type-toggle').setAttribute('aria-expanded','true');} });
  $('#type-close')?.addEventListener('click', () => typeDialog.close());
  typeDialog?.addEventListener('close', () => {$('#type-toggle').setAttribute('aria-expanded','false');$('#type-toggle').focus({preventScroll:true});});
  typeDialog?.addEventListener('click', e => {if(e.target===typeDialog){const r=typeDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)typeDialog.close();}});
  $('#size-slider')?.addEventListener('input', e => {preferences.size=Number(e.target.value);applyPreferences({keepPosition:true});});
  $$('[data-weight]').forEach(el => el.addEventListener('click', () => {preferences.weight=Number(el.dataset.weight);applyPreferences({keepPosition:true});}));
  $$('[data-preset]').forEach(el => el.addEventListener('click', () => {Object.assign(preferences,el.dataset.preset==='regular'?{size:20,weight:400}:{size:24,weight:600});applyPreferences({keepPosition:true});}));
  $('#type-reset')?.addEventListener('click', () => {preferences={...defaults,ui:uiLang,theme:preferences.theme};applyPreferences({keepPosition:true});});
  $('#theme-toggle')?.addEventListener('click', () => {preferences.theme = preferences.theme === 'dark' ? 'light' : 'dark';applyPreferences({keepPosition:true});});
  $$('.focus-switch').forEach(el => el.addEventListener('click', () => {preferences.focus=!preferences.focus;applyPreferences({keepPosition:true});}));
  $('#toc-collapse')?.addEventListener('click', () => {preferences.sidebar=false;applyPreferences({keepPosition:true});$('#toc-reopen').focus({preventScroll:true});});
  $('#toc-reopen')?.addEventListener('click', () => {
    preferences.focus=false;preferences.sidebar=true;applyPreferences({keepPosition:true});
    if (innerWidth<=940) {$('.reading-aside').classList.add('is-mobile-open');$('#toc-reopen').setAttribute('aria-expanded','true');}
    $('#toc-collapse')?.focus({preventScroll:true});
  });
  document.addEventListener('click', e => {
    const aside=$('.reading-aside');
    if (aside?.classList.contains('is-mobile-open') && !aside.contains(e.target) && !$('#toc-reopen')?.contains(e.target)) {aside.classList.remove('is-mobile-open');$('#toc-reopen').setAttribute('aria-expanded','false');}
  });
  $$('.page-toc a').forEach(a => a.addEventListener('click',() => {if(innerWidth<=940){$('.reading-aside').classList.remove('is-mobile-open');$('#toc-reopen').setAttribute('aria-expanded','false');}}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('.reading-aside')?.classList.remove('is-mobile-open');$('#toc-reopen')?.setAttribute('aria-expanded','false');const menu=$('.category-menu[open]');if(menu){menu.open=false;menu.querySelector('summary').focus();}}});
  if ($('#section-count')) $('#section-count').textContent = String($$('.article-body h2').length).padStart(2,'0');
  // Language navigation replaces the current counterpart, rather than polluting the file-return trail.
  function switchLanguage(next) {
    if (!['zh','en'].includes(next) || next===uiLang) return;
    uiLang=next;savePreferences();
    const peer=currentNote && catalog.notes.find(n=>n.group===currentNote.group && n.lang===next);
    if (peer && peer.path!==page) {
      const top=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head-h'))+22;
      const blocks=$$('.article-body section[id]');
      const current=blocks.filter(el=>el.getBoundingClientRect().top<=top).at(-1);
      const dest=new URL(peer.path,root);
      const position={to:key(dest.href),id:current?.id || '',fraction:current?Math.max(0,(top-current.getBoundingClientRect().top)/Math.max(1,current.getBoundingClientRect().height)):0,top:scrollY<180,at:Date.now()};
      storage.write('language-position',position);
      savePosition();
      body.classList.remove('is-entering');if(!reduced)body.classList.add('is-leaving');
      setTimeout(()=>location.replace(dest.href),reduced?0:145);return;
    }
    if (currentNote) {const u=new URL(location.href);if(currentNote.lang!==next)u.searchParams.set('ui',next);else u.searchParams.delete('ui');history.replaceState(history.state,'',u.href);}
    updateInterface();
    if ($('#search-input')?.value) $('#search-input').dispatchEvent(new Event('input'));
  }
  $('#language-toggle')?.addEventListener('click',()=>switchLanguage(uiLang === 'en' ? 'zh' : 'en'));
  window.addEventListener('pageshow',()=>{
    const p=storage.read('language-position',null);
    if(p && p.to===key() && Date.now()-p.at<60000){
      const el=document.getElementById(p.id);
      const top=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head-h'))+22;
      restore(p.top?0:el?el.getBoundingClientRect().top+scrollY+p.fraction*el.getBoundingClientRect().height-top:0);
      storage.remove('language-position');
    }
  });
  // Typography never forces bold onto mathematical symbols. Wide content scrolls locally.
  $$('.article-body table').forEach(table=>{if(table.closest('.table-scroll'))return;const wrap=document.createElement('div');wrap.className='table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','可横向滚动表格 / Scrollable table');table.before(wrap);wrap.append(table);});
  $$('.article-body math[display="block"]').forEach(math=>{if(math.closest('.math.display'))return;const wrap=document.createElement('span');wrap.className='math display';math.before(wrap);wrap.append(math);});
  $$('.article-body .math.display').forEach(el=>{el.tabIndex=0;el.setAttribute('aria-label','数学公式 / Mathematical expression');});
  $$('.article-body pre').forEach(pre=>{
    const wrap=document.createElement('div');wrap.className='code-wrap';pre.before(wrap);wrap.append(pre);
    const button=document.createElement('button');button.className='copy-code';button.dataset.i18n='copy';button.textContent=t('copy');wrap.append(button);
    button.addEventListener('click',async()=>{
      try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(pre.textContent);else{const ta=document.createElement('textarea');ta.value=pre.textContent;ta.style.position='fixed';ta.style.left='-9999px';body.append(ta);ta.select();const ok=document.execCommand('copy');ta.remove();if(!ok)throw new Error('copy');}toast(t('copied'));}catch{toast(t('copyFailed'));}
    });
  });
  $$('.demo-control').forEach(el=>el.addEventListener('click',()=>el.setAttribute('aria-pressed',String(el.getAttribute('aria-pressed')!=='true'))));
  $$('.demo-switch').forEach(el=>el.addEventListener('click',()=>el.setAttribute('aria-checked',String(el.getAttribute('aria-checked')!=='true'))));
  $$('[data-demo-toast]').forEach(el=>el.addEventListener('click',()=>toast(t('readingDemo'))));
  if ('ResizeObserver' in window) {
    const header = $('.site-header');
    new ResizeObserver(() => document.documentElement.style.setProperty('--head-h', `${Math.ceil(header.getBoundingClientRect().height)}px`)).observe(header);
  }
  applyPreferences();updateInterface();initViewer();
})();
