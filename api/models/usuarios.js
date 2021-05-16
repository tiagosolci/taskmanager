'use strict';
/**
 * @type {class} constante que possui o Model do sequelize e que implementa a tabela de Usuarios, definindo as associações da tabela, as suas colunas e tipos.
 * @throws {Error} - O erro ocorre na validação do nome do usuário que dever ter três ou mais caracteres.
 * A classe verifica também se o e-mail informado é único na tabela através da função validade na coluna e-mail que é capturado e tratado na classe Usuário.
 */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    static associate(models) {
      Usuarios.hasMany(models.Projetos, {
        foreignKey: 'usuario_id'
      })
    }
  };
  Usuarios.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        funcaoValidadora: (dado) => {
          if (dado.length < 3) throw new Error('O campo nome deve ter mais de três caracteres.')
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'O tipo do e-mail informado é inválido.'
        },
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    emailVerificado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Usuarios',
    paranoid: true,
    defaultScope: {
      where: { ativo: true }
    },
    scopes: { todos: { where: {} } }
  });
  return Usuarios;
};
