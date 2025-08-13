'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Folder extends Model {
        static associate(models) {
            Folder.hasMany(models.File);

            Folder.belongsTo(models.Folder, {
                as: 'parent',
                foreignKey: 'parent_id'
            })
    
        }
    }

    Folder.init ({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'folders',
                key: 'id'
            }
        }

    }, {
        sequelize,
        modelName: 'Folder',
        tableName: 'folders',
        timestamps: true,
    });
    return Folder;
}