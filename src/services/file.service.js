// const fs = require('fs');
// const path = require('path');
const { File } = require('../models');
const { bucket } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

async function getAllFiles(filters = {}) {
  return await File.findAll({ where: filters });
}

async function getFileById(id) {
  return await File.findByPk(id);
}

async function createFile(data) {
  return await File.create(data);
}

async function createUploadSession(filename, mimetype, userId) {
  const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
  if (!allowedTypes.includes(mimetype)) {
    throw new Error(`Unsupported file type: ${mimetype}`);
  }

  const fileId = uuidv4();
  const savedFilename = `${fileId}_${filename}`;
  const storagePath = `${userId || 'public'}/${savedFilename}`;
  const firebaseFile = bucket.file(storagePath);

  // Create a resumable session URL
  try{
    const [sessionUrl] = await firebaseFile.createResumableUpload({
        metadata: {
          contentType: mimetype,
          metadata: {
            uploadedBy: userId || 'guest',
            originalname: filename,
          }
        }
      });
      return { sessionUrl, storagePath, savedFilename };
  } catch (error){
    throw new Error('Error creating resumable session URL:', error);
  }
}

// Step 2: Finalize and save file metadata in DB
async function finalizeUpload(storagePath, savedFilename, originalname, mimetype, size, userId) {
  const firebaseFile = bucket.file(storagePath);

  try {
    const [url] = await firebaseFile.getSignedUrl({
      action: 'read',
      expires: '03-01-2030',
      virtualHostedStyle: true
    });

    return await File.create({
      filename: savedFilename,
      originalname,
      mimetype,
      size,
      storage_key: storagePath,
      storage_bucket: bucket.name,
      firebase_url: url,
      uploaded_by: userId || null,
      folder_id: null
    });
  } catch (err) {
    throw new Error(`Failed to finalize upload: ${err.message}`);
  }
}


async function deleteFile(id) {
  const fileRecord = await File.findByPk(id);
  if (!fileRecord) throw new Error('File not found');

  try {
    if (fileRecord.storage_key) {
      await bucket.file(fileRecord.storage_key).delete();
    }
  } catch (err) {
    // Not fatal — file might already be gone in Firebase
    console.warn(`Warning: Failed to delete from Firebase: ${err.message}`);
  }

  await fileRecord.destroy();
}

module.exports = {
  getAllFiles,
  getFileById,
  createFile,
  createUploadSession,
  finalizeUpload,
  deleteFile
};
