// models/EmailConfirmation.js
module.exports = (sequelize, DataTypes) => {
  const EmailConfirmation = sequelize.define("EmailConfirmation", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return EmailConfirmation;
};