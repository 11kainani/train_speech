const {DataTypes } = require('sequelize');
const sequelize = require('../config'); // Ensure this points to your Sequelize configuration


// Import models
const Subject = require('./subject')(sequelize, DataTypes);
const Answer = require('./answer')(sequelize, DataTypes);
const Comment = require('./comment')(sequelize,DataTypes);

// Set up associations


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
  Answer,
  Comment,
};
