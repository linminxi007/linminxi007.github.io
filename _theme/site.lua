-- Courtyard: dependency-free note catalog and template metadata.
-- Uses Pandoc's Markdown/YAML parser, not a regular-expression YAML parser.
-- Compatible with Quarto's bundled Pandoc; also testable with standalone Pandoc.
local stringify = pandoc.utils.stringify
local function esc(s)
  return tostring(s or ''):gsub('&','&amp;'):gsub('<','&lt;'):gsub('>','&gt;'):gsub('"','&quot;'):gsub("'",'&#39;')
end
local function norm(s)
  s = s:gsub('\\','/')
  local drive = s:match('^%a:') or ''
  local absolute = s:sub(1,1)=='/'
  local parts = {}
  for p in s:gmatch('[^/]+') do
    if p=='..' then if #parts>0 and parts[#parts]~='..' then table.remove(parts) else parts[#parts+1]=p end
    elseif p~='.' and p~=drive then parts[#parts+1]=p end
  end
  return drive .. (absolute and '/' or (drive~='' and '/' or '')) .. table.concat(parts,'/')
end
local function dirname(p) return p:match('^(.*)/[^/]+$') or '.' end
local function read(p)
  local f=io.open(p,'rb'); if not f then return nil end
  local s=f:read('*a'); f:close(); return s
end
local function isdir(p) local ok=pcall(pandoc.system.list_directory,p); return ok end
local function scan(base, rel, out, seen)
  seen=seen or {}; if seen[rel] then return end; seen[rel]=true
  local ok, entries=pcall(pandoc.system.list_directory,base..'/'..rel)
  if not ok then return end
  table.sort(entries)
  for _,name in ipairs(entries) do
    if name:sub(1,1)~='.' and name:sub(1,1)~='_' then
      local p=rel..'/'..name
      if isdir(base..'/'..p) then scan(base,p,out,seen) else out[#out+1]=p end
    end
  end
end
local function text(m,key,default)
  return m[key] and stringify(m[key]) or default or ''
end
local function jsonstr(s)
  return '"'..tostring(s or ''):gsub('\\','\\\\'):gsub('"','\\"'):gsub('\n','\\n'):gsub('\r','\\r'):gsub('\t','\\t'):gsub('[%z\1-\8\11\12\14-\31]', function(c) return string.format('\\u%04x',string.byte(c)) end):gsub('<','\\u003c'):gsub('>','\\u003e'):gsub('&','\\u0026')..'"'
end
local function jsonlist(xs)
  local t={};for _,s in ipairs(xs) do t[#t+1]=jsonstr(s) end;return '['..table.concat(t,',')..']'
end
local function htmlpath(p) return (p:gsub('%.qmd$','.html'):gsub('%.md$','.html')) end
local function is_source(p) return p:match('%.md$') or p:match('%.qmd$') end
local function resolve(source,target)
  if target:match('^[%a][%w+.-]*:') or target:sub(1,2)=='//' or target:sub(1,1)=='#' then return nil end
  target=target:gsub('[?#].*$',''):gsub('%%(%x%x)',function(h) return string.char(tonumber(h,16)) end)
  local p=target:sub(1,1)=='/' and target:sub(2) or dirname(source)..'/'..target
  p=norm(p)
  if p:sub(1,3)=='../' then return nil end
  if p:sub(1,6)=='notes/' then p=htmlpath(p) end
  return p
end
local function raw(s) return pandoc.MetaBlocks({pandoc.RawBlock('html',s)}) end

function Pandoc(doc)
  if not FORMAT:match('html') then return doc end
  local cwd=norm(pandoc.system.get_working_directory())
  local root=(quarto and quarto.project and quarto.project.directory) or cwd
  root=norm(root)
  while not read(root..'/_quarto.yml') and dirname(root)~=root and root~='.' do root=dirname(root) end
  if not read(root..'/_quarto.yml') then error('Courtyard: open the directory containing _quarto.yml before rendering.') end
  local input=(quarto and quarto.doc and quarto.doc.input_file) or PANDOC_STATE.input_files[1]
  input=norm(input)
  if not input:match('^/') and not input:match('^%a:/') then input=norm(cwd..'/'..input) end
  local rel=input:sub(1,#root+1)==root..'/' and input:sub(#root+2) or input:match('[^/]+$')
  local depth=select(2,rel:gsub('/',''))
  local prefix=depth>0 and string.rep('../',depth) or './'
  local current=htmlpath(rel)
  local is_note=rel:sub(1,6)=='notes/' and rel~='notes/index.qmd' and rel~='notes/index.md'
  local note_files, attached={},{}
  scan(root,'notes',note_files)
  scan(root,'files',attached)
  local notes, category_set, paths={},{},{}
  for _,path in ipairs(note_files) do
    if is_source(path) and path~='notes/index.qmd' and path~='notes/index.md' then
      local content=read(root..'/'..path)
      local ok,parsed=pcall(pandoc.read,content,'markdown')
      if not ok then error('Courtyard: invalid Markdown/YAML in '..path..'\n'..tostring(parsed)) end
      if text(parsed.meta,'draft')~='true' then
        local title=text(parsed.meta,'title',path:match('([^/]+)%.[^.]+$'))
        if paths[htmlpath(path)] then error('Courtyard: duplicate output name: '..path..'. Do not keep both a.md and a.qmd.') end
        paths[htmlpath(path)]=true
        local cats={}
        if parsed.meta.categories then
          if pandoc.utils.type(parsed.meta.categories)=='List' then
            for _,c in ipairs(parsed.meta.categories) do cats[#cats+1]=stringify(c) end
          else cats[1]=stringify(parsed.meta.categories) end
        end
        if #cats==0 then cats[1]='未分类' end
        for _,c in ipairs(cats) do category_set[c]=true end
        local links,seen={},{}
        local function add(t)
          local p=resolve(path,t)
          if p and not seen[p] then links[#links+1]=p;seen[p]=true end
        end
        parsed:walk({Link=function(el) add(el.target) end,Image=function(el) add(el.src) end})
        local d=text(parsed.meta,'date')
        notes[#notes+1]={source=path,path=htmlpath(path),title=title,date=d,description=text(parsed.meta,'description'),categories=cats,links=links,text=stringify(parsed.blocks),demo=text(parsed.meta,'demo')=='true',lang=text(parsed.meta,'lang','zh-CN'):match('^en') and 'en' or 'zh',group=text(parsed.meta,'translation-key',path:gsub('%.en%.','.') :gsub('%.[^.]+$','')),status=text(parsed.meta,'status','working'),featured=text(parsed.meta,'featured')=='true'}
      end
    end
  end
  table.sort(notes,function(a,b) if a.featured~=b.featured then return a.featured end if a.date==b.date then return a.path<b.path end return a.date>b.date end)
  local category_names={};for c in pairs(category_set) do category_names[#category_names+1]=c end;table.sort(category_names)
  local cats_html={}
  for _,c in ipairs(category_names) do cats_html[#cats_html+1]='<a href="'..prefix..'notes/index.html?category='..esc(c)..'">'..esc(c)..'</a>' end
  doc.meta['site-categories']=raw(table.concat(cats_html,'\n'))
  doc.meta['site-prefix']=pandoc.MetaString(prefix)
  doc.meta['site-path']=pandoc.MetaString(current)
  doc.meta['site-class']=pandoc.MetaString(is_note and 'reading-page' or (rel=='index.qmd' and 'home-page' or 'index-page'))
  doc.meta['site-note']=pandoc.MetaBool(is_note)
  doc.meta['site-home']=pandoc.MetaBool(rel=='index.qmd')
  doc.meta['site-file-viewer']=pandoc.MetaBool(rel=='viewer.qmd')
  doc.meta['site-count']=pandoc.MetaString(tostring(#notes))
  doc.meta['site-lang']=pandoc.MetaString(text(doc.meta,'lang','zh-CN'))
  doc.meta['site-status']=pandoc.MetaString(text(doc.meta,'status','working'))
  local status_labels={working='持续修订',reviewed='已核对',archived='已归档'}
  doc.meta['site-status-label']=pandoc.MetaString(status_labels[text(doc.meta,'status','working')] or text(doc.meta,'status','working'))
  if is_note and not doc.meta.title then doc.meta.title=pandoc.MetaString(rel:match('([^/]+)%.[^.]+$')) end
  local groups={}
  for _,n in ipairs(notes) do
    local unique=n.group..':'..n.lang
    if groups[unique] then error('Reading Room: duplicate translation-key for one language: '..unique) end
    groups[unique]=true
  end
  local data={}
  for _,n in ipairs(notes) do
    data[#data+1]='{"path":'..jsonstr(n.path)..',"source":'..jsonstr(n.source)..',"title":'..jsonstr(n.title)..',"date":'..jsonstr(n.date)..',"description":'..jsonstr(n.description)..',"text":'..jsonstr(n.text)..',"categories":'..jsonlist(n.categories)..',"links":'..jsonlist(n.links)..',"lang":'..jsonstr(n.lang)..',"group":'..jsonstr(n.group)..',"status":'..jsonstr(n.status)..',"demo":'..tostring(n.demo)..',"featured":'..tostring(n.featured)..'}'
  end
  local filedata={}
  for _,p in ipairs(attached) do filedata[#filedata+1]='{"path":'..jsonstr(p)..',"name":'..jsonstr(p:match('[^/]+$'))..'}' end
  doc.meta['site-data']=raw('<script id="site-catalog" type="application/json">{"notes":['..table.concat(data,',')..'],"files":['..table.concat(filedata,',')..']}</script>')
  local function listing(limit)
    local t={'<div class="note-list" role="list" data-limit="'..(limit or 0)..'">'}
    local seen,visible={},0
    for _,n in ipairs(notes) do
      local preferred=n.lang=='zh' or not groups[n.group..':zh']
      local show=preferred and not seen[n.group] and (not limit or visible<limit)
      if preferred then seen[n.group]=true end
      if show then visible=visible+1 end
      t[#t+1]='<article class="note-row" role="listitem" data-path="'..esc(n.path)..'" data-group="'..esc(n.group)..'" data-note-lang="'..n.lang..'" data-category="'..esc(table.concat(n.categories,'|'))..'"'..(show and '' or ' hidden')..'>'
      t[#t+1]='<span class="note-number">'..string.format('%02d',visible)..'</span><div class="note-summary"><div class="note-kicker"><span class="category-label">'..esc(table.concat(n.categories,' / '))..'</span><span class="sample-label">'..(n.demo and '演示' or '')..'</span></div>'
      t[#t+1]='<h3><a href="'..prefix..esc(n.path)..'">'..esc(n.title)..'</a></h3><p>'..esc(n.description)..'</p></div><div class="note-side"><time>'..esc(n.date)..'</time><a class="note-open button-jump" href="'..prefix..esc(n.path)..'" aria-label="打开 '..esc(n.title)..'"><span aria-hidden="true">↗</span></a></div></article>'
    end
    if #notes==0 then t[#t+1]='<p class="empty-state">还没有公开笔记。No public notes yet.</p>' end
    t[#t+1]='</div>';return table.concat(t,'\n')
  end
  doc=doc:walk({
    Div=function(el)
      if el.identifier=='latest-notes' then return pandoc.RawBlock('html',listing(3)) end
      if el.identifier=='all-notes' then return pandoc.RawBlock('html',listing(nil)..'<p id="filter-empty" class="empty-state" hidden>这个分类还没有笔记。</p>') end
      if el.identifier=='file-library' then
        local t={'<div class="file-grid">'}
        for _,p in ipairs(attached) do
          local ext=(p:match('%.([^./]+)$') or 'file'):upper()
          t[#t+1]='<a class="file-card" href="'..prefix..esc(p)..'"><span class="file-badge">'..esc(ext)..'</span><h3>'..esc(p:match('[^/]+$'))..'</h3><p>'..esc(p)..'</p><span class="file-card-action">在阅读器中打开 <span aria-hidden="true">↗</span></span></a>'
        end
        t[#t+1]='</div>';return pandoc.RawBlock('html',table.concat(t,'\n'))
      end
    end,
    Link=function(el)
      -- Standard Markdown links remain portable. Convert only existing note sources.
      local target=el.target
      if not target:match('^[%a][%w+.-]*:') and target:sub(1,2)~='//' then
        local resolved=resolve(rel,target)
        if resolved and paths[resolved] then
          el.target=target:gsub('%.qmd([?#])','.html%1'):gsub('%.md([?#])','.html%1'):gsub('%.qmd$','.html'):gsub('%.md$','.html')
        end
      end
      return el
    end
  })
  return doc
end
