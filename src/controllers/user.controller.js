const userService = require('../services/user.service');

async function listUsers (req, res, next) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

async function getUser (req, res, next) {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({message: "User not found or doesn't exist."})
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

async function createUser (req, res, next) {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({message: 'User created successfully', user});
    } catch (error) {
        next(error);
    }
};

async function updateUser (req, res, next) {
    try {
        await userService.updateUser(req.body, req.params.id);
        res.status(200).json({message: "User updated successfully"});
    } catch (error) {
        next(error);
    }
};

async function deleteUser (req, res, next) {
    try {
        await userService.removeUser(req.params.id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
