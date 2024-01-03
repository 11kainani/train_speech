const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config'); // Update the path accordingly
const Subject = require("./subject")

const Prompt = sequelize.define('Prompt', {
    idPrompt: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

  }, {
    freezeTableName: true,
    timestamps: false,
  });
  
  // Establish the inheritance relationship
  Prompt.belongsTo(Subject, { foreignKey: 'idPrompt',targetKey: 'idSubject', as: 'Prompt'});
  
  module.exports = Prompt;