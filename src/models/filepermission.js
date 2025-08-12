'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FilePermission extends Model {
        static associate(models) {

            FilePermission.belongsTo(models.File);

            FilePermission.belongsTo(models.User);
        }
    }

    FilePermission.init ({
        file_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'File',
                key: 'id'
            }
        },
        permission: {
            type: DataTypes.ENUM('read', 'write', 'owner'),
            allowNull: false,
            defaultValue: 'read'
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true, // set to false if you require authentication
            references: {
                model: 'Users',
                key: 'id'
            }
        }

    }, {
    sequelize,
    modelName: 'FilePermission',
    tableName: 'file_permissions',
    timestamps: true,
    });
    return FilePermission;
}