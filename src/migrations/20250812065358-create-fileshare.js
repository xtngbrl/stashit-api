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
      filename: {
      type: Sequelize.STRING,
      allowNull: false
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mimetype: {
        type: Sequelize.STRING,
        allowNull: false
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      storage_key: {
        type: Sequelize.STRING,
        allowNull: true
      },
      storage_bucket: {
        type: Sequelize.STRING,
        allowNull: true
      },
      firebase_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uploaded_by: {
        type: Sequelize.INTEGER,
        allowNull: true, // set to false if you require authentication
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      folder_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'Folders',
            key: 'id'
        }
      },
      deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
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
