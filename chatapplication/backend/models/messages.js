const sequelize=require('./database');
const Sequelize=require('sequelize');

const Message=sequelize.define('message',{

id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
},

msg:{
    type:Sequelize.STRING,
    allowNull:false
},

username:{
type:Sequelize.STRING,
allowNull:false
}

});


module.exports=Message;