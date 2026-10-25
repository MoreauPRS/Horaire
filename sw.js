// Service worker minimal : requis pour l'installation. Rien n'est gardé en cache (les données viennent toujours en direct).
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{});
