self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('ch-obras-cache-v1').then(function(cache) {
      return cache.addAll([
        'index.html',
        'manifest.json',
        'service-worker.js',
        'logotipo novo atual.jpg',
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
