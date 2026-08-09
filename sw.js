const CACHE_VERSION = 'v1';
const CACHE_NAME = 'iconic-abdallah-portfolio-' + CACHE_VERSION;

// Core files needed for the app shell to work offline.
// Keep this list to files that are guaranteed to exist at deploy time.
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './assets/logo-icon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  "./WhatsApp Image 2026-04-14 at 11.38.59 PM.jpeg",
  './Screenshot (151).png',
  './Screenshot (245).png',
  './Screenshot (260).png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name.startsWith('iconic-abdallah-portfolio-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Strategy:
// - Navigations (HTML): network-first, falling back to cache, so visitors get fresh content when online
//   but the site still opens offline.
// - Everything else (images, css, fonts, icons): cache-first, falling back to network, then caching the result.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Don't cache live third-party data (GitHub stats/contribution graph, form submissions) —
  // let these always hit the network so the numbers stay current.
  const url = new URL(req.url);
  if (url.hostname === 'api.github.com' || url.hostname === 'github-contributions-api.jogruber.de' || url.hostname === 'formspree.io') {
    return;
  }

  const isNavigation = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (isNavigation) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type !== 'opaque') {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
