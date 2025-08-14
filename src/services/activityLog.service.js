const { ActivityLog } = require('../models');

async function logActivity({userId, action, details, userIP}) {
    return await ActivityLog.create({
        user_id: userId,
        action: action,
        details: details,
        ip_address: userIP
    });
}

async function getUserActivity(userId, limit = 50) {
    return await ActivityLog.findAll({
        where: { user_id: userId },
        order: [['createdAt', 'DESC']],
        limit
    })
}

async function getAllActivities(limit = 100) {
    return await ActivityLog.findAll({
        order: [['createdAt', 'DESC']],
        limit
    })
}

module.exports = {
    logActivity,
    getUserActivity,
    getAllActivities
}