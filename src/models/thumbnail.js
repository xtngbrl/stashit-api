'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Thumbnail extends Model {
        static associate(models) {
           Thumbnail.belongsTo(models.File, {
                foreignKey: 'file_id'
           })
    
        }
    }

    Thumbnail.init ({
        file_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'files',
                key: 'id'
            }
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }, {
        sequelize,
        modelName: 'Thumbnail',
        tableName: 'thumbnails',
        timestamps: true,
    });
    return Thumbnail;
}