const CACHE_NAME = "octadock-v1";
const API_CACHE_URLS = ["/graphql", "/auth/github"];

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installed");
  //   @ts-ignore
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activated");
  //   @ts-ignore
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (API_CACHE_URLS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone()); // Save for later
            return networkResponse;
          });
        });
      })
    );
  }
});
