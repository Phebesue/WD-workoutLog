require("dotenv").config()
let express = require("express");
let app = express();
const sequelize = require("./db");
sequelize.sync();
// sequelize.sync({force: true})
app.use(express.json());
app.use(require("./middleware/headers"));


let user = require("./controllers/userController");
let log = require("./controllers/logController");
let userInfo = require("./controllers/userInfoController");


// -----  Exposed Route  -----
app.use("/user",user);

// -----  Protected Route  -----
app.use(require("./middleware/validate-session"));
app.use("/log",log);
app.use("/userInfo",userInfo);

app.listen(process.env.PORT, () => {console.log(`App is listening on port ${process.env.PORT}`) ;
});

