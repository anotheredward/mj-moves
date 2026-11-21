// Offline support: keeps a copy of the app so it opens without a
// connection. The page is fetched fresh whenever you're online (so
// updates arrive straight away) and the saved copy is used when you're
// not. The graph library's file name carries its version, so it can be
// served from the saved copy every time.
"use strict";

const CACHE = "mj-moves-v1";
const FILES = ["./", "./vendor/cytoscape-3.35.0.min.js"];

self.addEventListener("install", event=>{
    event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate", event=>{
    event.waitUntil(caches.keys()
        .then(keys=>Promise.all(keys.filter(k=>k.startsWith("mj-moves-") && k !== CACHE).map(k=>caches.delete(k))))
        .then(()=>self.clients.claim()));
});

self.addEventListener("fetch", event=>{
    const req = event.request;
    const url = new URL(req.url);
    if(req.method !== "GET" || url.origin !== location.origin) return;   // videos, embeds: the network as usual

    if(req.mode === "navigate"){
        // the page: fresh when online, the saved copy when not (whatever
        // combination is in the link: ?moves=... is read by the page itself)
        // On a weak signal, use the saved copy after 3 seconds.
        const fresh = fetch(req).then(res=>{
            if(res.ok){
                const copy = res.clone();
                caches.open(CACHE).then(cache=>cache.put("./", copy));
            }
            return res;
        });
        const saved = caches.match("./");
        const slow = new Promise(resolve=>setTimeout(resolve, 3000)).then(()=>saved.then(hit=>hit || fresh));
        event.respondWith(Promise.race([fresh, slow])
            .catch(()=>saved.then(hit=>hit || Response.error())));
        return;
    }
    event.respondWith(caches.match(req, {ignoreSearch:true}).then(hit=>hit || fetch(req).then(res=>{
        if(res.ok && url.pathname.includes("/vendor/")){
            const copy = res.clone();
            caches.open(CACHE).then(cache=>cache.put(req, copy));
        }
        return res;
    })));
});
