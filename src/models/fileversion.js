'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FileVersion extends Model {
        static associate(models){
            FileVersion.belongsTo(models.File, {
                foreignKey: 'file_id'
            });
        }
    }

    FileVersion.init({
        file_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'files',
                key: 'id'
            }
        },
        version_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        storage_key: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        firebase_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mimetype: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        sequelize,
        modelName: 'FileVersion',
        tableName: 'file_versions',
        timestamps: true,
    });
    return FileVersion
}