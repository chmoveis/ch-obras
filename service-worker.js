self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('ch-obras-cache-v49').then(function(cache) {
      const arquivosEssenciais = [
        'index.html',
        'manifest.json',
        'service-worker.js'
      ];

      const arquivosOpcionais = [
        'logotipo novo atual.jpg',
        'icone-ch-obras.png'
      ];

      return cache.addAll(arquivosEssenciais).then(function() {
        return Promise.all(
          arquivosOpcionais.map(function(arquivo) {
            return cache.add(arquivo).catch(function() {
              return null;
            });
          })
        );
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(nomesCaches) {
      return Promise.all(
        nomesCaches
          .filter(function(nomeCache) {
            return nomeCache.startsWith('ch-obras-cache-') && nomeCache !== 'ch-obras-cache-v49';
          })
          .map(function(nomeCache) {
            return caches.delete(nomeCache);
          })
      );
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
