const folderService = require('../services/folder.service');

async function createFolder(req, res, next) {
    try {
        const userId = req.user?.id || null;
        const { name, parentId } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Folder name is required' });
        }
        const folder = await folderService.createFolder(name, userId, parentId);
        res.status(201).json(folder)
    } catch (error) {
        next(error);
    }
}

async function getFolder(req, res, next) {
    try {
        const folder = await folderService.getFolderById(req.params.id);
        if(!folder) return res.status(404).json({ message: 'Folder not found' });
        res.status(200).json(folder);
    } catch (error) {
        next(error);
    }
}

async function deleteFolder(req, res, next) {
    try {
        await folderService.deleteFolder(req.params.id)
        res.json({message: 'Folder deleted successfully'})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createFolder,
    getFolder,
    deleteFolder
}