/* Research gallery for Reading Room V3.1.
   To change the slides or their order, edit assets/gallery.json ONLY. */
(() => {
  'use strict';

  const section = document.getElementById('research-gallery');
  if (!section) return;
  const track = section.querySelector('.research-gallery-track');
  const previous = section.querySelector('[data-gallery-prev]');
  const next = section.querySelector('[data-gallery-next]');
  // Keep navigation beside the scrolling cards, outside the scrollable track.
  const viewport = document.createElement('div');
  viewport.className = 'research-gallery-viewport';
  track.before(viewport);
  viewport.append(previous, track, next);
  function setChevron(button, points) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('points', points);
    svg.appendChild(line);
    button.replaceChildren(svg);
  }
  setChevron(previous, '15,4 8,12 15,20');
  setChevron(next, '9,4 16,12 9,20');
  previous.setAttribute('aria-controls', 'research-gallery-track');
  next.setAttribute('aria-controls', 'research-gallery-track');
  track.id = 'research-gallery-track';
  const counter = section.querySelector('[data-gallery-counter]');
  const status = section.querySelector('[data-gallery-status]');
  const root = new URL(document.body.dataset.root || './', window.location.href);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let catalog = [];
  try {
    catalog = JSON.parse(document.getElementById('site-catalog')?.textContent || '{}').notes || [];
  } catch { /* Keep the gallery functional using fallback titles from filenames. */ }
  let items = [];

  function pageURL(path, type) {
    if (typeof path !== 'string' || !path) return null;
    const normalized = path.replace(/\\/g, '/');
    if (normalized.startsWith('/') || normalized.includes('..') || /^[a-z]+:/i.test(normalized)) return null;
    if (type === 'note' && (!normalized.startsWith('notes/') || !/\.html$/i.test(normalized))) return null;
    if (type === 'image' && (!/^(notes|assets)\//.test(normalized) || !/\.(png|jpe?g|webp|gif|svg)$/i.test(normalized))) return null;
    const url = new URL(normalized.split('/').map(encodeURIComponent).join('/'), root);
    if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname)) return null;
    return url.href;
  }

  function activeLanguage() {
    return document.documentElement.dataset.ui === 'en' ? 'en' : 'zh';
  }

  function translatedNote(path, language) {
    const original = catalog.find(note => note.path === path);
    if (!original) return null;
    return catalog.find(note => note.group === original.group && note.lang === language) || original;
  }

  function fallbackTitle(path) {
    return decodeURIComponent(path.split('/').pop().replace(/\.html$/i, '').replace(/\.en$/, '')).replace(/[_-]/g, ' ');
  }

  function createCard(item, index, language) {
    const note = translatedNote(item.note, language);
    const preferredPath = note?.path || item.note;
    const a = document.createElement('a');
    a.className = 'research-gallery-card';
    a.href = pageURL(preferredPath, 'note') || pageURL(item.note, 'note');
    if (!a.href) return null;
    a.setAttribute('aria-label', language === 'en' ? 'Read: ' + (note?.title || fallbackTitle(item.note)) : '阅读：' + (note?.title || fallbackTitle(item.note)));

    const figure = document.createElement('div');
    figure.className = 'research-gallery-image';
    const img = document.createElement('img');
    img.src = pageURL(item.image, 'image');
    if (!img.src) return null;
    img.alt = note?.title || fallbackTitle(item.note);
    img.loading = index < 3 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => { a.hidden = true; updateControls(); }, {once: true});
    figure.appendChild(img);

    const body = document.createElement('div');
    body.className = 'research-gallery-caption';
    const top = document.createElement('div');
    top.className = 'research-gallery-meta';
    const category = document.createElement('span');
    category.textContent = (note?.categories || []).slice(0, 2).join(' / ') || (language === 'en' ? 'Research note' : '研究笔记');
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    top.append(category, number);
    const heading = document.createElement('h3');
    heading.textContent = note?.title || fallbackTitle(item.note);
    const footer = document.createElement('span');
    footer.className = 'research-gallery-open';
    footer.textContent = language === 'en' ? 'Read note ↗' : '阅读文章 ↗';
    body.append(top, heading, footer);
    a.append(figure, body);
    return a;
  }

  function visibleCards() {
    return Array.from(track.querySelectorAll('.research-gallery-card:not([hidden])'));
  }

  function updateControls() {
    const cards = visibleCards();
    if (!cards.length) {
      previous.disabled = true;
      next.disabled = true;
      counter.textContent = '00 / 00';
      return;
    }
    const left = track.getBoundingClientRect().left;
    let closestIndex = 0;
    let distance = Infinity;
    cards.forEach((card, i) => {
      const diff = Math.abs(card.getBoundingClientRect().left - left);
      if (diff < distance) { distance = diff; closestIndex = i; }
    });
    counter.textContent = String(closestIndex + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
    const overflow = track.scrollWidth > track.clientWidth + 3;
    previous.disabled = !overflow || track.scrollLeft < 3;
    next.disabled = !overflow || track.scrollLeft + track.clientWidth >= track.scrollWidth - 3;
  }

  function move(direction) {
    const cards = visibleCards();
    if (!cards.length) return;
    const left = track.getBoundingClientRect().left;
    const current = cards.reduce((result, card, i) => {
      const distance = Math.abs(card.getBoundingClientRect().left - left);
      return distance < result.distance ? {index: i, distance} : result;
    }, {index: 0, distance: Infinity}).index;
    const target = cards[Math.max(0, Math.min(cards.length - 1, current + direction))];
    if (target) track.scrollTo({left: target.offsetLeft - track.offsetLeft, behavior: reducedMotion ? 'instant' : 'smooth'});
  }

  function render() {
    const language = activeLanguage();
    const fragment = document.createDocumentFragment();
    items.forEach((item, index) => {
      const card = createCard(item, index, language);
      if (card) fragment.appendChild(card);
    });
    track.replaceChildren(fragment);
    track.scrollLeft = 0;
    section.hidden = track.children.length === 0;
    if (status) status.textContent = '';
    updateControls();
  }

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateControls, {passive: true});
  window.addEventListener('resize', updateControls, {passive: true});
  new MutationObserver((mutations) => {
    if (mutations.some(m => m.attributeName === 'data-ui')) render();
  }).observe(document.documentElement, {attributes: true, attributeFilter: ['data-ui']});

  fetch(new URL('assets/gallery.json', root), {cache: 'no-store'})
    .then(response => {
      if (!response.ok) throw new Error('gallery.json HTTP ' + response.status);
      return response.json();
    })
    .then(config => {
      if (!Array.isArray(config)) throw new Error('gallery.json must contain an array');
      const seen = new Set();
      items = config.filter(item => {
        if (!item || !pageURL(item.note, 'note') || !pageURL(item.image, 'image')) return false;
        if (seen.has(item.note)) return false;
        seen.add(item.note);
        return true;
      });
      render();
    })
    .catch(error => {
      console.warn('Research gallery:', error);
      if (status) status.textContent = '相册配置未加载 / Gallery unavailable';
      previous.disabled = true;
      next.disabled = true;
    });
})();
