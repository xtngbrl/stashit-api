'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('thumbnails', {
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
      label: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      url: {
          type: Sequelize.STRING,
          allowNull: false
      },
      width: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      height: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
    await queryInterface.dropTable('thumbnails');
  }
};
