module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    idQuestion: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  return Question;
};
