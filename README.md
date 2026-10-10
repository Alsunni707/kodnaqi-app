# KodNaqi PWA

تطبيق إدارة معمل طبي تشخيصي — PWA يعمل بدون إنترنت.

## الميزات
- إدارة المرضى والتقارير
- نسخ احتياطي محلي وسحابي (Google Drive)
- تشفير AES-256-GCM للنسخ الاحتياطية
- عمل بدون إنترنت عبر Service Worker

## التقنيات
- HTML + Bootstrap 5 (RTL)
- Vanilla JavaScript
- Web Crypto API
- Service Worker (kodnaqi-v42)

## الملفات الرئيسية
- `index.html` — الواجهة
- `app.js` — منطق التطبيق
- `cloud.js` — التكامل مع Google Drive
- `encryption.js` — التشفير AES-256
- `sw.js` — Service Worker للعمل offline

## الصيانة
- عند تعديل أي `.js` أو `.css`: ارفع `CACHE_NAME` في `sw.js`
- ملفات `.bak` لا تُرفع (مُتجاهَلة في `.gitignore`)
