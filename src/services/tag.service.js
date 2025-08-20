const { Tag } = require('../models');

async function createTag(tagName) {
    return await Tag.create({
        name: tagName
    });
}

async function updateTag(tagId, tagName) {
    return await Tag.update({
        name: tagName
    }, {where: { id }});
}

async function deleteTag(id){
    return await Tag.destroy({where: { id }});
}

async function getAllTags(){
    return await Tag.findAll();
}

module.exports = {
    createTag,
    updateTag,
    deleteTag,
    getAllTags
}