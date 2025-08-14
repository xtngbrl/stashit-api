const { User } = require('../models')

async function createUser(name, email, firebase_uid, avatar_url, role = 'guest'){
    return await User.create({
        name,
        email,
        firebase_uid,
        avatar_url,
        role
    });
}

async function updateUser(data, id) {
    return await User.update(data, {where: { id }});
}

async function getUserById(id){
    return await User.findByPk(id);
}

async function getAllUsers(){
    return await User.findAll();
}

async function removeUser(id){
    return await User.destroy({where: { id }});
}

module.exports = {
    createUser, 
    updateUser,
    getUserById,
    getAllUsers,
    removeUser
}