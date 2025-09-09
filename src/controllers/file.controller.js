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

async function listVersions(req, res, next) {
  try {
    const allVersions = await fileService.getFileVersions(req.params.id);
    res.status(200).json(allVersions);
  } catch (error) {
    next(error);
  }
}

async function createVersion(req, res, next) {
  try {
    const { id } = req.params;
    const versionData = await fileService.createFileVersion(id);
    res.status(201).json({message: 'File version created', versionData});
  } catch (error) {
    next(error);
  }
}

async function deleteVersion(req, res, next) {
  try {
    const { id } = req.params;
    await fileService.deleteFileVersion(id);
    res.status(200).json({message: 'File version deleted successfully'});
  } catch (err) {
    next(err);
  }
}

async function listPermissions(req, res, next) {
  try {
    const { fileId } = req.params;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const permissions = await fileService.getFilePermissions(fileId, userId);
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
}

async function addPermission(req, res, next) {
  try {
    const { fileId } = req.params;
    if(!fileId) return res.status(400).json({ message: 'fileId is required' });
    const { userId, permission } = req.body;
    if (!userId || !permission) {
      return res.status(400).json({ message: 'userId and permission are required' });
    }
    const newPermission = await fileService.addFilePermission(fileId, userId, permission);
    res.status(201).json({ message: 'Permission added', newPermission });
  } catch (error) {
    next(error);
  }
}

async function removePermission(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Permission ID is required' });
    await fileService.removeFilePermission(id);
    res.status(200).json({ message: 'Permission removed successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listFiles,
  getFile,
  createUploadSession,
  finalizeUpload,
  deleteFile,

  // version control 
  listVersions,
  createVersion,
  deleteVersion,

  // permissions 
  listPermissions,
  addPermission,
  removePermission
};
