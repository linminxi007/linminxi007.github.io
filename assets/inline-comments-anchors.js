/* TextQuoteSelector + verified TextPositionSelector. Never wrap article text. */
(() => {
  'use strict';
  const ignored = 'script,style,math,.math,mjx-container,.MathJax,pre,code,input,textarea,button,[contenteditable],.anchorjs-link,.heading-anchor,[aria-hidden="true"]';
  const normalize = text => text.replace(/\s+/gu,' ').trim();
  const hash = text => {let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(36);};
  const documentAnchor = () => ({anchor_type:'document',section_id:'',paragraph_id:'',exact:'',prefix:'',suffix:'',start_offset:0,end_offset:0});
  function index(article) {
    const walker=article.ownerDocument.createTreeWalker(article,NodeFilter.SHOW_TEXT),points=[];
    let node,text='';
    while((node=walker.nextNode())) {
      if(node.parentElement.closest(ignored))continue;
      for(let offset=0;offset<node.length;offset++) {
        const char=node.data[offset],space=/\s/u.test(char);
        if(space && (!text.length || text.endsWith(' ')))continue;
        text+=space?' ':char;points.push({node,offset});
      }
    }
    if(text.endsWith(' ')){text=text.slice(0,-1);points.pop();}
    const blocks=[],duplicates=new Map();
    const elements=[...article.querySelectorAll('p,li,h1,h2,h3,h4,h5,h6,.math.display')].filter(el=>!el.closest('pre,code') && !(el.tagName==='LI'&&el.querySelector('p,li')) && !(el.matches('.math.display')&&el.closest('p')));
    for(const el of elements) {
      const start=points.findIndex(p=>el.contains(p.node));let end=start;
      if(start>=0) {while(end<points.length&&el.contains(points[end].node))end++;}
      const math=el.matches('.math.display');
      const value=math ? normalize(el.dataset.icMathSource ||= el.querySelector('annotation[encoding="application/x-tex"]')?.textContent || el.textContent) : start<0?'':text.slice(start,end).trimEnd();
      if(!value)continue;
      const section=el.closest('section[id]')?.id||'article';
      const base=el.id||section+':'+(math?'math:':'p:')+hash(value);
      const duplicate=duplicates.get(base)||0;duplicates.set(base,duplicate+1);
      const id=base+':'+duplicate;
      el.dataset.icParagraph=id;
      blocks.push({el,id,base,duplicate,section,text:value,start:math?0:start,end:math?value.length:start+value.length,math});
    }
    for(const block of blocks){block.total=duplicates.get(block.base);block.id=block.id+':of'+block.total;block.el.dataset.icParagraph=block.id;}
    return {article,text,points,blocks};
  }
  function rangeAt(idx,start,end) {
    const a=idx.points[start],b=idx.points[end-1];if(!a||!b||end<=start)return null;
    const range=idx.article.ownerDocument.createRange();range.setStart(a.node,a.offset);range.setEnd(b.node,b.offset+1);return range;
  }
  function paragraph(idx,block) {
    const a={anchor_type:'paragraph',section_id:block.section,paragraph_id:block.id,exact:block.text,prefix:block.math?'':idx.text.slice(Math.max(0,block.start-64),block.start),suffix:block.math?'':idx.text.slice(block.end,block.end+64),start_offset:block.start,end_offset:block.end};
    const range=idx.article.ownerDocument.createRange();range.selectNodeContents(block.el);
    return {anchor:a,range,block:block.el};
  }
  function capture(idx,selection) {
    if(!selection?.rangeCount||selection.isCollapsed)return null;
    const range=selection.getRangeAt(0);
    if(!idx.article.contains(range.startContainer)||!idx.article.contains(range.endContainer)||!range.toString().trim())return null;
    const startEl=range.startContainer.nodeType===1?range.startContainer:range.startContainer.parentElement;
    const endEl=range.endContainer.nodeType===1?range.endContainer:range.endContainer.parentElement;
    if(startEl.closest('pre,code,input,textarea,[contenteditable],button')||endEl.closest('pre,code,input,textarea,[contenteditable],button'))return null;
    // Math and mixed selections use an intact block rather than character offsets in rendered formulas.
    const unsafe=range.cloneContents().querySelector('math,.math,mjx-container,pre,code');
    if(unsafe||startEl.closest('math,.math,mjx-container')) {
      const element=startEl.closest('p,.math.display,li');
      const block=idx.blocks.find(b=>b.el===element);
      return block ? paragraph(idx,block) : null;
    }
    let start=-1,end=-1;
    for(let i=0;i<idx.points.length;i++) {
      const p=idx.points[i];
      if(range.comparePoint(p.node,p.offset)!==0 || (p.node===range.endContainer&&p.offset>=range.endOffset))continue;
      if(start<0)start=i;end=i+1;
    }
    if(start<0)return null;
    while(start<end&&idx.text[start]===' ')start++;
    while(end>start&&idx.text[end-1]===' ')end--;
    if(start===end||end-start>8000)return null;
    const block=idx.blocks.find(b=>!b.math&&b.start<=start&&b.end>start);
    if(!block)return null;
    return {anchor:{anchor_type:'text',section_id:block.section,paragraph_id:block.id,exact:idx.text.slice(start,end),prefix:idx.text.slice(Math.max(0,start-64),start),suffix:idx.text.slice(end,end+64),start_offset:start,end_offset:end},range:range.cloneRange(),block:block.el};
  }
  function occurrences(text,quote,from=0,to=text.length) {
    const found=[];for(let n=text.indexOf(quote,from);n>=0&&n+quote.length<=to;n=text.indexOf(quote,n+1))found.push(n);return found;
  }
  function resolve(idx,a) {
    if(!a||a.anchor_type==='document')return null;
    const stable=idx.blocks.find(b=>b.id===a.paragraph_id&&b.section===a.section_id);
    if(stable?.math&&a.anchor_type==='paragraph'&&stable.text===a.exact)return {block:stable.el,range:null};
    const all=occurrences(idx.text,a.exact);
    if(!all.length)return null;
    const prefixMatches=n=>!a.prefix||idx.text.slice(Math.max(0,n-a.prefix.length),n)===a.prefix;
    const suffixMatches=n=>!a.suffix||idx.text.slice(n+a.exact.length,n+a.exact.length+a.suffix.length)===a.suffix;
    const contextScore=n=>(a.prefix&&prefixMatches(n)?1:0)+(a.suffix&&suffixMatches(n)?1:0);
    const inStable=stable&&!stable.math?all.filter(n=>n>=stable.start&&n+a.exact.length<=stable.end):[];
    let pos;
    if(inStable.length===1&&(stable.el.id||stable.total===1)&&(contextScore(inStable[0])>0||(!a.prefix&&!a.suffix)))pos=inStable[0];
    if(pos===undefined){
      // If a duplicated block disappeared or changed count, do not silently attach
      // to the surviving copy just because it has become the only quote match.
      const originallyDuplicated=/:of([2-9]|\d{2,})$/.test(a.paragraph_id);
      const candidates=all.filter(n=>prefixMatches(n)&&suffixMatches(n)&&(a.prefix||a.suffix));
      if(!originallyDuplicated&&candidates.length===1)pos=candidates[0];
    }
    // Offsets are never accepted unless the quote and disambiguating context still match.
    if(pos===undefined&&stable&&stable.total===1&&idx.text.slice(a.start_offset,a.end_offset)===a.exact&&prefixMatches(a.start_offset)&&suffixMatches(a.start_offset)&&all.length===1)pos=a.start_offset;
    if(pos===undefined)return null;
    const block=idx.blocks.find(b=>!b.math&&b.start<=pos&&b.end>pos);
    const range=rangeAt(idx,pos,pos+a.exact.length);
    return block&&range?{block:block.el,range}:null;
  }
  const api={index,capture,paragraph,resolve,rangeAt,normalize,documentAnchor};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else window.InlineCommentAnchors=api;
})();
