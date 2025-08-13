'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FilePermission extends Model {
        static associate(models) {

            FilePermission.belongsTo(models.File,{
                foreignKey: 'file_id'
            });

            FilePermission.belongsTo(models.User, {
                foreignKey: 'user_id'
            });
        }
    }

    FilePermission.init ({
        file_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'files',
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
                model: 'users',
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