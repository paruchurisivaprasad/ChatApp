
let token = localStorage.getItem("token");
let listofgrps = document.querySelector(".listofgrps");
let searchinp=document.querySelector('#searchinp');
let addtogroup=document.querySelector('#addtogroup');
let personemail=document.querySelector('#personemail');
let adminvalue=document.querySelector('#adminvalue');
let groupmessages=document.querySelector('.groupmessages');
let sendmessage=document.querySelector('.sendmsg');
let inptxt=document.querySelector('#inptext');
let groupparticipants=document.querySelector('.grpparticipants');
let pangrpname = document.querySelector("#grpname");
let signout = document.querySelector("#signoutgrp");

let nam = "";
axios
  .get("http://localhost:5555/user", {
    headers: { authorization: token },
  })
  .then((result) => {
    console.log(result);
    nam += result.data[0].name;
    console.log(nam);
  })
  .catch((err) => {
    console.log(err);
  });



function grps() {
  axios
    .get("http://localhost:5555/getallgroups", {
      headers: { authorization: token },
    })
    .then((result) => {
      let gt = "";
      if (result.data.length == 0) {
        listofgrps.innerHTML = "you are not part of any group! ";
      } else {
        for (let i = 0; i < result.data.length; i++) {
          gt += `
    <div style="border-bottom:1px solid black; padding:6px;">
    <a style="color:blue; text-decoration:none;" href="groupchat.html?g=${result.data[i].groupId}">${result.data[i].groupname}</a>
    </div>
    `;
        }
        listofgrps.innerHTML = gt;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

grps();



searchinp.addEventListener('keyup',(e)=>{

    if(e.key=='Enter'){
    let val=searchinp.value;

    window.find(val);
    }
});


addtogroup.addEventListener('click',()=>{

 let id= location.href.split("g=")[1];

 let obj={
  mail:personemail.value,
  admin:adminvalue.value
 }

 axios.post(`http://localhost:5555/addparticipants/${id}`, obj, {
   headers: { authorization: token },
 }).then(result=>{

  alert(result.data);
  personemail.value="";
  location.reload();
 })
 .catch(err=>{
  console.log(err);
 })
  
});

sendmessage.addEventListener('click',()=>{
 let id = location.href.split("g=")[1];

  let inptxtvalue=inptxt.value;
  let obj={
msg:inptxtvalue
  }

  axios
    .post(`http://localhost:5555/postgroupmsgs/${id}`, obj, {
      headers: { authorization: token },
    })
    .then((result) => {
      console.log(result);
      inptxt.value="";
    })
    .catch((err) => {
      console.log(err);
    });
})


setInterval(() => {
   let id = location.href.split("g=")[1];

  axios.get(`http://localhost:5555/getgrpmsgs/${id}`, {
    headers: { authorization: token }
  }).then(result=>{
    let klu="";
    for(let i=0;i<result.data.length;i++){
if (result.data[i].username == nam) {
  klu += `
            <div class="p-2 indimsg " style="background:black;border-bottom:1px dotted snow; color:snow; border-radius:3px; ">
            <span style="margin-left:30%;" >you : 
        </span>
            <span>${result.data[i].message}</span>
            </div>
            `;
} else {
  klu += `
            <div class="p-2 indimsg " style="background:rgb(8, 87,87); color:snow; border-bottom:1px solid white; border-radius:3px; ">
            <span  >${result.data[i].username} : 
        </span>
            <span>${result.data[i].message}</span>
            </div>
            `;
}
      
    }
    groupmessages.innerHTML=klu;
  })
  .catch(err=>{
    console.log(err);
  })
  
}, 700);


document.addEventListener('DOMContentLoaded',()=>{
   let id = location.href.split("g=")[1];


  axios.get(`http://localhost:5555/grpparticipants/${id}`, {
    headers: { authorization: token },
  }).then(result=>{
    let listpar="";
    console.log(result.data[0].name);

    for(let i=0;i<result.data.length;i++){

      
     let nameusershort=result.data[i].name.split(" ")[0];
      if(result.data[i].admin==true){
listpar += `
    <div style="border-bottom:1px solid black; padding:6px; display:flex;">
    <h6 style="color:blue; text-decoration:none;">${nameusershort}</h6>
   <h6 style="color:green; margin-left:17px;">group admin</h6>
    </div>
`;

      }
      else{
        listpar += `
    <div style="border-bottom:1px solid black; padding:6px; display:flex;">
    <h6 style="color:blue; text-decoration:none;">${nameusershort}</h6>
    <button style="border:none;background-color:green;color:white;padding:4px; border-radius:5px; margin-left:10px;" class=" makeadmin" id="${result.data[i].userId}">make admin</button>
       <button style="border:none;background-color:red;color:white; padding:3px; border-radius:5px; margin-left:8px;" class="rempeople" id="${result.data[i].userId}">remove</button>

    </div>
`;
      }
    }

    groupparticipants.innerHTML=listpar;
    })
  .catch(err=>{
    console.log(err);
  })
});


function grpdat(){
     let id = location.href.split("g=")[1];

  axios.get(`http://localhost:5555/getgrpname/${id}`, {
    headers: { authorization: token },
  }).then(result=>{
   pangrpname.innerHTML= result.data.groupname;

  })
  .catch(err=>{
    console.log(err);
  })
}
grpdat();


groupparticipants.addEventListener('click',(e)=>{
     let id = location.href.split("g=")[1];


  if(e.target.classList.contains('makeadmin')){

    let idd=e.target.id;
    let obj={
      useridupdate:idd
    }

    axios.post(`http://localhost:5555/makeuseradmin/${id}`, obj, {
      headers: { authorization: token },
    }).then(result=>{
alert(result.data);
location.reload();
    })
    .catch(err=>{
      console.log(err);
    })
  }

    if (e.target.classList.contains("rempeople")) {
      let iddd = e.target.id;
      let obj = {
        useriddel: iddd,
      };

      axios
        .post(`http://localhost:5555/removepart/${id}`, obj, {
          headers: { authorization: token },
        })
        .then((result) => {
          alert(result.data);
          location.reload();
        })
        .catch((err) => {
          console.log(err.data);
        });
    }



});

signout.addEventListener("click", () => {
  localStorage.clear();
  location.replace("../login/login.html");
});