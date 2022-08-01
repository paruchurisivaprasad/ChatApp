const Message=require('../models/messages');
const express=require('express');
const router=express.Router();
const aut=require('../authentication');
let bodyParser = require("body-parser");
const User = require('../models/user');
router.use(bodyParser.json());


router.post('/chatmessage',aut.authenticate,async (req,res)=>{

    let {message}=req.body;
    console.log(req.body.message);
    let userId=req.user.id;
    let username=req.user.name;
    
    Message.create({
        msg:message,username,userId
    })
    .then(result=>{
        res.json({result,suc:true});
    })
    .catch(err=>{
        res.json(err);
    })
});

router.get("/getmessages", aut.authenticate, async (req, res) => {
  console.log(req.body);

  Message.findAll()
    .then((result) => {
      res.json({ result, suc: true });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/user',aut.authenticate,(req,res)=>{
    User.findAll({where:{id:req.user.id}}).then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.json(err)
    })
})

module.exports=router;