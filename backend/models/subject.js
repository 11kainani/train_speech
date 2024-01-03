const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config'); // Update the path accordingly


const Subject = sequelize.define('Subject', {
  // Model attributes are defined here
  idSubject: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = Subject;
