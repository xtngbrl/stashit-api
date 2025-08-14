const { Thumbnail } = require('../models');

async function saveThumbnail(fileId, label, url, width, height) {
    return await Thumbnail.create({
        file_id: fileId,
        label: label,
        url: url,
        width: width,
        height: height
    });
}

async function getThumbnail(fileId) {
    return await Thumbnail.findByPk({
        where:{
            fileId: fileId
        }
    })
}

module.exports = {
    saveThumbnail,
    getThumbnail
}