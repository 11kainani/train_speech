module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    idSubject: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    }
  }, {
    freezeTableName: true,
    timestamps: true,
  });

  return Subject;
};

