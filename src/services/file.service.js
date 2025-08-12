const { File } = require('../models');

async function getAllFiles(filters = {}) {
  return await File.findAll({ where: filters });
}

async function getFileById(id) {
  return await File.findByPk(id);
}

async function createFile(data) {
  return await File.create(data);
}

async function deleteFile(id) {
  return await File.destroy({ where: { id } });
}

module.exports = {
  getAllFiles,
  getFileById,
  createFile,
  deleteFile
};
