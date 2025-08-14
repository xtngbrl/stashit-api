const { FileTag } = require('../models');
const file = require('../models/file');

async function addTagToFile(fileId, tagId) {
    return await FileTag.findOrCreate({
        where: {
            file_id: fileId,
            tag_id: tagId
        }
    })
};

async function removeTagFromFile(fileId, tagId) {
    return await FileTag.destroy({
        where: {
            file_id: fileId,
            tag_id: tagId
        }
    });
}

async function getFileTags(fileId) {
    return await FileTag.findAll({
        where: {
            file_id: fileId
        }
    });
}

module.exports = {
    addTagToFile,
    removeTagFromFile,
    getFileTags
}