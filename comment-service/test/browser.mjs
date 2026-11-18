import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile,mkdir,stat } from 'node:fs/promises';
import { resolve,join,extname,sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { testService,moderate } from './helpers.mjs';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const repo=resolve(fileURLToPath(new URL('../..',import.meta.url))),site=join(repo,'_site');
const out=process.env.SCREENSHOT_DIR||join(repo,'comment-service/test-results');await mkdir(out,{recursive:true});
const api=await testService({port:8910});
const autoApi=await testService({port:8912,settings:{moderation:'auto'}});
let configured=true,apiMode='manual',checks=0;
const ok=(message)=>{checks++;console.log('PASS '+message);};
const fixture=`<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/assets/site.css"><link rel="stylesheet" href="/assets/inline-comments.css"><script defer src="/assets/inline-comments-anchors.js"></script><script defer src="/assets/inline-comments.js"></script></head><body class="reading-page" data-root="../"><header class="site-header" style="height:76px"><a href="/index.html">Home</a><span>Academic note</span></header><main class="site-main"><div class="reading-layout"><aside class="reading-aside">Contents</aside><article class="reading-sheet"><div class="article-body"><section id="intro"><h2>Test note / 测试笔记</h2>
<p id="en">A hydration layer contains water molecules whose structure is influenced by the adjacent biomolecule. Symmetry determines which vibrational responses can be observed in an optical experiment.</p>
<p id="zh">当我们试图用和频光谱去探测生物大分子周围的水合层时，遇到的第一个问题是宏观对称性。水分子的振动与界面环境紧密相连，实验里看到的信号也受这些条件的影响。我们选择跨越多行的中文，检查批注按钮是否仍然跟着选区末尾。</p>
<p id="neighbor">This neighboring paragraph can change independently.</p>
<p id="math-p">An expression <span class="math inline"><math><mi>E</mi><mo>=</mo><mi>h</mi><mi>ν</mi></math></span> belongs to its intact paragraph.</p>
<p><a id="test-link" href="#more">An ordinary working link</a> is still selectable.</p>
<pre><code id="test-code">const untouched = true;</code></pre>
<p id="repeat-a">An ambiguous repeated passage.</p><p id="repeat-b">An ambiguous repeated passage.</p>
${Array.from({length:18},(_,i)=>`<p>Additional paragraph ${i}: scroll through this research note to reach the discussion area. This content provides realistic document height.</p>`).join('\n')}
</section><section id="more"><h2>More</h2><p>Another section, without a comment.</p></section></div></article></div></main></body></html>`;
const web=createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);
    if(pathname==='/assets/inline-comments-config.json'){res.setHeader('Content-Type','application/json');res.end(JSON.stringify({apiBase:configured?(apiMode==='auto'?autoApi.base:api.base):''}));return;}
    if(pathname==='/notes/fixture.html'){res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fixture);return;}
    const file=resolve(site,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(site+sep))throw new Error('Path');
    await stat(file);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.svg':'image/svg+xml','.png':'image/png'})[extname(file)]||'application/octet-stream');res.end(await readFile(file));
  }catch{res.statusCode=404;res.end('Not found');}
});await new Promise(r=>web.listen(8911,'127.0.0.1',r));
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXE?{executablePath:process.env.BROWSER_EXE}:{})});
const context=await browser.newContext({viewport:{width:1536,height:1000}}),page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await context.route('https://challenges.cloudflare.com/turnstile/**',route=>route.fulfill({contentType:'text/javascript',body:`window.turnstile={render(e,o){this.o=o;setTimeout(()=>o.callback(crypto.randomUUID()),30);return 1},reset(){setTimeout(()=>this.o.callback(crypto.randomUUID()),30)},remove(){}};`}));
async function select(selector,start=0,end=75){await page.locator(selector).scrollIntoViewIfNeeded();await page.evaluate(({selector,start,end})=>{const el=document.querySelector(selector),walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n=walker.nextNode();const r=document.createRange();r.setStart(n,Math.min(start,n.length));r.setEnd(n,Math.min(end,n.length));const s=getSelection();s.removeAllRanges();s.addRange(r);document.dispatchEvent(new Event('selectionchange'));},{selector,start,end});await page.waitForTimeout(160);}
async function close(){if(await page.locator('.ic-panel').isVisible())await page.locator('.ic-panel [aria-label="Close comments"]').click();}
try{
  await page.goto('http://127.0.0.1:8911/notes/fixture.html');await page.locator('.ic-status').first().filter({hasText:'No comments'}).waitFor();
  const drag=await page.locator('#en').evaluate(e=>{const n=e.firstChild,a=document.createRange(),b=document.createRange();a.setStart(n,0);a.setEnd(n,1);b.setStart(n,60);b.setEnd(n,61);return {a:a.getBoundingClientRect().toJSON(),b:b.getBoundingClientRect().toJSON()};});
  await page.mouse.move(drag.a.x+1,drag.a.y+drag.a.height/2);await page.mouse.down();await page.mouse.move(drag.b.x+2,drag.b.y+drag.b.height/2,{steps:12});await page.mouse.up();await page.locator('.ic-selection').waitFor({state:'visible'});assert((await page.evaluate(()=>getSelection().toString())).length>20);ok('native mouse drag retains text selection and reveals Comments');
  const h=await page.locator('.article-body').evaluate(e=>e.offsetHeight);
  await select('#en',2,135);await page.locator('.ic-selection').waitFor({state:'visible'});
  assert.equal(await page.locator('.ic-selection').innerText(),'');
  assert.equal(await page.locator('.ic-selection').getAttribute('aria-label'),'Comment on selected text');
  const gutter=await page.evaluate(()=>({body:document.querySelector('.article-body').getBoundingClientRect().right,icon:document.querySelector('.ic-selection').getBoundingClientRect().left}));assert(gutter.icon>=gutter.body+4);
  assert.equal(await page.locator('.article-body').evaluate(e=>e.offsetHeight),h);
  await page.mouse.move(10,10);const opacity=await page.locator('.ic-selection').evaluate(e=>getComputedStyle(e).opacity);assert.equal(opacity,'1');
  ok('selection uses an opaque icon-only control outside the text column without changing article height');
  await page.screenshot({path:join(out,'inline-comments-selection-desktop.png')});
  await page.locator('.ic-selection').click();await page.waitForTimeout(100);
  const boxes=await page.evaluate(()=>({article:document.querySelector('.reading-sheet').getBoundingClientRect().toJSON(),panel:document.querySelector('.ic-panel').getBoundingClientRect().toJSON(),width:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert(boxes.panel.left>=boxes.article.right);assert(boxes.panel.right<=boxes.width);assert(boxes.scroll<=boxes.width);
  ok('desktop card sits to the right without obscuring the article or horizontal scrolling');
  await page.screenshot({path:join(out,'inline-comments-composer-desktop.png')});
  await page.locator('#ic-text').fill('Anonymous inline note <img src=x onerror=alert(1)>');
  await page.locator('.ic-panel button[type=submit]').click();await page.getByText('Submitted for review. This comment is not public yet.',{exact:true}).waitFor();
  const id=await page.locator('.ic-panel .ic-thread').first().getAttribute('data-comment-id');assert(id);
  assert.equal(await page.locator('.ic-discussion .ic-thread').first().getAttribute('data-comment-id'),id);
  assert.equal(await page.locator('.ic-discussion .ic-thread img').count(),0);
  ok('anonymous post reaches a real PostgreSQL engine, shares its canonical ID across views and renders XSS text inert');
  const outsider=await browser.newContext();const outsiderPage=await outsider.newPage();await outsiderPage.goto('http://127.0.0.1:8911/notes/fixture.html');await outsiderPage.getByText('No comments yet. Anonymous comments are reviewed before publication.',{exact:true}).waitFor();assert.equal(await outsiderPage.locator('.ic-thread').count(),0);await outsider.close();
  ok('pending submission is hidden from another visitor');
  await close();await page.reload();await page.locator('.ic-discussion .ic-thread').first().waitFor();assert.equal(await page.locator('.ic-discussion .ic-thread').first().getAttribute('data-comment-id'),id);
  assert.equal((await moderate(api.base,id)).status,200);
  await page.getByRole('button',{name:'Reload comments',exact:true}).click();await page.waitForTimeout(100);
  await page.locator('.ic-discussion .ic-quote-link').first().click();await page.waitForTimeout(400);assert((await page.locator('#en').boundingBox()).y<700);
  await page.locator('.ic-marker').first().click();await page.locator('.ic-panel .ic-reply').first().click();await page.locator('#ic-text').fill('A reply on the same passage.');await page.waitForTimeout(80);await page.locator('.ic-panel button[type=submit]').click();await page.getByText('Submitted for review. This comment is not public yet.',{exact:true}).waitFor();
  assert.equal(await page.locator('.ic-discussion .ic-thread').count(),2);ok('reload restores anchors, bottom quotation jumps to passage, and marker opens replies');
  await close();await page.evaluate(()=>document.querySelector('#neighbor').prepend('An inserted neighbor update. '));await page.waitForTimeout(100);
  assert.equal(await page.locator('.ic-marker').count(),1);
  await page.evaluate(()=>document.querySelector('#en').remove());await page.waitForTimeout(100);
  await page.getByRole('button',{name:'Reload comments',exact:true}).click();await page.getByText('Original passage not found · unresolved anchor').waitFor();assert.equal(await page.locator('.ic-marker').count(),0);
  ok('neighbor edits preserve attachment; removed text remains unresolved in discussion');
  await page.reload();await page.waitForTimeout(150);
  await select('#zh',4,112);const endpoint=await page.evaluate(()=>{const r=getSelection().getRangeAt(0);return [...r.getClientRects()].at(-1).toJSON();});const b=await page.locator('.ic-selection').boundingBox();assert(b.x>=0&&b.x+b.width<=1536);assert(Math.abs(b.y-endpoint.bottom)<90);
  await page.locator('.ic-selection').click();assert((await page.locator('.ic-quote').textContent()).includes('宏观对称性'));await close();ok('multiline Chinese quote and visual-end button positioning');
  await page.evaluate(()=>getSelection().removeAllRanges());await page.locator('#zh').hover();await page.locator('.ic-hover').click();assert((await page.locator('.ic-quote').textContent()).startsWith('当我们'));await close();ok('paragraph hover icon opens a full paragraph comment');
  await select('#test-code',0,10);assert.equal(await page.locator('.ic-selection').isVisible(),false);
  const mathBefore=await page.locator('#math-p math').innerHTML();await page.evaluate(()=>{const r=document.createRange();r.selectNodeContents(document.querySelector('#math-p'));getSelection().removeAllRanges();getSelection().addRange(r);});await page.waitForTimeout(150);await page.locator('.ic-selection').click();assert.equal(await page.locator('#math-p math').innerHTML(),mathBefore);await close();ok('code selections are excluded and MathML uses a non-destructive paragraph fallback');
  await page.evaluate(()=>getSelection().removeAllRanges());await page.locator('#test-link').click();assert(page.url().endsWith('#more'));ok('ordinary links retain native navigation');
  for(const width of [1024,820,390]) {
    await page.setViewportSize({width,height:900});await select('#zh',0,75);await page.locator('.ic-selection').click();
    const v=await page.evaluate(()=>({a:document.querySelector('.reading-sheet').getBoundingClientRect().toJSON(),p:document.querySelector('.ic-panel').getBoundingClientRect().toJSON(),w:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert(v.scroll<=width,JSON.stringify(v));if(width>=768)assert(v.p.left>=v.a.right-1,JSON.stringify(v));else assert(v.p.left>=0&&v.p.right<=width&&v.p.bottom<=900);
    await page.evaluate(()=>document.documentElement.dataset.theme='dark');
    await page.screenshot({path:join(out,`inline-comments-dark-${width}.png`)});await close();
    await page.evaluate(()=>{document.documentElement.dataset.theme='light';document.documentElement.dataset.sidebar='closed';document.documentElement.style.setProperty('--reader-size','28px');});
  }
  ok('tablet/mobile, dark theme, collapsed TOC and larger font preserve viewport bounds');
  await page.setViewportSize({width:1536,height:1000});
  // Multi-paragraph and ambiguous duplicate quote behavior use the actual anchor module.
  const anchorChecks=await page.evaluate(()=>{const a=document.querySelector('.article-body'),A=InlineCommentAnchors,idx=A.index(a);const start=document.querySelector('#en').firstChild,end=document.querySelector('#zh').firstChild,r=document.createRange();r.setStart(start,10);r.setEnd(end,50);getSelection().removeAllRanges();getSelection().addRange(r);const snapshot=A.capture(idx,getSelection());const multi=!!A.resolve(idx,snapshot.anchor);const dup={anchor_type:'text',section_id:'intro',paragraph_id:'invalid',exact:'An ambiguous repeated passage.',prefix:'',suffix:'',start_offset:0,end_offset:30};const ambiguous=A.resolve(idx,dup)===null;getSelection().removeAllRanges();return {multi,ambiguous};});assert.deepEqual(anchorChecks,{multi:true,ambiguous:true});ok('multi-paragraph anchors resolve, ambiguous duplicate quotes do not guess');
  const removedDuplicate=await page.evaluate(()=>{const A=InlineCommentAnchors,a=document.querySelector('.article-body'),one=document.createElement('p'),two=document.createElement('p');one.textContent=two.textContent='A repeated sentence with identical context.';a.append(one,two);let i=A.index(a);const anchor=A.paragraph(i,i.blocks.find(b=>b.el===one)).anchor;one.remove();i=A.index(a);const unresolved=A.resolve(i,anchor)===null;two.remove();return unresolved;});assert(removedDuplicate);ok('removing one duplicate never reattaches to the surviving copy');
  await select('#en',1,1);assert.equal(await page.locator('.ic-selection').isVisible(),false);
  await select('#en',1,2);assert.equal(await page.locator('.ic-selection').isVisible(),false,'whitespace-only selection');
  await select('#en',0,70);await page.keyboard.press('Alt+Shift+c');await page.locator('.ic-panel').waitFor({state:'visible'});await page.keyboard.press('Escape');await page.locator('.ic-panel').waitFor({state:'hidden'});ok('collapsed/whitespace selections are ignored; keyboard shortcut and Escape work');
  await page.getByRole('button',{name:'Add a comment',exact:true}).click();await page.locator('#ic-text').fill('A response lost in transit should not duplicate.');await page.waitForTimeout(100);
  let lost=false;const ids=[];
  await page.route(api.base+'/v1/comments',async route=>{if(route.request().method()!=='POST'){await route.continue();return;}ids.push(route.request().postDataJSON().request_id);if(!lost){lost=true;await route.fetch();await route.abort('failed');}else await route.continue();});
  await page.locator('.ic-panel button[type=submit]').click();await page.getByText(/Not confirmed. Your draft is retained/).waitFor();assert.equal(await page.locator('#ic-text').inputValue(),'A response lost in transit should not duplicate.');await page.waitForTimeout(100);await page.locator('.ic-panel button[type=submit]').click();await page.getByText('Submitted for review. This comment is not public yet.',{exact:true}).waitFor();assert.equal(ids.length,2);assert.equal(ids[0],ids[1]);const count=await api.engine.query('SELECT count(*)::integer AS n FROM academic_comments WHERE content=$1',['A response lost in transit should not duplicate.']);assert.equal(count.rows[0].n,1);assert(await page.locator('.ic-panel .ic-thread').count()>0,'document comment also appears in the right-side thread after submission');await page.unroute(api.base+'/v1/comments');await close();ok('lost response retry keeps draft, reuses submission ID and creates exactly one database record');
  configured=false;await page.reload();await page.getByText(/Comments are not configured yet/).first().waitFor();await select('#en',0,80);await page.locator('.ic-selection').click();assert(await page.locator('.ic-panel button[type=submit]').isDisabled());await close();ok('unconfigured service has an explicit non-destructive disabled state');
  configured=true;await page.route('http://127.0.0.1:8910/**',route=>route.abort());await page.reload();await page.getByText(/Comments are unavailable/).first().waitFor();assert(await page.locator('#en').isVisible());await page.unroute('http://127.0.0.1:8910/**');ok('unavailable backend leaves the article usable');
  // Verify existing real site controls on rendered Quarto pages, without changing site.js.
  await page.goto('http://127.0.0.1:8911/notes/chiral-water-sfg-01-interfacial-symmetry.html');await page.locator('#theme-toggle').click();await page.locator('#type-toggle').click();await page.locator('#size-slider').fill('26');await page.locator('#type-close').click();await page.locator('#search-toggle').click();await page.locator('#search-input').fill('water');await page.locator('#search-close').click();
  await page.locator('#toc-collapse').click();assert.equal(await page.locator('html').getAttribute('data-sidebar'),'closed');
  await page.screenshot({path:join(out,'inline-comments-real-note-controls.png')});
  await page.goto('http://127.0.0.1:8911/notes/chiral-water-sfg-01-interfacial-symmetry.en.html');assert(await page.locator('.ic-discussion').isVisible());ok('real English/Chinese Quarto notes keep theme, typography, TOC and search controls');
  await page.evaluate(()=>localStorage.removeItem('courtyard-reading-v3.1'));await page.reload();await page.evaluate(()=>{const p=[...document.querySelectorAll('.article-body p')].find(p=>p.textContent.length>80&&!p.querySelector('math,.math'));p.dataset.previewTarget='true';});
  await select('[data-preview-target]',0,120);await page.locator('.ic-selection').click();await page.waitForTimeout(100);await page.screenshot({path:join(out,'website-comments-desktop.png')});await close();
  await page.setViewportSize({width:390,height:900});await select('[data-preview-target]',0,90);await page.locator('.ic-selection').click();await page.waitForTimeout(100);await page.screenshot({path:join(out,'website-comments-mobile.png')});await close();
  // Regression for the reported forward-only selection flash. These real mouse
  // movements wait long enough for each floating-control update to occur.
  await page.setViewportSize({width:1536,height:1000});
  for(const direction of ['forward','backward']){
    await page.goto('http://127.0.0.1:8911/notes/fixture.html');
    await page.evaluate(()=>{window.nativeSelectionProbe=[];document.addEventListener('selectionchange',()=>{const s=getSelection();if(!s.isCollapsed)window.nativeSelectionProbe.push({outside:!document.querySelector('.article-body').contains(s.focusNode),below:s.toString().includes('当我们')||s.toString().includes('Additional paragraph')});});});
    const r=await page.locator('#en').evaluate(e=>{const range=document.createRange();range.setStart(e.firstChild,0);range.setEnd(e.firstChild,1);return {p:e.getBoundingClientRect().toJSON(),c:range.getBoundingClientRect().toJSON()};});
    const left=r.c.left+2,right=Math.min(r.p.right-30,left+420),y=r.c.top+r.c.height/2;
    await page.mouse.move(direction==='forward'?left:right,y);await page.mouse.down();
    for(let i=0;i<=35;i++){
      await page.mouse.move(direction==='forward'?left+(right-left)*i/35:right-(right-left)*i/35,y);await page.waitForTimeout(100);
      if(i===18){assert.equal(await page.locator('.ic-selection').evaluate(el=>getComputedStyle(el).pointerEvents),'none');assert.equal(await page.locator('.ic-panel').isVisible(),false);}
    }
    await page.mouse.up();await page.waitForTimeout(150);
    const events=await page.evaluate(()=>window.nativeSelectionProbe);assert(events.length>0);assert(events.every(e=>!e.outside&&!e.below),direction+' selection escaped into unrelated content');
    const icon=await page.locator('.ic-selection').boundingBox(),body=await page.locator('.article-body').boundingBox();assert(icon.x>=body.x+body.width+4);
    assert.equal(await page.locator('.ic-selection').evaluate(el=>getComputedStyle(el).pointerEvents),'auto');
  }
  ok('slow forward/backward native dragging never jumps below the passage or onto comment controls');
  await page.evaluate(()=>getSelection().removeAllRanges());await page.mouse.move(10,10);
  const paragraph=await page.locator('#en').boundingBox();await page.mouse.move(paragraph.x+paragraph.width-8,paragraph.y+12);await page.locator('.ic-hover').waitFor({state:'visible'});
  const hover=await page.locator('.ic-hover').boundingBox();
  for(let i=1;i<=10;i++){await page.mouse.move(paragraph.x+paragraph.width-8+(hover.x+hover.width/2-paragraph.x-paragraph.width+8)*i/10,paragraph.y+12);await page.waitForTimeout(100);assert(await page.locator('.ic-hover').isVisible());}
  await page.waitForTimeout(350);await page.locator('.ic-hover').click();assert((await page.locator('.ic-quote').textContent()).startsWith('A hydration layer'));await close();
  ok('paragraph icon stays clickable across a slow mouse movement through the gutter');

  apiMode='auto';await page.goto('http://127.0.0.1:8911/notes/fixture.html');await page.getByText('No comments yet. Verified comments are published immediately.',{exact:true}).waitFor();
  assert.equal(await page.getByText('Anonymous comments are reviewed before publication.',{exact:true}).count(),0);
  await select('#en',2,135);await page.screenshot({path:join(out,'auto-comments-margin-icon-desktop.png')});await page.locator('.ic-selection').click();await page.locator('#ic-text').fill('Auto-published anonymous note <img src=x onerror=alert(1)>');await page.waitForTimeout(100);await page.locator('.ic-panel button[type=submit]').click();await page.getByText('Comment published.',{exact:true}).waitFor();
  const autoID=await page.locator('.ic-panel .ic-thread').first().getAttribute('data-comment-id');assert.equal(await page.locator('.ic-discussion .ic-thread').first().getAttribute('data-comment-id'),autoID);assert.equal(await page.locator('.ic-thread img').count(),0);assert.equal(await page.locator('.ic-state').count(),0);
  ok('auto mode immediately publishes with matching rail/discussion IDs, no waiting notice and inert HTML');
  const other=await browser.newContext({viewport:{width:1536,height:1000}});
  await other.route('https://challenges.cloudflare.com/turnstile/**',route=>route.fulfill({contentType:'text/javascript',body:`window.turnstile={render(e,o){this.o=o;setTimeout(()=>o.callback(crypto.randomUUID()),30);return 1},reset(){setTimeout(()=>this.o.callback(crypto.randomUUID()),30)},remove(){}};`}));
  const otherPage=await other.newPage();await otherPage.goto('http://127.0.0.1:8911/notes/fixture.html');await otherPage.locator('.ic-discussion .ic-thread').first().waitFor();assert.equal(await otherPage.locator('.ic-discussion .ic-thread').first().getAttribute('data-comment-id'),autoID);
  await otherPage.locator('.ic-discussion .ic-reply').first().click();await otherPage.locator('#ic-text').fill('A different anonymous visitor replies immediately.');await otherPage.waitForTimeout(120);await otherPage.locator('.ic-panel button[type=submit]').click();await otherPage.getByText('Comment published.',{exact:true}).waitFor();assert.equal(await otherPage.locator('.ic-discussion .ic-thread').count(),2);
  await otherPage.reload();await otherPage.locator('.ic-discussion .ic-replies .ic-thread').waitFor();assert.equal(await otherPage.locator('.ic-discussion .ic-thread').count(),2);await other.close();
  await close();await page.reload();await page.locator('.ic-discussion .ic-replies .ic-thread').waitFor();assert.equal(await page.locator('.ic-discussion .ic-thread').count(),2);assert.equal(await page.locator('.ic-state').count(),0);
  ok('a second anonymous browser sees the post, publishes a reply, and both browsers retain the public thread after reload');
  await page.getByRole('button',{name:'Add a comment',exact:true}).click();await page.locator('#ic-text').fill('This failed verification must never become public.');await page.waitForTimeout(100);await page.evaluate(()=>window.turnstile.o.callback('bad'));await page.locator('.ic-panel button[type=submit]').click();await page.getByText(/Not confirmed. Your draft is retained/).waitFor();
  const blocked=await autoApi.engine.query('SELECT count(*)::integer AS n FROM academic_comments WHERE content=$1',['This failed verification must never become public.']);assert.equal(blocked.rows[0].n,0);assert.equal(await page.locator('#ic-text').inputValue(),'This failed verification must never become public.');await close();
  ok('auto mode does not publish when verification fails and retains the visitor draft');
  await select('#zh',4,100);await page.screenshot({path:join(out,'auto-comments-chinese-icon.png')});await page.locator('.ic-selection').click();await page.screenshot({path:join(out,'auto-comments-composer-desktop.png')});await close();
  await page.setViewportSize({width:390,height:900});await select('#zh',4,90);const narrow=await page.locator('.ic-selection').boundingBox(),column=await page.locator('.article-body').boundingBox();assert(narrow.x>=column.x+column.width+4&&narrow.x+narrow.width<=390);await page.screenshot({path:join(out,'auto-comments-margin-icon-mobile.png')});
  await page.locator('.ic-selection').click();await page.screenshot({path:join(out,'auto-comments-composer-mobile.png')});await close();

  assert.deepEqual(errors,[]);console.log(`BROWSER PASS: ${checks} scenarios. Persistence uses PGlite PostgreSQL; Turnstile widget/verification are test doubles only.`);
}finally{await context.close();await browser.close();await new Promise(r=>web.close(r));await api.close();await autoApi.close();}
