// Separate administrator CLI; no admin credentials enter the website.
const [command,arg,state]=process.argv.slice(2),base=process.env.COMMENT_API_URL,token=process.env.ADMIN_TOKEN;
if(!base||!token)throw new Error('Set COMMENT_API_URL and ADMIN_TOKEN in this terminal.');
if(!['list','set'].includes(command))throw new Error('Usage: npm run moderate -- list [pending|approved|rejected] OR set COMMENT_ID approved|rejected|pending');
const url=new URL(command==='list'?'/admin/v1/comments':'/admin/v1/comments/'+encodeURIComponent(arg),base);
if(command==='list')url.searchParams.set('status',arg||'pending');
const response=await fetch(url,{method:command==='list'?'GET':'PATCH',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},...(command==='set'?{body:JSON.stringify({status:state})}:{})});
const result=await response.json();console.log(JSON.stringify(result,null,2));if(!response.ok)process.exitCode=1;
