const Sequelize = require("sequelize");
const sequelize = new Sequelize("workoutLog", "postgres", process.env.PASS, {
  host: "localhost",
  dialect: "postgres",
});


sequelize
  .authenticate()
  .then(() => console.log("workoutLog db is connected"))
  .catch((err) => console.log(err));

User = sequelize.import("./models/user");
Logs = sequelize.import("./models/log");
UserInfo = sequelize.import("./models/userInfo");

Logs.belongsTo(User);
User.hasMany(Logs);

User.hasOne(UserInfo);
UserInfo.belongsTo(User);
// UserInfo.belongsTo(User,{as: "Owner"});


  module.exports = sequelize;