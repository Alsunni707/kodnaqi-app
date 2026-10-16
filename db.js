// ============================================================
// KodNaqi Standalone — قاعدة البيانات المحلية (IndexedDB)
// ============================================================
// تخزين كل البيانات داخل الهاتف — بدون سيرفر، بدون إنترنت

// ═══ تشفير البيانات الحساسة (AES-GCM) — مفتاح مشتق من الترخيص + الجهاز ═══
const ENCRYPTED_STORES = []; // التشفير متوقف مؤقتاً
const ENC_PREFIX = 'ENC:v1:';

async function getEncryptionKey() {
  // المفتاح يعتمد على: كود الجهاز + مفتاح الترخيص المخزن
  if (!window.KodNaqiSecurity || !window.KodNaqiSecurity.getDeviceCode) return null;
  const deviceCode = await window.KodNaqiSecurity.getDeviceCode();
  let licenseKey = '';
  try {
    const lic = localStorage.getItem('kodnaqi_license');
    if (lic) {
      const licData = JSON.parse(lic);
      licenseKey = licData.key || '';
    }
  } catch(e) {}
  if (!licenseKey) return null;
  // اشتقاق المفتاح من الجهاز + الترخيص
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(deviceCode + '|' + licenseKey),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('kodnaqi-secure-salt-v1'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
  return key;
}

async function encryptData(storeName, data) {
  if (ENCRYPTED_STORES.indexOf(storeName) === -1) return data;
  const key = await getEncryptionKey();
  if (!key) return data;

  const copy = Object.assign({}, data);
  const originalId = copy.id;
  delete copy.id;

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(copy));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);

  const out = {
    _encrypted: true,
    _iv: Array.from(iv),
    _data: Array.from(new Uint8Array(ciphertext))
  };
  if (originalId !== undefined && originalId !== null) out.id = originalId;
  return out;
}

async function decryptData(storeName, data) {
  if (ENCRYPTED_STORES.indexOf(storeName) === -1) return data;
  if (!data || !data._encrypted) return data;
  const key = await getEncryptionKey();
  if (!key) throw new Error('لا يوجد ترخيص صالح لفك التشفير');
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(data._iv) },
    key,
    new Uint8Array(data._data)
  );
  const obj = JSON.parse(new TextDecoder().decode(decrypted));
  if (data.id !== undefined) obj.id = data.id;
  return obj;
}

const DB_NAME = 'kodnaqi_standalone';
const DB_VERSION = 4;

let db = null;

// فتح/إنشاء قاعدة البيانات
function openDB() {
  if (db) return Promise.resolve(db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const database = e.target.result;

      // جدول المرضى
      if (!database.objectStoreNames.contains('patients')) {
        const s = database.createObjectStore('patients', { keyPath: 'id', autoIncrement: true });
        s.createIndex('name', 'name', { unique: false });
        s.createIndex('phone', 'phone', { unique: false });
        s.createIndex('serial', 'serial', { unique: true });
      }

      // جدول التحاليل
      if (!database.objectStoreNames.contains('tests')) {
        const s = database.createObjectStore('tests', { keyPath: 'id', autoIncrement: true });
        s.createIndex('name', 'name', { unique: true });
      }

      // معايير التحاليل
      if (!database.objectStoreNames.contains('parameters')) {
        const s = database.createObjectStore('parameters', { keyPath: 'id', autoIncrement: true });
        s.createIndex('test_id', 'test_id', { unique: false });
      }

      // الزيارات
      if (!database.objectStoreNames.contains('visits')) {
        const s = database.createObjectStore('visits', { keyPath: 'id', autoIncrement: true });
        s.createIndex('patient_id', 'patient_id', { unique: false });
        s.createIndex('serial', 'serial', { unique: false });
        s.createIndex('date', 'date', { unique: false });
      }

      // تحاليل الزيارات
      if (!database.objectStoreNames.contains('visit_tests')) {
        const s = database.createObjectStore('visit_tests', { keyPath: 'id', autoIncrement: true });
        s.createIndex('visit_id', 'visit_id', { unique: false });
        s.createIndex('test_id', 'test_id', { unique: false });
      }

      // نتائج الزيارات
      if (!database.objectStoreNames.contains('results')) {
        const s = database.createObjectStore('results', { keyPath: 'id', autoIncrement: true });
        s.createIndex('visit_id', 'visit_id', { unique: false });
        s.createIndex('param_id', 'param_id', { unique: false });
      }

      // المصروفات
      if (!database.objectStoreNames.contains('expenses')) {
        const s = database.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
        s.createIndex('date', 'date', { unique: false });
      }

      // المخازن
      if (!database.objectStoreNames.contains('inventory')) {
        database.createObjectStore('inventory', { keyPath: 'id', autoIncrement: true });
      }

      // عداد الأرقام التسلسلية
      if (!database.objectStoreNames.contains('counters')) {
        database.createObjectStore('counters', { keyPath: 'name' });
      }

      // المستخدمون
      if (!database.objectStoreNames.contains('users_store')) {
        const s = database.createObjectStore('users_store', { keyPath: 'username' });
      }

      // الإشعارات
      if (!database.objectStoreNames.contains('notifications')) {
        const s = database.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
        s.createIndex('visit_id', 'visit_id', { unique: false });
        s.createIndex('patient_id', 'patient_id', { unique: false });
        s.createIndex('sent_at', 'sent_at', { unique: false });
      }

      // سجل العمليات
      if (!database.objectStoreNames.contains('activity')) {
        const s = database.createObjectStore('activity', { keyPath: 'id', autoIncrement: true });
        s.createIndex('date', 'date', { unique: false });
      }
    };

    req.onsuccess = (e) => {
      db = e.target.result;
      db.onversionchange = () => { db.close(); db = null; };
      console.log('✅ قاعدة البيانات جاهزة');
      resolve(db);
    };

    req.onerror = (e) => {
      console.error('❌ فشل فتح قاعدة البيانات:', e);
      reject(e);
    };
  });
}

// ============ عمليات عامة ============
function cleanId(obj) {
  if (obj && typeof obj === 'object' && 'id' in obj && (obj.id === undefined || obj.id === null || obj.id === '')) {
    delete obj.id;
  }
  return obj;
}

function dbAdd(store, data) {
  return openDB().then(async db => {
    const finalData = cleanId(await encryptData(store, Object.assign({}, data)));
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).add(finalData);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      tx.onabort = () => reject(tx.error);
    });
  });
}

function dbPut(store, data) {
  return openDB().then(async db => {
    const finalData = cleanId(await encryptData(store, Object.assign({}, data)));
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(finalData);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      tx.onabort = () => reject(tx.error);
    });
  });
}

function dbGet(store, id) {
  return openDB().then(async db => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(id);
    return new Promise((resolve, reject) => {
      req.onsuccess = async () => {
        try {
          const data = await decryptData(store, req.result);
          resolve(data);
        } catch(e) {
          reject(e);
        }
      };
      req.onerror = () => reject(req.error);
    });
  });
}

function dbGetAll(store) {
  return openDB().then(async db => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    return new Promise((resolve, reject) => {
      req.onsuccess = async () => {
        try {
          const items = req.result || [];
          const decrypted = [];
          for (const item of items) {
            decrypted.push(await decryptData(store, item));
          }
          resolve(decrypted);
        } catch(e) {
          reject(e);
        }
      };
      req.onerror = () => reject(req.error);
    });
  });
}

function dbDelete(store, id) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  }));
}

function dbClear(store) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  }));
}

function dbCount(store) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).count();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}

// الحصول على عناصر بالفهرس
function dbGetByIndex(store, indexName, value) {
  return openDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).index(indexName).getAll(value);
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  }));
}

// ============ العداد التسلسلي ============
async function getNextSerial(type) {
  const year = new Date().getFullYear();
  const key = 'kodnaqi_serial_' + type + '_' + year;
  let current = parseInt(localStorage.getItem(key) || '0', 10);
  if (isNaN(current)) current = 0;
  current++;
  localStorage.setItem(key, String(current));
  const num = String(current).padStart(6, '0');
  if (type === 'patient') return 'KN-P-' + year + '-' + num;
  if (type === 'visit') return 'KN-' + year + '-' + num;
  return String(current);
}
