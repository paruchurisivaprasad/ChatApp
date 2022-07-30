let express = require("express");
let bodyParser = require("body-parser");
let bcrypt = require("bcrypt");
let cors = require("cors");
const sequelize = require("./models/database");



let app = express();

app.use(bodyParser.json());
app.use(cors());

const signlogin=require('./routes/loginsignup');
const User=require('./models/user');


app.use(signlogin);

sequelize
  .sync()
  .then((result) => {
    app.listen(5555, () => {
      console.log(" listening to 5555 port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
 
