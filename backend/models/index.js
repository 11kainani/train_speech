const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config'); // Ensure this points to your Sequelize configuration
const answer = require('./answer');

// Import models
const Subject = require('./subject')(sequelize, DataTypes);
const Prompt = require('./prompt')(sequelize, DataTypes);
const Question = require('./question')(sequelize, DataTypes);
const Answer = require('./answer')(sequelize, DataTypes);
const Comment = require('./comment')(sequelize,DataTypes);

// Set up associations

//Prompt
Prompt.belongsTo(Subject, {
  foreignKey: 'idPrompt',
  targetKey: 'idSubject',
  as: 'subject',
  onDelete: 'CASCADE', // Enforce cascade delete
  onUpdate: 'CASCADE',
});

Subject.hasOne(Prompt, {
  foreignKey: 'idPrompt',
  as: 'prompt',
});
//Question
Question.belongsTo(Subject, {
  foreignKey: 'idQuestion',
  targetKey: 'idSubject',
  as: 'subject',
  onDelete: 'CASCADE', // Enforce cascade delete
  onUpdate: 'CASCADE',
});
Subject.hasOne(Question, {
  foreignKey: 'idQuestion',
  as: 'question',
});
// Answer
Subject.hasMany(Answer, {
  foreignKey: 'idSubject',
  as: 'answers',
});

Answer.belongsTo(Subject, {  
      foreignKey: 'idSubject',
      onDelete: 'CASCADE',  
      onUpdate: 'CASCADE',
  });

// Comment
Answer.hasMany(Comment,{
  foreignKey: 'idAnswer',
  as: 'comments',
})

Comment.belongsTo(Answer, {
  foreignKey: 'idAnswer',
  onDelete: 'CASCADE',  
  onUpdate: 'CASCADE',

})
// Export models and Sequelize instance
module.exports = {
  sequelize,
  Subject,
  Prompt,
  Question,
  Answer,
  Comment,
};
