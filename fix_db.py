from pathlib import Path

p = Path("db.js")
s = p.read_text(encoding='utf-8')

# 1. تحديث encryptData
start = s.find("async function encryptData(storeName, data) {")
end = s.find("async function decryptData", start)

if start > 0 and end > start:
    new_encrypt = '''async function encryptData(storeName, data) {
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

'''
    s = s[:start] + new_encrypt + s[end:]
    print("✅ تم تحديث encryptData")

# 2. تحديث dbAdd
start = s.find("function dbAdd(store, data) {")
end = s.find("function dbPut", start)

if start > 0 and end > start:
    new_dbadd = '''function dbAdd(store, data) {
  return openDB().then(async db => {
    const finalData = await encryptData(store, data);
    if (finalData && (finalData.id === undefined || finalData.id === null)) {
      delete finalData.id;
    }
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).add(finalData);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      tx.onabort = () => reject(tx.error);
    });
  });
}

'''
    s = s[:start] + new_dbadd + s[end:]
    print("✅ تم تحديث dbAdd")

p.write_text(s, encoding='utf-8')
print("✅ تم حفظ جميع التعديلات")
