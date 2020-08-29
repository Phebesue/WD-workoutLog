
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      username: {
        type: DataTypes.STRING,
        // allowNull: false,
      
      },
      passwordhash: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
    });
    return User;
  };