import { ServiceError } from './store.mjs';
export const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
function check(ok, message) { if (!ok) throw new ServiceError(400, message); }
function string(value, max, field, min = 0) {
  check(typeof value === 'string' && value.length >= min && value.length <= max && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value), 'Invalid ' + field + '.');
  return value;
}
export function pagePath(value) {
  string(value, 1000, 'page path', 1);
  let decoded; try { decoded = decodeURIComponent(value); } catch { check(false, 'Invalid page path.'); }
  check(/^\/notes\/.+\.html$/.test(decoded) && !/[?#\\\u0000-\u001f]/.test(decoded) && !decoded.split('/').some(x=>x==='.'||x==='..') && !/\/index\.html$/.test(decoded), 'Only research note pages accept comments.');
  return decoded;
}
export const documentAnchor = () => ({anchor_type:'document',section_id:'',paragraph_id:'',exact:'',prefix:'',suffix:'',start_offset:0,end_offset:0});
export function validate(input) {
  check(input && typeof input === 'object' && !Array.isArray(input), 'Invalid submission.');
  const page_path = pagePath(input.page_path);
  check(uuid.test(input.request_id || ''), 'Invalid submission ID.');
  check(!input.parent_id || uuid.test(input.parent_id), 'Invalid reply ID.');
  const content = string(input.content,5000,'comment',1).trim(); check(content.length > 0,'Comment is empty.');
  const nickname = string(input.nickname ?? '',60,'nickname').trim() || 'Anonymous';
  const a = input.anchor;
  check(a && ['text','paragraph','document'].includes(a.anchor_type),'Invalid anchor type.');
  const anchor = a.anchor_type === 'document' ? documentAnchor() : {
    anchor_type:a.anchor_type,
    section_id:string(a.section_id,300,'section ID'),
    paragraph_id:string(a.paragraph_id,300,'paragraph ID',1),
    exact:string(a.exact,8000,'quotation',1),
    prefix:string(a.prefix,64,'prefix'),suffix:string(a.suffix,64,'suffix'),
    start_offset:a.start_offset,end_offset:a.end_offset
  };
  if (a.anchor_type !== 'document') {
    check(anchor.exact.trim().length > 0,'Quotation is empty.');
    check(Number.isInteger(anchor.start_offset) && Number.isInteger(anchor.end_offset) && anchor.start_offset>=0 && anchor.end_offset<=20000000 && anchor.end_offset>anchor.start_offset && anchor.end_offset-anchor.start_offset===anchor.exact.length, 'Invalid anchor offsets.');
  }
  return {page_path,request_id:input.request_id,parent_id:input.parent_id||null,content,nickname,anchor};
}
