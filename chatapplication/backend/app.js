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
const Message=require('./models/messages');
const messageroute=require('./routes/message');
const Group=require('./models/groups');
const Groupmessage=require('./models/groupmessage');
const Usergroup=require('./models/usergroups');
const CreateGroup=require('./routes/creategroup');
const groupMsgrouter=require('./routes/groupmsgs');
app.use(signlogin);
app.use(messageroute);
app.use(CreateGroup);
app.use(groupMsgrouter);



User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group,{through:Usergroup});
Group.belongsToMany(User,{through:Usergroup});

User.hasMany(Groupmessage);
Groupmessage.belongsTo(User);
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
 
