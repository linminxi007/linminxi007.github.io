/* GA4 analytics enabled by default, with a persistent visitor opt-out.
   Default enablement is a site policy, not evidence of affirmative consent. */
(() => {
  'use strict';
  if (window.ReadingRoomAnalytics) return;
  const measurementId = 'G-NW39FZTLSN';
  const consentKey = 'reading-room-analytics-consent-v1';
  const ttl = 180 * 24 * 60 * 60 * 1000;
  const thresholds = [25, 50, 75, 90];
  const url = new URL(location.href);
  const debug = url.searchParams.get('analytics_debug') === '1';
  // Preview builds do not pollute production reports unless explicitly debugging.
  const eligibleHost = url.hostname === 'linminxi007.github.io' || debug;
  const disableKey = `ga-disable-${measurementId}`;
  const banner = document.getElementById('analytics-consent');
  const settings = document.getElementById('analytics-settings');
  const article = document.body.classList.contains('reading-page') &&
    url.pathname.startsWith('/notes/') && document.querySelector('.reading-sheet .article-body');
  const depthKey = `reading-room-note-depth-v1:${url.pathname}`;
  const seen = new Set();
  let allowed = false;
  let initialized = false;
  let frame = 0;

  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(consentKey));
      if (saved && ['granted', 'denied'].includes(saved.value) &&
          saved.at <= Date.now() && Date.now() - saved.at < ttl) return saved.value;
    } catch { /* Storage may be unavailable; keep the page usable. */ }
    return null;
  }

  function setConsent(value, persist = true) {
    allowed = value === 'granted' && eligibleHost;
    window[disableKey] = !allowed;
    if (persist) {
      try { localStorage.setItem(consentKey, JSON.stringify({value, at: Date.now()})); } catch {}
    }
    if (banner) banner.hidden = true;
    if (allowed) {
      if (!initialized) start();
      else window.gtag('consent', 'update', {analytics_storage: 'granted'});
      schedule();
    } else if (initialized) {
      // The disable flag takes effect immediately; reload unloads all Google listeners.
      clearAnalyticsCookies();
      location.reload();
    }
  }

  function clearAnalyticsCookies() {
    for (const entry of document.cookie.split(';')) {
      const name = entry.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ['', location.hostname, `.${location.hostname}`]) {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
      }
    }
  }

  function start() {
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', {analytics_storage: 'granted'});
    window.gtag('js', new Date());
    let referrer = '';
    try { referrer = new URL(document.referrer).origin + '/'; } catch {}
    // A single automatic page_view per document; never send a second manual one.
    // In GA4 disable Enhanced Measurement > Page views > history-based changes:
    // site.js can replace the URL when changing UI language without navigation.
    window.gtag('config', measurementId, {
      send_page_view: true,
      page_location: url.origin + url.pathname,
      page_referrer: referrer,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: location.hostname,
      cookie_expires: ttl / 1000,
      ...(debug ? {debug_mode: true} : {})
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.append(script);
    if (article) {
      try {
        const saved = JSON.parse(sessionStorage.getItem(depthKey));
        if (Array.isArray(saved)) saved.filter(n => thresholds.includes(n)).forEach(n => seen.add(n));
      } catch {}
    }
  }

  function measureDepth() {
    frame = 0;
    if (!allowed || !article || document.visibilityState !== 'visible') return;
    const rect = article.getBoundingClientRect();
    // Fraction of the actual body reached by the viewport bottom. This measures
    // exposure, not attention; jumping to an anchor can cross several thresholds.
    if (rect.height <= 0 || rect.top >= innerHeight || rect.bottom <= 0) return;
    const percent = Math.max(0, Math.min(100, (innerHeight - rect.top) / rect.height * 100));
    for (const threshold of thresholds) {
      if (percent < threshold || seen.has(threshold)) continue;
      seen.add(threshold);
      // Tab-scoped sessionStorage survives reloads and language round trips.
      try { sessionStorage.setItem(depthKey, JSON.stringify([...seen])); } catch {}
      window.gtag('event', 'note_scroll_depth', {
        send_to: measurementId,
        note_path: url.pathname,
        note_title: (document.querySelector('#main h1')?.textContent || document.title).trim().slice(0, 100),
        scroll_percent: threshold
      });
    }
  }

  function schedule() {
    if (!frame && allowed && article) frame = requestAnimationFrame(measureDepth);
  }

  function updateLanguage() {
    const en = document.documentElement.dataset.ui === 'en';
    const labels = en ? {
      'analytics-consent-title': 'Analytics settings',
      'analytics-consent-text': 'This site enables Google Analytics cookies by default to measure visits, engagement time, reading depth, referral sources, approximate region and device. You can turn analytics off here without affecting reading.',
      'analytics-accept': 'Enable analytics', 'analytics-decline': 'Turn off analytics',
      'analytics-settings': 'Analytics settings', 'analytics-privacy': 'Privacy notice'
    } : {
      'analytics-consent-title': '统计设置',
      'analytics-consent-text': '本网站默认启用 Google Analytics，使用 Cookie 统计浏览量、互动时长、阅读深度、访问来源、大致地区和设备。你可以在此关闭统计，不影响阅读。',
      'analytics-accept': '启用统计', 'analytics-decline': '关闭统计',
      'analytics-settings': '统计设置', 'analytics-privacy': '隐私说明'
    };
    for (const [id, text] of Object.entries(labels)) {
      const element = document.getElementById(id);
      if (element) element.textContent = text;
    }
  }

  window.ReadingRoomAnalytics = {measurementId};
  window[disableKey] = true;
  settings?.addEventListener('click', () => {
    if (banner) banner.hidden = false;
    document.getElementById('analytics-accept')?.focus();
  });
  document.getElementById('analytics-accept')?.addEventListener('click', () => { setConsent('granted'); settings?.focus(); });
  document.getElementById('analytics-decline')?.addEventListener('click', () => { setConsent('denied'); settings?.focus(); });
  window.addEventListener('storage', event => {
    if (event.key !== consentKey) return;
    const value = readChoice();
    setConsent(value || 'granted', false);
  });
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule, {passive: true});
  window.addEventListener('pageshow', schedule);
  document.addEventListener('visibilitychange', schedule);
  if (article && 'ResizeObserver' in window) new ResizeObserver(schedule).observe(article);
  new MutationObserver(updateLanguage).observe(document.documentElement, {attributes: true, attributeFilter: ['data-ui']});
  updateLanguage();
  const choice = readChoice();
  // Do not persist a synthetic opt-in. Keep an existing explicit refusal.
  // The preference panel opens only when the visitor clicks its footer button.
  setConsent(choice || 'granted', false);
})();
