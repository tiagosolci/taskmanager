'use strict';
/**
 * @type {class} constante que possui o Model do sequelize e que implementa a tabela de Tarefas, definindo as associações da tabela, as suas colunas e tipos.
 */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarefas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tarefas.belongsTo(models.Projetos, {
        foreignKey: 'projeto_id'
      })
    }
  };
  Tarefas.init({
    projeto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true
    },
    concluido: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    dataTermino: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dataConclusao: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Tarefas',
    paranoid: true
  });
  return Tarefas;
};