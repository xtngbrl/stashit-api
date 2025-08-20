const tagService = require ('../services/tag.service');

async function listTags(req, res, next) {
    try {
        const tags = await tagService.getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        next(error);
    }
};

async function createTag(req, res, next) {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({message: 'Tag name is required'});
        const tag = await tagService.createTag(name);
        res.status(201).json(tag);
    } catch (error) {
        next(error);
    }
};

async function updateTag(req, res, next) {
    try {
        const tagId = req.params.id;
        const { name } = req.body;
        if(!name) return res.status(400).json({message: 'Tag name is required'});
        const updated = await tagService.updateTag(tagId, name);
        if(!updated) return res.status(400).json({message: 'Tag not found. Update is unsuccessful'})
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

async function deleteTag(req, res, next) {
    try {
        await tagService.deleteTag(req.params.id)
        res.json({message: 'Tag deleted successfully'});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listTags,
    createTag,
    updateTag,
    deleteTag
};