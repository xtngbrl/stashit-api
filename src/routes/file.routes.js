const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const fileController = require('../controllers/file.controller');

// Routes
router.get('/', fileController.listFiles);
router.get('/:id', fileController.getFile);
router.post('/upload-session', fileController.createUploadSession);
router.post('/upload-finalize', fileController.finalizeUpload);
router.delete('/:id', fileController.deleteFile);

// Version Control Routes 
router.get('/versions/:id', fileController.listVersions);
router.post('/create-version/:id', fileController.createVersion);
router.delete('/delete-version/:id', fileController.deleteVersion);

// Permission Routes
router.get('/permissions/:fileId', fileController.listPermissions);
router.post('/permissions/:fileId', fileController.addPermission);
router.delete('/permissions/:id', fileController.removePermission);

// Clean up tmp dir if it doesn’t exist
const tmpDir = path.join(__dirname, '../tmp/uploads');
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
}

module.exports = router;
