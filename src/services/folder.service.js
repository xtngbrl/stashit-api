const { Folder } = require('../models');

async function createFolder(folderName, userId, parentId = null){
    return await Folder.create({
        name: folderName,
        owner_id: userId,
        parent_id: parentId
    });
}

async function getFolderById(folderId) {
    return await Folder.findByPk(folderId);
}

async function getSubFolders(parentId = null){
    return await Folder.findAll({
        whrere:{
            parent_id: parentId
        }
    });
}

async function deleteFolder(folderId){
    return await Folder.destroy({
        where: {
            id: folderId
        }
    });
}

module.exports = {
    createFolder,
    getFolderById,
    getSubFolders,
    deleteFolder
}