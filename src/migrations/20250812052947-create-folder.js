'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('folders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      owner_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'users',
              key: 'id'
          }
      },
      parent_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
              model: 'folders',
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
    await queryInterface.dropTable('folders');
  }
};
