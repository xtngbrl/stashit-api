'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    static associate(models) {
      // If we have a User model:
      File.belongsTo(models.User, {
        foreignKey: 'uploaded_by',
        as: 'uploader'
      });

      // File version tracking
      File.hasMany(models.FileVersion, {
        foreignKey: 'file_id'
      });

      // If we later implement sharing:
      File.hasMany(models.FileShare, {
        foreignKey: 'file_id',
        as: 'shares'
      });

      File.hasMany(models.Thumbnail, {
        foreignKey: 'file_id' 
      })

     // File Tagging 
      File.belongsToMany(models.Tag, {
          through: models.FileTag,
          foreignKey: 'file_id'
      });

      // Folder Assoc
      File.belongsTo(models.Folder, {
        foreignKey: 'folder_id'
      });

    }
  }

  File.init({
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originalname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    storage_key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    storage_bucket: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firebase_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: true, // set to false if you require authentication
      references: {
        model: 'users',
        key: 'id'
      }
    },
    folder_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'folders',
            key: 'id'
        }
    },
  }, {
    sequelize,
    modelName: 'File',
    tableName: 'files',
    timestamps: true,
    paranoid: true
  });

  return File;
};
