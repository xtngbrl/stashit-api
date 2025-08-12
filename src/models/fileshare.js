'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FileShare extends Model {
        static associate(models) {
            // If we have a File model:
            FileShare.belongsTo(models.File, {
                foreignKey: 'file_id',
                as: 'file'
            });

            FileShare.belongsTo(models.User, {
                foreignKey: 'created_by'
            });
        }
    }

    FileShare.init ({
        file_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'File',
                key: 'id'
            }
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        permission: {
            type: DataTypes.ENUM('read', 'write'),
            allowNull: false,
            defaultValue: 'read'
        },
        is_public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        expires_at: {
            type: DataTypes.TIMESTAMP,
            allowNull: true
        },
        max_downloads: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        download_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true, // set to false if you require authentication
            references: {
                model: 'Users',
                key: 'id'
            }
        }

    }, {
    sequelize,
    modelName: 'FileShare',
    tableName: 'file_shares',
    timestamps: true,
    });
    return FileShare;
}