const { FileVersion } = require('../models');

async function setFileVersion(fileId, versionNum, storageKey, firebaseUrl, size){
    return await FileVersion.create({
        file_id: fileId,
        version_number: versionNum,
        storage_key: storageKey,
        firebase_url: firebaseUrl,
        size,
        mimetype: 'application/octet-stream' // Assuming the file is an octet-stream
    })
}

async function getFileVersions(fileId){
    return await FileVersion.findAll({
        where: {
            file_id: fileId
        }
    });
}

module.exports = {
    setFileVersion,
    getFileVersions
}