/* Anonymous annotations: one remote record feeds the rail and Discussion. */
(() => {
  'use strict';
  const article=document.querySelector('.reading-page .article-body'), A=window.InlineCommentAnchors;
  if(!article||!A)return;
  const root=new URL(document.body.dataset.root||'./',location.href);
  const pagePath=decodeURIComponent(location.pathname);
  const $=(s,c=document)=>c.querySelector(s);
  const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const button=(text,fn,cls='')=>{const el=make('button','ic-button '+cls,text);el.type='button';el.addEventListener('click',fn);return el;};
  const icon=()=>{const el=document.createElementNS('http://www.w3.org/2000/svg','svg');el.classList.add('ic-icon');el.setAttribute('viewBox','0 0 24 24');el.setAttribute('fill','none');el.setAttribute('stroke','currentColor');el.setAttribute('stroke-width','1.5');el.setAttribute('aria-hidden','true');const p=document.createElementNS(el.namespaceURI,'path');p.setAttribute('d','M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-3H3V6a2 2 0 0 1 2-2Z');el.append(p);return el;};
  const ui=make('div','ic-ui');
  const selectionButton=button('',()=>openSnapshot(snapshot,null,selectionButton),'ic-selection');selectionButton.prepend(icon());selectionButton.setAttribute('aria-label','Comment on selected text');selectionButton.hidden=true;
  const hoverButton=button('',()=>{if(hoverBlock)openSnapshot(A.paragraph(idx,hoverBlock),null,hoverButton);},'ic-hover');hoverButton.append(icon());hoverButton.setAttribute('aria-label','Comment on this paragraph');hoverButton.hidden=true;
  const markerLayer=make('div','ic-markers');
  const panel=make('aside','ic-panel');panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','ic-title');
  const head=make('div','ic-panel-head'),title=make('h2','','Comments');title.id='ic-title';
  const closeButton=button('×',close);closeButton.setAttribute('aria-label','Close comments');head.append(title,closeButton);
  const quote=make('blockquote','ic-quote'),panelThreads=make('div','ic-panel-threads'),form=make('form');
  const nickLabel=make('label','','Nickname (optional)'),nick=make('input');nick.id='ic-nickname';nick.maxLength=60;nick.autocomplete='nickname';nickLabel.htmlFor=nick.id;
  const textLabel=make('label','','Comment'),text=make('textarea');text.id='ic-text';text.maxLength=5000;text.required=true;textLabel.htmlFor=text.id;
  const challenge=make('div','ic-turnstile'),actions=make('div','ic-actions'),submit=make('button','ic-button','Submit');submit.type='submit';submit.disabled=true;
  const cancel=button('Cancel',close),formStatus=make('p','ic-status');formStatus.setAttribute('role','status');formStatus.setAttribute('aria-live','polite');
  const replyStatus=make('p','ic-status');actions.append(submit,cancel);form.append(replyStatus,nickLabel,nick,textLabel,text,challenge,actions,formStatus);
  panel.append(head,quote,panelThreads,form);ui.append(selectionButton,hoverButton,markerLayer,panel);document.body.append(ui);
  const discussion=make('section','ic-discussion');discussion.id='discussion-comments';discussion.setAttribute('aria-labelledby','ic-discussion-title');
  const discussionTitle=make('h2','','Discussion / Comments');discussionTitle.id='ic-discussion-title';
  const state=make('p','ic-status','Loading comment service…');state.setAttribute('role','status');
  const newComment=button('Add a comment',()=>openSnapshot({anchor:A.documentAnchor(),range:null,block:null},null,newComment));
  const reload=button('Reload comments',()=>initialize());const topActions=make('div','ic-actions');topActions.append(newComment,reload);
  const list=make('div','ic-discussion-list'),loadMore=button('Load more comments',()=>refresh(false));loadMore.hidden=true;
  discussion.append(discussionTitle,state,topActions,list,loadMore);article.after(discussion);
  let idx=A.index(article),snapshot=null,hoverBlock=null,active=null,returnFocus=null,records=new Map(),markers=[],nextCursor=null;
  let apiBase='',service=null,ready=false,requestSequence=0,refreshSequence=0,pendingRequest=null,submitting=false;
  let widget=null,challengeToken='',turnstileLoading=null,raf=0,selectionTimer=0,lastSelection=0,dirty=false,selecting=false,hoverHideTimer=0;
  let visitorKey;
  try {visitorKey=sessionStorage.getItem('academic-comment-visitor');}catch{}
  if(!/^[A-Za-z0-9_-]{32,128}$/.test(visitorKey||'')) {
    visitorKey=[...crypto.getRandomValues(new Uint8Array(32))].map(x=>x.toString(16).padStart(2,'0')).join('');
    try{sessionStorage.setItem('academic-comment-visitor',visitorKey);}catch{}
  }
  // This key is an anonymous ownership capability, never a comment database.
  async function api(path,options={}) {
    const response=await fetch(apiBase+path,{...options,headers:{'Content-Type':'application/json','X-Visitor-Key':visitorKey,...options.headers},signal:AbortSignal.timeout(15000),credentials:'omit',cache:'no-store'});
    let value;try{value=await response.json();}catch{throw new Error('Comment service returned an invalid response.');}
    if(!response.ok)throw new Error(value.error||'Comment service unavailable.');return value;
  }
  const automatic = () => service?.moderation === 'auto';
  const postingPolicy = () => automatic() ? 'Verified comments are published immediately.' : 'Anonymous comments are reviewed before publication.';
  function showError(message){state.textContent=message;formStatus.textContent=message;}
  async function initialize() {
    const seq=++requestSequence;ready=false;submit.disabled=true;state.textContent='Loading comment service…';
    try {
      const response=await fetch(new URL('assets/inline-comments-config.json',root),{cache:'no-store',signal:AbortSignal.timeout(10000)});
      if(!response.ok)throw new Error('Comment configuration is unavailable.');
      const cfg=await response.json();if(seq!==requestSequence)return;
      if(!cfg.apiBase) {showError('Comments are not configured yet. Nothing has been submitted. / 评论服务尚未配置，未提交任何内容。');return;}
      const url=new URL(cfg.apiBase);if(url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))throw new Error('Comment service must use HTTPS.');
      apiBase=url.href.replace(/\/$/,'');service=await api('/v1/config');if(seq!==requestSequence)return;
      if(!service.turnstile_site_key)throw new Error('Comment verification is not configured.');
      ready=true;formStatus.textContent=postingPolicy();
      await refresh(true);if(!panel.hidden)await ensureChallenge();
    }catch(error){if(seq===requestSequence)showError('Comments are unavailable. Your article and draft are unchanged. '+error.message);}
  }
  function updateDiscussionStatus() {
    const hasPending=[...records.values()].some(record=>record.status==='pending');
    state.textContent=records.size ? `${records.size} comments loaded.`+(hasPending?' Pending comments are visible only to their submitting visitor.':'') : 'No comments yet. '+postingPolicy();
  }
  async function refresh(reset=true) {
    if(!ready)return;
    const sequence=++refreshSequence;
    try {
      const data=await api('/v1/comments?page='+encodeURIComponent(pagePath)+(reset?'':'&cursor='+encodeURIComponent(nextCursor||'0')));
      if(sequence!==refreshSequence)return;
      if(reset)records=new Map();
      for(const record of data.comments)records.set(record.comment_id,record);
      nextCursor=data.next_cursor;loadMore.hidden=!nextCursor;
      updateDiscussionStatus();
      render();
    }catch(error){showError('Unable to load comments. '+error.message);}
  }
  function blockFor(el){return idx.blocks.find(b=>b.el===el);}
  function rebuild(){idx=A.index(article);dirty=false;}
  function endpoint(range) {
    if(!range)return null;
    const caret=range.cloneRange();caret.collapse(false);const r=caret.getBoundingClientRect();
    const rects=[...range.getClientRects()].filter(x=>x.width||x.height);return r.height?r:rects.at(-1)||null;
  }
  function placeGutterIcon(el,rect) {
    const column=article.getBoundingClientRect(),width=28,left=column.right+6;
    // Never clamp an annotation control back onto the selected words. The
    // existing reading-sheet padding supplies this gutter, including on phones.
    if(!rect||rect.bottom<0||rect.top>innerHeight||left+width>innerWidth-6){el.hidden=true;return;}
    el.style.left=left+'px';
    el.style.top=Math.max(6,Math.min(rect.top+(rect.height||rect.bottom-rect.top)/2-14,innerHeight-34))+'px';
    el.hidden=false;
  }
  function updateSelection() {
    lastSelection=performance.now();if(!panel.hidden)return;
    const focused=document.activeElement;
    if(focused?.matches('input,textarea,[contenteditable]')||document.querySelector('dialog[open]')){snapshot=null;selectionButton.hidden=true;return;}
    if(dirty)rebuild();
    const selection=getSelection();
    try { snapshot=A.capture(idx,selection); } catch { snapshot=null; }
    selectionButton.hidden=!snapshot;
    if(snapshot){
      // Native Selection focus is the moving end in either drag direction.
      const focus=document.createRange();focus.setStart(selection.focusNode,selection.focusOffset);focus.collapse(true);
      snapshot.focusRange=focus;
      hoverButton.hidden=true;
      placeGutterIcon(selectionButton,endpoint(focus)||endpoint(snapshot.range));
    }
  }
  function queueSelection() {
    clearTimeout(selectionTimer);const delay=Math.max(0,80-(performance.now()-lastSelection));
    selectionTimer=setTimeout(()=>requestAnimationFrame(updateSelection),delay);
  }
  document.addEventListener('selectionchange',queueSelection);
  document.addEventListener('pointerdown',event=>{
    if(event.button!==0||!panel.hidden||!article.contains(event.target))return;
    selecting=true;ui.classList.add('ic-selecting');hoverButton.hidden=true;clearTimeout(hoverHideTimer);
  },true);
  function endSelection(){selecting=false;ui.classList.remove('ic-selecting');queueSelection();}
  document.addEventListener('pointerup',endSelection,true);
  document.addEventListener('pointercancel',endSelection,true);
  addEventListener('blur',()=>{selecting=false;ui.classList.remove('ic-selecting');hoverButton.hidden=true;});
  selectionButton.addEventListener('pointerdown',event=>{if(event.button===0)event.preventDefault();});
  hoverButton.addEventListener('pointerdown',event=>{if(event.button===0)event.preventDefault();});
  function cancelHoverHide(){clearTimeout(hoverHideTimer);}
  function hideHoverLater(){
    cancelHoverHide();hoverHideTimer=setTimeout(()=>{if(!hoverButton.matches(':hover,:focus'))hoverButton.hidden=true;},250);
  }
  article.addEventListener('pointerover',event=>{
    if(event.pointerType==='touch'||selecting||!panel.hidden||!getSelection()?.isCollapsed)return;
    if(dirty)rebuild();const el=event.target.closest('p,li,.math.display');hoverBlock=blockFor(el);
    if(!hoverBlock||el.closest('pre,code')){hideHoverLater();return;}
    cancelHoverHide();positionHover();
  });
  article.addEventListener('pointerleave',hideHoverLater);
  hoverButton.addEventListener('pointerenter',cancelHoverHide);
  hoverButton.addEventListener('focus',cancelHoverHide);
  hoverButton.addEventListener('pointerleave',hideHoverLater);
  hoverButton.addEventListener('blur',hideHoverLater);
  document.addEventListener('pointermove',event=>{
    if(selecting||hoverButton.hidden||!hoverBlock)return;
    const p=hoverBlock.el.getBoundingClientRect(),b=hoverButton.getBoundingClientRect();
    // Keep the icon alive while traversing the real gap. No invisible element
    // overlaps text or links, so hover support cannot steal native selections.
    const inside=(r,pad=0)=>event.clientX>=r.left-pad&&event.clientX<=r.right+pad&&event.clientY>=r.top-pad&&event.clientY<=r.bottom+pad;
    const corridor={left:p.right-4,right:b.right+4,top:Math.min(p.top,b.top)-4,bottom:Math.max(p.bottom,b.bottom)+4};
    if(inside(p)||inside(b,4)||inside(corridor))cancelHoverHide();else hideHoverLater();
  },{passive:true});
  // Keyboard equivalent of the hover icon: Alt+Shift+C on a focused paragraph/link.
  article.addEventListener('keydown',event=>{
    if(event.altKey&&event.shiftKey&&event.code==='KeyC') {
      if(dirty)rebuild();const block=blockFor(event.target.closest('p,li,.math.display'));
      if(block){event.preventDefault();openSnapshot(A.paragraph(idx,block),null,event.target);}
    }
  });
  function positionHover(){if(!hoverBlock||selecting)return;const r=hoverBlock.el.getBoundingClientRect();placeGutterIcon(hoverButton,{top:r.top,bottom:r.top+28,height:28});}
  function openSnapshot(value,parent,trigger) {
    if(!value)return;
    if(value.anchor.exact.length>8000){showError('This paragraph is too long. Please select a shorter passage.');return;}
    // Clone and snapshot before input focus changes the browser selection.
    const anchor=structuredClone(value.anchor),range=value.range?.cloneRange()||null;
    active={anchor,range,block:value.block,parent:parent||null};returnFocus=trigger||document.activeElement;
    quote.textContent=anchor.anchor_type==='document'?'Comment on this article':anchor.exact;
    replyStatus.textContent=parent?'Reply to '+(records.get(parent)?.nickname||'Anonymous'):'';
    text.value='';pendingRequest=null;submit.disabled=!ready;
    selectionButton.hidden=true;hoverButton.hidden=true;panel.hidden=false;document.body.classList.add('ic-panel-open');
    formStatus.textContent=ready?postingPolicy():state.textContent;
    renderPanel();schedulePosition();highlightActive();text.focus({preventScroll:true});
    requestAnimationFrame(()=>{
      if(!active||panel.hidden||innerWidth<768)return;
      const r=active.range?.getBoundingClientRect()||active.block?.getBoundingClientRect();
      const top=$('.site-header')?.getBoundingClientRect().bottom||80;
      if(r&&(r.top>innerHeight-100||r.bottom<top+16))active.block?.scrollIntoView({block:'center',behavior:'instant'});
      schedulePosition();
    });
    if(ready)ensureChallenge();
  }
  function close() {
    if(submitting)return;
    panel.hidden=true;document.body.classList.remove('ic-panel-open');active=null;clearActiveHighlight();
    if(widget!==null&&window.turnstile){window.turnstile.remove(widget);widget=null;}challengeToken='';challenge.replaceChildren();
    if(returnFocus?.isConnected&&!returnFocus.hidden)returnFocus.focus({preventScroll:true});else newComment.focus({preventScroll:true});
    schedulePosition();
  }
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!panel.hidden){event.preventDefault();event.stopPropagation();close();}
    if(!event.defaultPrevented&&event.altKey&&event.shiftKey&&event.code==='KeyC'&&panel.hidden){
      updateSelection();if(snapshot){event.preventDefault();openSnapshot(snapshot,null,document.activeElement);}
    }
  });
  async function ensureChallenge() {
    submit.disabled=!ready;if(!ready||widget!==null||panel.hidden)return;
    try {
      if(!window.turnstile) {
        turnstileLoading ||= new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;script.onload=resolve;script.onerror=()=>reject(new Error('Anti-bot verification could not load.'));document.head.append(script);});
        await turnstileLoading;
      }
      if(panel.hidden||widget!==null)return;
      widget=window.turnstile.render(challenge,{sitekey:service.turnstile_site_key,action:'academic-comment',theme:document.documentElement.dataset.theme==='dark'?'dark':'light',size:'compact',callback:token=>{challengeToken=token;},'expired-callback':()=>{challengeToken='';},'error-callback':()=>{challengeToken='';formStatus.textContent='Verification unavailable. Please retry when your connection is restored.';}});
    }catch(error){turnstileLoading=null;formStatus.textContent=error.message;submit.disabled=true;}
  }
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(!ready||!active||submitting)return;
    const payload={page_path:pagePath,parent_id:active.parent,nickname:nick.value.trim(),content:text.value.trim(),anchor:active.anchor};
    if(!payload.content)return;
    const fingerprint=JSON.stringify(payload);
    if(!pendingRequest||pendingRequest.fingerprint!==fingerprint)pendingRequest={fingerprint,request_id:crypto.randomUUID()};
    if(!challengeToken){formStatus.textContent='Complete the anti-bot verification, then submit again.';await ensureChallenge();return;}
    submitting=true;submit.disabled=true;cancel.disabled=true;closeButton.disabled=true;formStatus.textContent='Submitting…';
    try {
      const result=await api('/v1/comments',{method:'POST',body:JSON.stringify({...payload,request_id:pendingRequest.request_id,turnstile_token:challengeToken})});
      ++refreshSequence; // An older in-flight GET must not discard the new submission.
      records.set(result.comment.comment_id,result.comment);pendingRequest=null;text.value='';
      formStatus.textContent=result.comment.status==='approved'?'Comment published.':'Submitted for review. This comment is not public yet.';
      // Keep a submitted thread in the rail; subsequent posts are replies to its root.
      active.parent=result.comment.comment_id;replyStatus.textContent='Reply to '+result.comment.nickname;
      updateDiscussionStatus();render();
      if(widget!==null&&window.turnstile)window.turnstile.reset(widget);challengeToken='';
    }catch(error){formStatus.textContent='Not confirmed. Your draft is retained; retrying the same text is safe. '+error.message;if(widget!==null&&window.turnstile)window.turnstile.reset(widget);challengeToken='';}
    finally{submitting=false;submit.disabled=!ready;cancel.disabled=false;closeButton.disabled=false;schedulePosition();}
  });
  function threadNode(record,depth=0) {
    const el=make('article','ic-thread');el.dataset.commentId=record.comment_id;
    const header=make('header'),author=make('strong','',record.nickname||'Anonymous'),time=make('time','',new Date(record.created_at).toLocaleString());time.dateTime=record.created_at;
    header.append(author,time);if(record.status!=='approved')header.append(make('span','ic-state',record.status==='pending'?'Pending review · only visible to you':'Not published · only visible to you'));
    el.append(header);
    const a=record.anchor,target=A.resolve(idx,a);
    if(!record.parent_id&&a.anchor_type!=='document') {
      const jump=button(a.exact,()=>jumpTo(record),'ic-quote-link');jump.disabled=!target;el.append(jump);
      if(!target)el.append(make('p','ic-status','Original passage not found · unresolved anchor'));
    }
    el.append(make('p','ic-content',record.content));
    if(record.status!=='rejected')el.append(button('Reply',()=>openSnapshot({anchor:a,range:target?.range,block:target?.block},record.comment_id,document.activeElement),'ic-reply'));
    const replies=[...records.values()].filter(r=>r.parent_id===record.comment_id);
    if(replies.length&&depth<12){const children=make('div','ic-replies');for(const reply of replies)children.append(threadNode(reply,depth+1));el.append(children);}
    return el;
  }
  function renderPanel(){
    panelThreads.replaceChildren();if(!active)return;
    const parent=active.parent&&records.get(active.parent);
    const currentBlock=A.resolve(idx,active.anchor)?.block||active.block;
    const roots=[...records.values()].filter(r=>!r.parent_id&&(parent?r.comment_id===parent.root_id:active.anchor.anchor_type==='document'?false:r.anchor.paragraph_id===active.anchor.paragraph_id||(currentBlock&&A.resolve(idx,r.anchor)?.block===currentBlock)));
    for(const record of roots)panelThreads.append(threadNode(record));
  }
  function render(){
    if(dirty)rebuild();list.replaceChildren();
    for(const r of records.values())if(!r.parent_id)list.append(threadNode(r));
    renderPanel();markerLayer.replaceChildren();markers=[];
    const groups=new Map(),ranges=[];
    for(const r of records.values()) {
      if(r.parent_id)continue;const target=A.resolve(idx,r.anchor);if(!target)continue;
      if(target.range)ranges.push(target.range);
      const id=target.block.dataset.icParagraph;
      if(!groups.has(id))groups.set(id,{target,records:[]});groups.get(id).records.push(r);
    }
    for(const group of groups.values()) {
      const marker=button(String(group.records.length),()=>{const record=group.records[0];openSnapshot({anchor:record.anchor,range:group.target.range,block:group.target.block},null,marker);},'ic-marker');
      marker.prepend(icon());marker.setAttribute('aria-label',`${group.records.length} comment threads on this passage`);markerLayer.append(marker);markers.push({el:marker,target:group.target});
    }
    if(window.CSS?.highlights&&window.Highlight)CSS.highlights.set('academic-comments',new Highlight(...ranges));
    schedulePosition();
  }
  function clearActiveHighlight(){CSS.highlights?.delete('academic-comment-active');article.querySelectorAll('.ic-anchor-fallback').forEach(el=>el.classList.remove('ic-anchor-fallback'));}
  function highlightActive(){clearActiveHighlight();if(!active)return;const located=A.resolve(idx,active.anchor);if(!located)return;if(CSS.highlights&&window.Highlight&&located.range)CSS.highlights.set('academic-comment-active',new Highlight(located.range));else located.block.classList.add('ic-anchor-fallback');}
  function jumpTo(record) {
    const target=A.resolve(idx,record.anchor);if(!target)return;
    target.block.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    clearActiveHighlight();if(CSS.highlights&&window.Highlight&&target.range)CSS.highlights.set('academic-comment-active',new Highlight(target.range));else target.block.classList.add('ic-anchor-fallback');
  }
  function schedulePosition(){if(!raf)raf=requestAnimationFrame(position);}
  function position(){
    raf=0;if(dirty){rebuild();render();return;}
    for(const m of markers){const r=m.target.block.getBoundingClientRect();m.el.style.left=Math.min(r.right+6,innerWidth-42)+'px';m.el.style.top=r.top+scrollY+'px';}
    if(!hoverButton.hidden)positionHover();
    if(!selectionButton.hidden&&snapshot)placeGutterIcon(selectionButton,endpoint(snapshot.focusRange||snapshot.range));
    if(panel.hidden||innerWidth<768)return;
    const sheet=article.closest('.reading-sheet').getBoundingClientRect(),headBottom=$('.site-header')?.getBoundingClientRect().bottom||80;
    const width=Math.min(innerWidth<1200?300:332,innerWidth-sheet.right-24),topMin=Math.max(12,headBottom+12);
    panel.style.width=Math.max(280,width)+'px';panel.style.left=Math.min(innerWidth-panel.offsetWidth-12,sheet.right+18)+'px';
    panel.style.maxHeight=Math.max(150,innerHeight-topMin-16)+'px';
    const target=(active?.range?.startContainer?.isConnected&&endpoint(active.range))||active?.block?.getBoundingClientRect();
    const desired=target?.top||topMin;panel.style.top=Math.max(topMin,Math.min(desired,innerHeight-Math.min(panel.scrollHeight,innerHeight-topMin-16)-16))+'px';
  }
  addEventListener('scroll',schedulePosition,{passive:true});addEventListener('resize',schedulePosition,{passive:true});
  new ResizeObserver(schedulePosition).observe(article);
  // MathJax may replace formula DOM after initial load; rebuild selectors safely.
  new MutationObserver(mutations=>{if(mutations.some(m=>m.type==='childList'||m.type==='characterData')){dirty=true;schedulePosition();}}).observe(article,{subtree:true,childList:true,characterData:true});
  new MutationObserver(schedulePosition).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','data-sidebar','data-focus','style']});
  initialize();
})();
