const activityService = require('../services/activityLog.service');

async function listActivities(req, res, next) {
    try {
        const activities = await activityService.getAllActivities();
        res.status(200).json(activities);
    } catch (error) {
        next(error);
    }
};

async function getUserActivity(req, res, next) {
    try {
        const userActivity = await activityService.getUserActivity(req.params.id);
        if(!userActivity) return res.status(400).json({ message: "User activities not found or user doesn't exist."})
        res.status(200).json(userActivity)
    } catch (error) {
        next(error);
    }
};

module.exports = {
    listActivities,
    getUserActivity
}