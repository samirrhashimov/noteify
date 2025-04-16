
const CACHE_NAME = 'notepad-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/login.css',
  '/reset.css',
  '/script.js',
  '/login.js',
  '/img/filter-list.png',
  '/img/mainlogo.png',
  '/img/man.png',
  '/img/pencil.png',
  '/img/search.png',
  '/img/trash.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      })
  );
});
