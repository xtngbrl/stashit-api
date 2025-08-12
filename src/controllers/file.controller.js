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

module.exports = {
  listFiles,
  getFile
};
