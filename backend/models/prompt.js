module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define('Prompt', {
    idPrompt: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Subject',
        key: 'idSubject',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });


  return Prompt;
};