'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('file_versions', {
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
          onDelete: 'CASCADE'
      },
      version_number: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      storage_key: {
          type: Sequelize.STRING,
          allowNull: true,
      },
      firebase_url: {
          type: Sequelize.TEXT,
          allowNull: true
      },
      size: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      mimetype: {
          type: Sequelize.STRING,
          allowNull: false
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
    await queryInterface.dropTable('file_versions');
  }
};
