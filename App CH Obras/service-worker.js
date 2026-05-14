self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('ch-obras-cache').then(function(cache) {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'logotipo novo atual.jpeg',
        'icone-ch-obras.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});