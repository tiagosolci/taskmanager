'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tarefas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projeto_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Projetos', key: 'id' }
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      concluido: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      dataTermino: {
        allowNull: true,
        type: Sequelize.DATE
      },
      dataConclusao: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        deleteAt: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tarefas');
  }
};