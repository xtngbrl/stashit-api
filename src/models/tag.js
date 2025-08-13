'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        static associate(models) {
            Tag.belongsToMany(models.File, {
                through: models.FileTag,
                foreignKey: 'tag_id'
            });
        }
    }

    Tag.init ({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Tag',
        tableName: 'tags',
        timestamps: true,
    });
    return Tag;
}