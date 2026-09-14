/* Reading Room V3.1: validate preferences and apply theme before first paint. */
(() => {
  'use strict';
  const key = 'courtyard-reading-v3.1';
  let saved = {}, previous = {};
  try {
    const raw = localStorage.getItem(key);
    saved = JSON.parse(raw || localStorage.getItem('courtyard-reading-v3') || '{}') || {};
    if (!raw) {
      const root = new URL('../', document.currentScript.src);
      previous = JSON.parse(localStorage.getItem(`courtyard:${root.pathname}:reader-preferences-v2`) || '{}') || {};
      if (!saved.theme && previous.theme === 'dark') saved.theme = 'dark';
    }
  } catch { /* Defaults remain usable when storage is blocked. */ }
  const data = {
    size: Number.isFinite(saved.size) && saved.size >= 18 && saved.size <= 28 ? saved.size : 22,
    weight: [400, 500, 600].includes(saved.weight) ? saved.weight : 500,
    sidebar: saved.sidebar !== false,
    focus: saved.focus === true,
    ui: saved.ui === 'en' ? 'en' : 'zh',
    theme: saved.theme === 'dark' ? 'dark' : 'light'
  };
  const html = document.documentElement;
  html.dataset.theme = data.theme;
  html.dataset.ui = data.ui;
  html.dataset.sidebar = data.sidebar ? 'open' : 'closed';
  html.dataset.focus = data.focus ? 'on' : 'off';
  html.style.setProperty('--reader-size', data.size + 'px');
  html.style.setProperty('--reader-weight', String(data.weight));
  window.ReadingRoomBoot = {key, data};
})();
