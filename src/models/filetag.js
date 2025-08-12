'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FileTag extends Model {
        static associate(models) {
            FileTag.belongsTo(models.File, {
                foreignKey: 'file_id'
            });

            FileTag.belongsTo(models.Tag, {
                foreignKey: 'tag_id'
            });
        }
    }

    FileTag.init ({
        file_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'File',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Tag',
                key: 'id'
            }
        },
    }, {
        sequelize,
        modelName: 'FileTag',
        tableName: 'file_tags',
        timestamps: true,
    });
    return FileTag;
}