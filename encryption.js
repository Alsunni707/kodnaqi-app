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

// ============================================================
// KodNaqi — تشفير النسخ الاحتياطية (AES-256-GCM)
// ============================================================

const ENCRYPTION_KEY = 'kodnaqi_encrypted_password';
const ENCRYPTED_PREFIX = 'KODNAQI_ENC_V1:';

// ============ كلمة مرور التشفير ============
function setEncryptionPassword(password) {
  if (!password || password.length < 6) {
    throw new Error('كلمة مرور التشفير قصيرة (6 أحرف على الأقل)');
  }
  // احفظها في sessionStorage (تُمسح عند إغلاق المتصفح)
  sessionStorage.setItem(ENCRYPTION_KEY, password);
}

function getEncryptionPassword() {
  return sessionStorage.getItem(ENCRYPTION_KEY) || '';
}

function hasEncryptionPassword() {
  return getEncryptionPassword().length >= 6;
}

function clearEncryptionPassword() {
  sessionStorage.removeItem(ENCRYPTION_KEY);
}

// ============ اشتقاق مفتاح من كلمة المرور ============
async function deriveKey(password, salt) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  
  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// ============ تشفير نص ============
async function encryptText(plainText, password) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  const key = await deriveKey(password, salt);
  
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encoder.encode(plainText)
  );
  
  // رتّب: salt + iv + ciphertext
  const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(encrypted), salt.length + iv.length);
  
  // حوّل base64
  let binary = '';
  for (let i = 0; i < combined.byteLength; i++) {
    binary += String.fromCharCode(combined[i]);
  }
  return btoa(binary);
}

// ============ فك تشفير نص ============
async function decryptText(encryptedBase64, password) {
  try {
    const binary = atob(encryptedBase64);
    const combined = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      combined[i] = binary.charCodeAt(i);
    }
    
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const ciphertext = combined.slice(28);
    
    const key = await deriveKey(password, salt);
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    );
    
    return new TextDecoder().decode(decrypted);
  } catch (e) {
    console.error('فك التشفير فشل:', e);
    return null;
  }
}

// ============ تجهيز نسخة مشفرة ============
async function prepareEncryptedBackup(data) {
  if (!hasEncryptionPassword()) {
    throw new Error('لا توجد كلمة مرور للتشفير');
  }
  
  const json = JSON.stringify(data);
  const password = getEncryptionPassword();
  const encrypted = await encryptText(json, password);
  
  // أضف بادئة للتعرّف
  return ENCRYPTED_PREFIX + encrypted;
}

// ============ استرجاع نسخة مشفرة ============
async function parseEncryptedBackup(encryptedString) {
  if (!encryptedString || !encryptedString.startsWith(ENCRYPTED_PREFIX)) {
    // ليس مشفرة — أعد كـ JSON
    try {
      return JSON.parse(encryptedString);
    } catch (e) {
      throw new Error('صيغة غير معروفة');
    }
  }
  
  if (!hasEncryptionPassword()) {
    throw new Error('مطلوب كلمة مرور لفك التشفير');
  }
  
  const encryptedBase64 = encryptedString.substring(ENCRYPTED_PREFIX.length);
  const password = getEncryptionPassword();
  const json = await decryptText(encryptedBase64, password);
  
  if (!json) {
    throw new Error('كلمة المرور خاطئة أو الملف تالف');
  }
  
  return JSON.parse(json);
}

// ============ فحص ما إذا كانت مشفرة ============
function isEncrypted(content) {
  if (typeof content === 'string') {
    return content.startsWith(ENCRYPTED_PREFIX);
  }
  return false;
}

// ============ نموذج إدخال كلمة المرور ============
function showPasswordDialog(title, message, callback) {
  var html = '<form id="encPassForm" autocomplete="off" onsubmit="event.preventDefault();">' +
    '<div class="alert alert-info py-2 small mb-3">' +
    '<i class="bi bi-shield-lock"></i> ' + message +
    '</div>' +
    '<div class="mb-3">' +
    '<label class="form-label small fw-bold">كلمة مرور التشفير</label>' +
    '<input type="password" id="encPassword" class="form-control" dir="ltr" autocomplete="new-password" placeholder="••••••••">' +
    '<div class="form-text small">6 أحرف على الأقل — احفظها في مكان آمن!</div>' +
    '</div>' +
    '<div class="d-grid gap-2">' +
    '<button type="button" class="btn btn-primary" onclick="confirmEncPassword()">' +
    '<i class="bi bi-lock"></i> تأكيد</button>' +
    '<button type="button" class="btn btn-outline-secondary" onclick="closeInfoModal()">إلغاء</button>' +
    '</div>' +
    '</form>';
  
  window._encPasswordCallback = callback;
  showInfoModal(html, title);
  
  setTimeout(function() {
    var el = document.getElementById('encPassword');
    if (el) el.focus();
  }, 300);
}

function confirmEncPassword() {
  var el = document.getElementById('encPassword');
  if (!el) return;
  
  var password = el.value;
  
  if (password.length < 6) {
    alert('⚠️ كلمة المرور قصيرة (6 أحرف على الأقل)');
    return;
  }
  
  setEncryptionPassword(password);
  console.log('✅ تم تعيين كلمة مرور التشفير');
  
  closeInfoModal();
  
  if (typeof window._encPasswordCallback === 'function') {
    window._encPasswordCallback(password);
    window._encPasswordCallback = null;
  }
}

// ============ تصدير ============
window.setEncryptionPassword = setEncryptionPassword;
window.getEncryptionPassword = getEncryptionPassword;
window.hasEncryptionPassword = hasEncryptionPassword;
window.clearEncryptionPassword = clearEncryptionPassword;
window.encryptText = encryptText;
window.decryptText = decryptText;
window.prepareEncryptedBackup = prepareEncryptedBackup;
window.parseEncryptedBackup = parseEncryptedBackup;
window.isEncrypted = isEncrypted;
window.showPasswordDialog = showPasswordDialog;
window.confirmEncPassword = confirmEncPassword;
