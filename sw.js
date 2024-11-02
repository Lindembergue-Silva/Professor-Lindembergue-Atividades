// Nome do cache e arquivos a serem armazenados
const cacheName = 'app-cache-v1';
const resourcesToCache = [
    '/',
    'favicon.png',
    'manifest.json',
    'styles.css',
    'script.js'
];

// Instala o service worker e faz o cache dos recursos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(resourcesToCache))
    );
});

// Ativa o service worker e limpa caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== cacheName)
                .map(cache => caches.delete(cache))
            );
        })
    );
});

// Intercepta as requisições e responde com o cache ou faz o fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
