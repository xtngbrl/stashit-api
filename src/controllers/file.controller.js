const fileService = require('../services/file.service');

async function listFiles(req, res, next) {
  try {
    const files = await fileService.getAllFiles();
    res.json(files);
  } catch (err) {
    next(err);
  }
}

async function getFile(req, res, next) {
  try {
    const file = await fileService.getFileById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.json(file);
  } catch (err) {
    next(err);
  }
}

async function createUploadSession(req, res, next) {
  try {
    const { filename, mimetype } = req.body;
    if (!filename || !mimetype) {
      return res.status(400).json({ message: 'filename and mimetype are required' });
    }

    const userId = req.user?.id || null;
    const sessionData = await fileService.createUploadSession(filename, mimetype, userId);

    return res.status(201).json(sessionData);
  } catch (error) {
    next(error);
  }
}

// Step 2: Finalize upload after client signals completion
async function finalizeUpload(req, res, next) {
  try {
    const { storagePath, savedFilename, originalname, mimetype, size } = req.body;
    if (!storagePath || !savedFilename) {
      return res.status(400).json({ message: 'Missing storage path or filename' });
    }

    const userId = req.user?.id || null;
    const fileData = await fileService.finalizeUpload(
      storagePath, savedFilename, originalname, mimetype, size, userId
    );

    return res.status(201).json({ fileData });
  } catch (error) {
    next(error);
  }
}

async function deleteFile(req, res, next) {
  try {
    await fileService.deleteFile(req.params.id);
    res.json({message: 'File deleted successfully'});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listFiles,
  getFile,
  createUploadSession,
  finalizeUpload,
  deleteFile
};
