// Behavior tests execute the production script in a DOM/viewport fixture.
const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('assets/analytics.js', 'utf8');
const choiceKey = 'reading-room-analytics-consent-v1';
function fixture({path = '/notes/test.html', host = 'linminxi007.github.io', query = '', note = true, choice, blocked = false, local = new Map(), session = new Map(), referrer = 'https://example.edu/private?email=test', height = 2000} = {}) {
  if (choice) local.set(choiceKey, JSON.stringify({value: choice, at: Date.now()}));
  const listeners = {}, nodes = {}, scripts = [], cookies = [], frames = [];
  for (const id of ['analytics-consent', 'analytics-settings', 'analytics-consent-title', 'analytics-consent-text', 'analytics-accept', 'analytics-decline', 'analytics-privacy']) {
    nodes[id] = {hidden: true, addEventListener(event, fn) {this[event] = fn;}, focus() {this.focused = true;}};
  }
  let rect = {top: 600, height, bottom: height + 600};
  const article = {getBoundingClientRect: () => rect};
  const location = new URL(`https://${host}${path}${query}`);
  location.reload = () => { location.reloaded = true; };
  const storage = map => ({
    getItem(key) {if (blocked) throw Error('blocked'); return map.get(key) ?? null;},
    setItem(key, value) {if (blocked) throw Error('blocked'); map.set(key, value);}
  });
  const document = {
    visibilityState: 'visible', referrer, title: 'Test note · site',
    documentElement: {dataset: {ui: 'en'}},
    body: {classList: {contains: () => note}},
    getElementById: id => nodes[id],
    querySelector: sel => sel === '#main h1' ? {textContent: ' Test note '} : article,
    head: {append: s => scripts.push(s)}, createElement: () => ({}),
    addEventListener: (name, fn) => { listeners[name] = fn; }
  };
  Object.defineProperty(document, 'cookie', {get: () => '_ga=abc; _ga_NW39FZTLSN=def; preference=keep', set: v => cookies.push(v)});
  const context = {
    document, location, URL, Date, Set, JSON, innerHeight: 600,
    localStorage: storage(local), sessionStorage: storage(session),
    requestAnimationFrame: fn => {frames.push(fn); return frames.length;},
    addEventListener: (name, fn) => { listeners[name] = fn; },
    MutationObserver: class {observe() {}}, ResizeObserver: class {observe() {}}
  };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(source, context);
  const flush = () => {while (frames.length) frames.shift()();};
  const messages = () => Array.from(context.dataLayer || [], args => Array.from(args));
  const events = () => messages().filter(x => x[0] === 'event');
  return {context, document, nodes, scripts, cookies, location, local, session, listeners, flush, messages, events,
    click(id) {nodes[id].click(); flush();},
    depth(percent) {rect = {top: 600 - height * percent / 100, height, bottom: 600 - height * percent / 100 + height}; listeners.scroll(); flush();},
    rerun() {vm.runInContext(source, context);}
  };
}

test('no Google requests or events before opt-in; decline remains disabled', () => {
  const f = fixture(); assert.equal(f.nodes['analytics-consent'].hidden, false);
  f.depth(90); assert.equal(f.scripts.length, 0); assert.equal(f.events().length, 0);
  f.click('analytics-decline'); assert.equal(f.scripts.length, 0);
  assert.equal(f.context['ga-disable-G-NW39FZTLSN'], true);
  const reload = fixture({local: f.local}); assert.equal(reload.scripts.length, 0);
});
test('one initialization and automatic pageview; repeated accept/script do not duplicate', () => {
  const f = fixture(); f.click('analytics-accept'); f.click('analytics-accept'); f.rerun();
  assert.equal(f.scripts.length, 1);
  const configs = f.messages().filter(x => x[0] === 'config'); assert.equal(configs.length, 1);
  assert.equal(configs[0][1], 'G-NW39FZTLSN'); assert.equal(configs[0][2].send_page_view, true);
  assert.equal(f.events().filter(x => x[1] === 'page_view').length, 0);
  assert.equal(f.messages()[0][2].analytics_storage, 'denied');
});
test('article thresholds, payload, RAF throttling, reverse scrolling and repeats', () => {
  const f = fixture({choice: 'granted'}); f.flush(); f.depth(24); assert.equal(f.events().length, 0);
  f.depth(25); f.depth(50); f.depth(75); f.depth(90); f.depth(30); f.depth(95);
  assert.deepEqual(f.events().map(x => x[2].scroll_percent), [25, 50, 75, 90]);
  assert.ok(f.events().every(x => x[1] === 'note_scroll_depth' && x[2].note_path === '/notes/test.html' && x[2].note_title === 'Test note'));
});
test('reload and language round trips retain per-URL deduplication', () => {
  const f = fixture({choice: 'granted'}); f.depth(75);
  const reload = fixture({local: f.local, session: f.session}); reload.depth(90);
  assert.deepEqual(reload.events().map(x => x[2].scroll_percent), [90]);
  const en = fixture({path: '/notes/test.en.html', local: f.local, session: f.session}); en.depth(90);
  assert.deepEqual(en.events().map(x => x[2].scroll_percent), [25, 50, 75, 90]);
  const back = fixture({local: f.local, session: f.session}); back.depth(90); assert.equal(back.events().length, 0);
});
test('new tab session records thresholds anew', () => {
  const f = fixture({choice: 'granted'}); f.depth(90);
  const fresh = fixture({local: f.local}); fresh.depth(90); assert.equal(fresh.events().length, 4);
});
test('home, about and note directory do not send reading events', () => {
  for (const path of ['/', '/about.html', '/notes/index.html']) {
    const f = fixture({path, note: false, choice: 'granted'}); f.depth(90);
    assert.equal(f.scripts.length, 1); assert.equal(f.events().length, 0);
  }
});
test('hidden tabs do not send reading events; visibility restoration checks depth', () => {
  const f = fixture({choice: 'granted'}); f.document.visibilityState = 'hidden'; f.depth(90);
  assert.equal(f.events().length, 0); f.document.visibilityState = 'visible'; f.listeners.visibilitychange(); f.flush();
  assert.equal(f.events().length, 4);
});
test('short articles can cross several thresholds on initial exposure', () => {
  const f = fixture({choice: 'granted', height: 200}); f.depth(100); assert.equal(f.events().length, 4);
});
test('withdrawal stops events, clears only GA cookies, and reloads', () => {
  const f = fixture({choice: 'granted'}); f.click('analytics-settings'); assert.equal(f.nodes['analytics-consent'].hidden, false);
  f.click('analytics-decline'); f.depth(90); assert.equal(f.events().length, 0);
  assert.equal(f.location.reloaded, true); assert.equal(f.context['ga-disable-G-NW39FZTLSN'], true);
  assert.ok(f.cookies.some(x => x.startsWith('_ga='))); assert.ok(f.cookies.every(x => !x.startsWith('preference=')));
});
test('other-tab withdrawal is applied without writing consent again', () => {
  const f = fixture({choice: 'granted'}); f.local.set(choiceKey, JSON.stringify({value: 'denied', at: Date.now()}));
  f.listeners.storage({key: choiceKey}); f.depth(90); assert.equal(f.events().length, 0); assert.equal(f.location.reloaded, true);
});
test('blocked storage does not break opt-in or in-document deduplication', () => {
  const f = fixture({blocked: true}); f.click('analytics-accept'); f.depth(90); f.depth(90);
  assert.equal(f.scripts.length, 1); assert.equal(f.events().length, 4);
});
test('expired, invalid or future-dated consent is not reused', () => {
  for (const data of ['bad', JSON.stringify({value: 'granted', at: 1}), JSON.stringify({value: 'granted', at: Date.now() + 100000})]) {
    const f = fixture({local: new Map([[choiceKey, data]])}); assert.equal(f.scripts.length, 0); assert.equal(f.nodes['analytics-consent'].hidden, false);
  }
});
test('preview excluded by default; debug requires opt-in and sets debug_mode', () => {
  const preview = fixture({host: 'localhost', choice: 'granted'}); assert.equal(preview.scripts.length, 0);
  const debug = fixture({host: 'localhost', query: '?analytics_debug=1'}); assert.equal(debug.scripts.length, 0);
  debug.click('analytics-accept'); assert.equal(debug.messages().find(x => x[0] === 'config')[2].debug_mode, true);
});
test('query strings, fragment and referrer paths are excluded; ads disabled', () => {
  const f = fixture({choice: 'granted', query: '?email=private@example.com#secret'});
  const config = f.messages().find(x => x[0] === 'config')[2];
  assert.equal(config.page_location, 'https://linminxi007.github.io/notes/test.html');
  assert.equal(config.page_referrer, 'https://example.edu/');
  assert.equal(config.allow_google_signals, false); assert.equal(config.allow_ad_personalization_signals, false);
});
