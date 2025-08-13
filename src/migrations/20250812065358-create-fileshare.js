'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('file_shares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'files',
              key: 'id'
          },
          onDelete: 'SET NULL'
      },
      token: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      permission: {
          type: Sequelize.ENUM('read', 'write'),
          allowNull: false,
          defaultValue: 'read'
      },
      is_public: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
      },
      expires_at: {
          type: Sequelize.DATE,
          allowNull: true
      },
      max_downloads: {
          type: Sequelize.INTEGER,
          allowNull: true
      },
      download_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
      },
      created_by: {
          type: Sequelize.INTEGER,
          allowNull: true, // set to false if you require authentication
          references: {
              model: 'users',
              key: 'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('file_shares');
  }
};
