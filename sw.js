/*!
 * KodNaqi PWA — نظام إدارة المعامل الطبية التشخيصية
 * Copyright © 2026 Alsunni Khalid Mohammed Ahmed Alsunni
 * All Rights Reserved. جميع الحقوق محفوظة.
 *
 * هذا الكود ملكية فكرية خاصة.
 * يُحظر نسخه أو توزيعه أو تعديله أو إعادة استخدامه
 * بأي شكل دون إذن كتابي مسبق من المالك.
 *
 * Contact: kodnaqi@gmail.com
 */

// KodNaqi — Service Worker v26
const CACHE_NAME = 'kodnaqi-v44';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './stamp.png',
  './lib/bootstrap.rtl.min.css',
  './lib/bootstrap-icons.css',
  './lib/cairo.css',
  './lib/cairo-400.woff2',
  './lib/cairo-600.woff2',
  './lib/cairo-700.woff2',
  './lib/cairo-800.woff2',
  './lib/fonts/bootstrap-icons.woff2',
  './lib/fonts/bootstrap-icons.woff',
  './signatures/tech.png',
  './signatures/doctor.png',
  './encryption.js',
];

self.addEventListener('install', e => {
  console.log('📦 SW v28 install');
  e.waitUntil(
    caches.open(CACHE_NAME).then(c =>
      Promise.all(ASSETS.map(u => c.add(u).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('🔄 SW v28 activate');
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  if (url.origin !== location.origin) return;
  if (e.request.method !== 'GET') return;

  // 🔑 ملفات الكود → الشبكة أولاً (تحصل على آخر نسخة)
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.json')) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // الصفحات
  if (e.request.mode === 'navigate') {
    const isRoot = url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
    
    // الجذر (index.html) → Cache First
    if (isRoot) {
      e.respondWith(
        caches.match('./index.html').then(cached => {
          const fetchPromise = fetch(e.request).then(res => {
            if (res.ok) {
              const clone = res.clone();
              caches.open(CACHE_NAME).then(c => c.put('./index.html', clone));
            }
            return res;
          }).catch(() => cached);
          return cached || fetchPromise;
        })
      );
      return;
    }
    
    // صفحات أخرى (guide.html, contract.html...) → Network First
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // باقي (صور، خطوط)
  e.respondWith(
    caches.match(e.request).then(c => c || fetch(e.request).then(res => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      }
      return res;
    }))
  );
});
