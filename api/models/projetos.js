'use strict';
/**
 * @type {class} constante que possui o Model do sequelize e que implementa a tabela de projetos, definindo as associações da tabela, as suas colunas e tipos.
 */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projetos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Projetos.belongsTo(models.Usuarios, {
        foreignKey: 'usuario_id'
      })
      Projetos.hasMany(models.Tarefas, {
        foreignKey: 'projeto_id'
      })
    }
  };
  Projetos.init({
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Projetos',
    paranoid: true
  });
  return Projetos;
};