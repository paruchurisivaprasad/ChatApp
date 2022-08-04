const Group=require('../models/groups');
const User=require('../models/user');
const uuid=require('uuid');
const aut=require('../authentication');
const Usergroup=require('../models/usergroups');
const express=require('express');
const router=express.Router();


router.get('/getgrpname/:id',aut.authenticate,async (req,res)=>{
    let grpidname=req.params.id;


    Group.findOne({where:{id:grpidname}})
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        res.json(err);
    })
})

router.post('/creategrp',aut.authenticate,async(req,res)=>{

    let id=uuid.v4();
    let userid=req.user.id;
let {grpname}=req.body;
    Group.create({id:id,groupname:grpname})
    .then(result=>{

        let idid=result.id;
        let gpname=result.groupname;
        let nameuser=req.user.name;
        
        console.log(idid,gpname,userid,result);
        Usergroup.create({admin:true,groupname:gpname,name:nameuser,groupId:idid,userId:userid})
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            res.json(err);
        })

    })
    .catch(err=>{
        console.log(err);
    })
});


router.get('/getallgroups',aut.authenticate,async(req,res)=>{

let id=req.user.id;


Usergroup.findAll({where:{userId:id}})
.then(result=>{
    res.json(result);
})
.catch(err=>{
    res.json(err);
})
});

router.post('/addparticipants/:id',aut.authenticate,async (req,res)=>{

let {mail,admin}=req.body;
let gid=req.params.id;
console.log(mail,gid,admin);
let userID=req.user.id;
let isadmin=await Usergroup.findOne({where:{userId:userID,groupId:gid}});

console.log(isadmin.admin==true,isadmin);

if(isadmin.admin==true){

let usercheck=await User.findOne({where:{email:mail}});

if(usercheck){

let groupdata=await Group.findOne({where:{id:gid}});
let grpName=groupdata.groupname;
let grpid=groupdata.id;
let uname=usercheck.name;

Usergroup.create({admin:admin,groupname:grpName,name:uname,userId:usercheck.id,groupId:grpid})
.then(result=>{
    res.json("user added to group")
})
.catch(err=>{
    res.json("something went wrong");
})

}
else{
    res.json("user not found with that email")
}

}
else{

    res.json("youre not admin or group doesn't exist")
}

});

router.get('/grpparticipants/:id',aut.authenticate,async (req,res)=>{

let groupidid=req.params.id;
let uid=req.user.id;

let userfound=await Usergroup.findOne({where:{groupId:groupidid,userId:uid}});

if(userfound){
Usergroup.findAll({where:{groupId:groupidid}})
.then(result=>{
    res.json(result)
})
.catch(err=>{
    res.json(err);
})
}
else{
    res.json("you aren't part of this group");

}

})

module.exports=router;