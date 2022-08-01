
let txt=document.querySelector('#inptext');
let sendmsg=document.querySelector('.sendmsg');
let allmsgs=document.querySelector('.messages');
let token=localStorage.getItem('token');
let nam='';
axios.get('http://localhost:5555/user',{
      headers: { authorization: token },
    })
    .then(result=>{
        nam+=result.data[0].name;
        console.log(nam);
    })



sendmsg.addEventListener('click',(e)=>{
    let token=localStorage.getItem('token');

    let msg=txt.value;

    let obj={
        message:msg
    }
    axios.post("http://localhost:5555/chatmessage", obj, {
      headers: { authorization: token },
    }).then(result=>{
        console.log(result);
        txt.value="";
    })
    .catch(err=>{
        console.log(err);
    })
})

   setInterval(() => {
    axios
      .get("http://localhost:5555/getmessages", {
        headers: { authorization: token },
      })
      .then((result) => {
        let res = "";

        for (let i = 0; i < result.data.result.length; i++) {
            console.log(result.data.result[i].username == nam);
            if(result.data.result[i].username==nam){
res += `
            <div class="p-2 indimsg " style="background:rgb(40,27, 31);border-bottom:1px dotted snow; color:lightgray; ">
            <span style="margin-left:30%;" >you : 
        </span>
            <span>${result.data.result[i].msg}</span>
            </div>
            `;
        }
            else{
          res += `
            <div class="p-2 indimsg " style="background:rgb(8, 87,87); color:white; border-bottom:1px solid yellow; ">
            <span  >${result.data.result[i].username} : 
        </span>
            <span>${result.data.result[i].msg}</span>
            </div>
            `;
        }
    }
        allmsgs.innerHTML = res;
      })
      .catch((err) => {
        console.log(err);
      });

   },800); 



