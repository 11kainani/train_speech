const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config'); // Ensure this points to your Sequelize configuration

// Import models
const Subject = require('./subject')(sequelize, DataTypes);
const Prompt = require('./prompt')(sequelize, DataTypes);
const Question = require('./question')(sequelize, DataTypes);

// Set up associations
Prompt.belongsTo(Subject, {
  foreignKey: 'idPrompt',
  targetKey: 'idSubject',
  as: 'subject',
});

Subject.hasOne(Prompt, {
  foreignKey: 'idPrompt',
  as: 'prompt',
});

Question.belongsTo(Subject, {
  foreignKey: 'idQuestion',
  targetKey: 'idSubject',
  as: 'subject',
});
Subject.hasOne(Question, {
  foreignKey: 'idQuestion',
  as: 'question',
});

// Export models and Sequelize instance
module.exports = {
  sequelize,
  Subject,
  Prompt,
  Question,
};
