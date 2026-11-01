/* Centinela 3D: permite instalar el juego como una app.
   Siempre intenta descargar la versión nueva; si no hay internet, usa la última guardada. */
const CACHE='centinela3d-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(k=>k.put(r,c))}return res}).catch(()=>caches.match(r)));
});
