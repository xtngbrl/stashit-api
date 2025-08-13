'use strict';
const { Model } = require('sequelize');

module.exports =  (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models){
            User.hasMany(models.File, {
                foreignKey: 'uploaded_by'
            });
            
            User.hasMany(models.FileShare, {
                foreignKey: 'created_by'
            });

            User.hasMany(models.FilePermission, {
                foreignKey: 'user_id'
            });

            User.hasMany(models.ActivityLog, {
                foreignKey: 'user_id'
            })
        }
    }

    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firebase_uid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        avatar_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('admin', 'user', 'guest'),
            allowNull: true,
            defaultValue: 'guest'
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true
    });
    return User;
};