// ═══════════════════════════════════════════════
// KodNaqi Backup — Google Apps Script
// انسخ هذا الكود في script.google.com
// ═══════════════════════════════════════════════

const FOLDER_NAME = 'KodNaqi_Backups';
const MAX_FILES = 10;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'upload') return uploadFile(data.filename, data.content);
    if (action === 'list') return listFiles();
    if (action === 'download') return downloadFile(data.filename);
    if (action === 'test') return jsonResponse({ success: true, message: 'Connection OK' });
    
    return jsonResponse({ success: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function doGet(e) {
  return jsonResponse({ success: true, message: 'KodNaqi Backup running' });
}

function uploadFile(filename, content) {
  const folder = getOrCreateFolder(FOLDER_NAME);
  const existing = folder.getFilesByName(filename);
  while (existing.hasNext()) existing.next().setTrashed(true);
  
  folder.createFile(filename, content, MimeType.PLAIN_TEXT);
  cleanOldFiles(folder);
  
  return jsonResponse({ success: true, message: 'Uploaded: ' + filename });
}

function listFiles() {
  const folder = getOrCreateFolder(FOLDER_NAME);
  const files = folder.getFiles();
  const list = [];
  
  while (files.hasNext()) {
    const f = files.next();
    list.push({
      name: f.getName(),
      date: f.getDateCreated().toISOString(),
      size: f.getSize()
    });
  }
  
  list.sort((a, b) => new Date(b.date) - new Date(a.date));
  return jsonResponse({ success: true, files: list });
}

function downloadFile(filename) {
  const folder = getOrCreateFolder(FOLDER_NAME);
  const files = folder.getFilesByName(filename);
  
  if (!files.hasNext()) return jsonResponse({ success: false, error: 'Not found' });
  
  const file = files.next();
  return jsonResponse({ success: true, content: file.getBlob().getDataAsString() });
}

function getOrCreateFolder(name) {
  const folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}

function cleanOldFiles(folder) {
  const files = folder.getFiles();
  const list = [];
  while (files.hasNext()) {
    const f = files.next();
    list.push({ file: f, date: f.getDateCreated() });
  }
  if (list.length > MAX_FILES) {
    list.sort((a, b) => a.date - b.date);
    for (let i = 0; i < list.length - MAX_FILES; i++) {
      list[i].file.setTrashed(true);
    }
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
