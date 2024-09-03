self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache-v1').then(async (cache) => {
      // Fetch the manifest file
      const manifest = await fetch('/.vite/manifest.json').then((res) => res.json());

      // Extract the URLs from the manifest
      const urlsToCache = Object.values(manifest).map((entry) => entry.file);

      // Add the root and index.html to the cache
      urlsToCache.push('/');
      urlsToCache.push('/index.html');

      // Cache the files
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
