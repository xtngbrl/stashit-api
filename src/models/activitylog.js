'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ActivityLog extends Model {
        static associate(models) {
           ActivityLog.belongsTo(models.User, {
            foreignKey: 'user_id'
           });
    
        }
    }

    ActivityLog.init ({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        ip_address: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'ActivityLog',
        tableName: 'activity_logs',
        timestamps: true,
    });
    return ActivityLog;
}