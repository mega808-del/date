/* ================================================================
 * 올인원 날짜 & 띠 계산기 — 서비스 워커 (PWA 오프라인 캐시)
 * GitHub Pages 하위 경로(/date/)와 file:// 더블클릭 모두 대응하도록
 * 앱 자체 경로는 상대 경로(./)로 지정합니다.
 * ================================================================ */
'use strict';

var CACHE_NAME = 'date-calc-v2';
var CDN_ORIGINS = ['https://cdn.tailwindcss.com', 'https://cdn.jsdelivr.net'];
/* 핵심 자산: 앱 자체 + CDN 라이브러리(스타일·아이콘·음력)를 함께 캐시 → 첫 방문 후 오프라인 동작 */
var CORE_ASSETS = [
  './', './index.html', './icon.svg',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/lucide@0.469.0/dist/umd/lucide.min.js',
  'https://cdn.jsdelivr.net/npm/lunar-javascript@1.7.1/lunar.js'
];

function cacheCore(cache) {
  // 일시적 CDN 오류 하나가 전체 설치를 막지 않도록 자산별로 캐시
  return Promise.all(CORE_ASSETS.map(function (url) {
    return cache.add(url).catch(function () {});
  }));
}

/* 설치: 핵심 자산을 미리 캐시 */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cacheCore)
      .then(function () { return self.skipWaiting(); })
  );
});

/* 활성화: 이전 버전 캐시 정리 */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys.filter(function (k) { return k !== CACHE_NAME; })
              .map(function (k) { return caches.delete(k); })
        );
      })
      .then(function () { return self.clients.claim(); })
  );
});

function isCacheable(urlStr) {
  if (urlStr.indexOf(self.location.origin) === 0) return true;
  return CDN_ORIGINS.some(function (origin) { return urlStr.indexOf(origin) === 0; });
}

/* 요청: 캐시 우선, 없으면 네트워크 → 성공 시 캐시에 저장 */
self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res.ok && isCacheable(req.url)) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        // 네트워크 실패 시: 화면(내비게이션)은 캐시된 index.html로 대체
        if (req.mode === 'navigate') {
          return caches.match('./index.html').then(function (fallback) {
            return fallback || Response.error();
          });
        }
        return Response.error();
      });
    })
  );
});
