'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('file_tags', {
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
              model: 'File',
              key: 'id'
          }
      },
      tag_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Tag',
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
    await queryInterface.dropTable('file_tags');
  }
};
