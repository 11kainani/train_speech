module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    idQuestion: {
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

  return Question;
};
