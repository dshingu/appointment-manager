'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
            key: 'id'
          }
        }
      },
      title: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      remind_me: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('appointments');

  }
};
