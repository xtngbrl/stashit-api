const fileShareService = require('../services/fileShare.service');

async function createShare(req, res, next) {
    try {
        const userId = req.user?.id || null;
        const {fileId, token, permissionType, 
            isPublic, expiresAt, downloadLimit} = req.body;
        const share = await fileShareService.createShareableLink(fileId, token, permissionType, 
            isPublic, expiresAt, downloadLimit)
        res.status(201).json(share);
    } catch (error) {
        
    }
};

async function getShare(req, res, next) {
    try {
        const { token } = req.params;
        const share = await fileShareService.getShareByToken(token);
        if (!share) return res.status(404).json({message: 'Shared folder not found'});
        res.status(200).json(share);
    } catch (error) {
        next(error);
    }
};

async function revokeShare(req, res, next) {
    try {
        await fileShareService.revokeShare(req.params.token);
        res.json({message: "Sharing revoked successfully"});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createShare,
    getShare,
    revokeShare
};