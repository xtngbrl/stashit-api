const { FileShare } = require('../models');
const { v4:uuidv4 } = require('uuid');

async function createShareableLink(fileId, userId, permissionType, isPublic = true, expiresAt, downloadLimit) {
    const token = uuidv4()
    return await FileShare.create({
        file_id: fileId,
        token: token,
        permission: permissionType,
        is_public: isPublic,
        expires_at: expiresAt,
        max_downloads: downloadLimit,
        created_by: userId,
    });
}

async function getShareByToken(token) {
  return await FileShare.findOne({ where: { token } });
}

async function revokeShare(token) {
  return await FileShare.destroy({ where: { token } });
}


module.exports = {
  createShareableLink,
  getShareByToken,
  revokeShare
};