const { FilePermission } = require('../models');

async function setPermission(fileId, userId, permissionType) {
    return await FilePermission.upsert({
        file_id: fileId,
        user_id: userId,
        permission: permissionType
    });
}

async function removePermission(fileId, userId) {
    return await FilePermission.destroy({
        where: { 
            file_id: fileId, 
            user_id: userId 
        }
    });

}

async function getPermissions(fileId) {
    return await FilePermission.findAll({
        where: { file_id: fileId}
    });
}


module.exports = {
    setPermission,
    removePermission,
    getPermissions
}