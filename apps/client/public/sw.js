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

self.addEventListener("fetch", (event) => {});
