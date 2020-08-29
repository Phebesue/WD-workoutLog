const Sequelize = require("sequelize");
const sequelize = new Sequelize("workoutLog", "postgres", process.env.PASS, {
  host: "localhost",
  dialect: "postgres",
});


sequelize
  .authenticate()
  .then(() => console.log("workLog db is connected"))
  .catch((err) => console.log(err));

  module.exports = sequelize;