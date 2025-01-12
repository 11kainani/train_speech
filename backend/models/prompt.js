module.exports = (sequelize, DataTypes) => {
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

  return Prompt;
};