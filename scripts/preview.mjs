import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve('build/client');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain','.data':'text/x-script'};
createServer((request,response) => {
 try {
  const url = new URL(request.url, 'http://127.0.0.1');
  let file = resolve(root, '.' + decodeURIComponent(url.pathname));
  if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) {
   if (!url.pathname.endsWith('/')) { response.writeHead(301,{Location:url.pathname+'/'+url.search}); response.end(); return; }
   file=resolve(file,'index.html');
  }
  const found=existsSync(file) && statSync(file).isFile();
  if (!found) file=resolve(root,'404.html');
  response.writeHead(found?200:404,{'Content-Type':types[extname(file)]??'application/octet-stream'});
  response.end(readFileSync(file));
 } catch { response.writeHead(400);response.end('Invalid request'); }
}).listen(4173,'127.0.0.1',()=>console.log('Static Pages preview: http://127.0.0.1:4173'));
