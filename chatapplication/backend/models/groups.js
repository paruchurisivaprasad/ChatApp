const sequelize=require('./database');
const Sequelize=require('sequelize');

const Group=sequelize.define('group',{
id:{
    type:Sequelize.UUID,
    allowNull:false,
    primaryKey:true
},
groupname:{
    type:Sequelize.STRING,
    allowNull:false
}
});

module.exports=Group;