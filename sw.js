// Service worker : requis pour l'installation, et garde en mémoire les pages de la même adresse (index.html, mesures.html, config.js, icônes)
// pour qu'elles s'ouvrent sans réseau. Réseau d'abord : on a toujours la dernière version quand la connexion existe.
// Les données (appels vers le script Google) ne passent jamais par ici : seules les requêtes GET de la même adresse sont gardées.
const CACHE = 'horaire-pages-v2';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(
    fetch(r).then(rep => {
      if (rep && rep.ok) { const copie = rep.clone(); caches.open(CACHE).then(c => c.put(r, copie)); }
      return rep;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || (r.mode === 'navigate' ? caches.match('index.html') : undefined)))
  );
});
