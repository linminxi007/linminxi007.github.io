(() => {
  'use strict';
  const form=document.querySelector('#manager-login');if(!form)return;
  const pin=document.querySelector('#manager-pin'),status=document.querySelector('#manager-status'),list=document.querySelector('#manager-list'),controls=document.querySelector('#manager-controls');
  let base='',token='',busy=false;
  const node=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
  async function api(path,options={}){
    if(!base){const config=await fetch(new URL('assets/inline-comments-config.json',new URL(document.body.dataset.root||'./',location.href)),{cache:'no-store'});const c=await config.json();if(!c.apiBase)throw new Error('Comment management is unavailable.');const url=new URL(c.apiBase);if(url.protocol!=='https:'&&!['localhost','127.0.0.1'].includes(url.hostname))throw new Error('Invalid service address.');base=url.href.replace(/\/$/,'');}
    const r=await fetch(base+path,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{}),...options.headers},credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(20000)});
    const result=await r.json();if(r.status===401&&token){lock();throw new Error('Session expired. Enter your PIN again.');}if(!r.ok)throw new Error(result.error||'Request failed.');return result;
  }
  function lock(){token='';list.replaceChildren();controls.hidden=true;form.hidden=false;pin.value='';}
  async function reload(){
    status.textContent='Loading…';let cursor='',records=[];
    do{const data=await api('/manager/v1/comments'+(cursor?'?cursor='+encodeURIComponent(cursor):''));records.push(...data.comments);cursor=data.next_cursor;}while(cursor);
    if(!token)return;list.replaceChildren();
    for(const r of records){
      const row=node('article');row.className='manager-row';row.dataset.commentId=r.comment_id;
      const body=node('div');body.append(node('strong',r.nickname||'Anonymous'),node('p',r.content));
      if(r.anchor.exact)body.append(node('blockquote','"'+r.anchor.exact+'"'));
      const link=node('a',r.page_path);link.href=new URL(r.page_path,location.origin).href;link.target='_blank';link.rel='noopener';body.append(link,node('p',r.status+' · '+new Date(r.created_at).toLocaleString()+(r.parent_id?' · Reply / 回复':'')),node('small',r.comment_id));
      const remove=node('button','×');remove.type='button';remove.className='manager-delete';remove.setAttribute('aria-label','Delete comment / 删除评论');
      remove.addEventListener('click',async()=>{if(busy)return;busy=true;remove.disabled=true;try{const data=await api('/manager/v1/comments/'+encodeURIComponent(r.comment_id),{method:'DELETE'});for(const id of data.deleted_ids)list.querySelector('[data-comment-id="'+id+'"]')?.remove();status.textContent='Deleted / 已删除 · '+data.deleted_ids.length;}catch(e){status.textContent=e.message;remove.disabled=false;}finally{busy=false;}});
      row.append(body,remove);list.append(row);
    }
    status.textContent=records.length+' comments / 条评论';
  }
  form.addEventListener('submit',async e=>{e.preventDefault();const button=form.querySelector('button');button.disabled=true;status.textContent='Verifying…';try{const data=await api('/manager/v1/session',{method:'POST',body:JSON.stringify({pin:pin.value})});pin.value='';token=data.token;form.hidden=true;controls.hidden=false;await reload();}catch(error){status.textContent=error.message;}finally{button.disabled=false;}});
  document.querySelector('#manager-reload').addEventListener('click',()=>{if(!busy)reload().catch(e=>status.textContent=e.message);});
  document.querySelector('#manager-logout').addEventListener('click',()=>{lock();status.textContent='Locked / 已锁定';});
})();
