const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config'); // Update the path accordingly
const Subject = require("./subject")

const Question = sequelize.define('Question', {
    idQuestion: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    // other attributes specific to Question
  }, {
    freezeTableName: true,
    timestamps: false,
  });
  
  // Establish the inheritance relationship
  Question.belongsTo(Subject, { foreignKey: 'idQuestion',targetKey: 'idSubject', as: "Question"});
  
  module.exports = Question;