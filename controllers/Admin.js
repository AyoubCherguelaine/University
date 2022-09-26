
const Auth = require('./authentication');


const GetLogin= (req,res)=>{
    if(req.session.logined){
        res.send("stop");
    }else{
        res.render('Admin/login');
    }
   
}
const PostLogin= (req,res)=>{
   
       
    if(res.session.logined){

        res.send("stop ur stupidity");
        console.log("you have already logined /n(there is session deja kho)")

    }else{

   

    let body = req.body;

    db.CheckAdmin(body,(err,Result)=>{

        if(err){
            console.log("err post Login");
            console.log(err);
            res.send('there is probl;em')
        }else{
                //{idAdmin,roll,logined}
                req.session.idAdmin = Result.idAdmin;
                req.session.idAdminSystem =Result.idAdminSystem;
                req.session.name = Result.name;
                req.session.roll= Result.name; 
                req.session.logined = "value";
                   
            switch(Result.roll){
                case "System":
                    res.redirect()   //     
                break;
                case "University" : 
                res.redirect() 
                break;
                case "Faculty":
                    res.redirect() 
                break;
                default:console.log("no !!! ");
            }

        }

    })
    }
    
}

const GetCreateAdmin = (req,res)=>{
    //check session that is Admin System

    res.render('Admin/AddAdmin');
}

const PostCreateAdmin = (req,res)=>{

    /*

    */ 
    Auth.Roll(req,(err,user)=>{
        if(err){
            res.send('there is problem ');
            console.log(err);
        }else{
            if(user.hasOwnProperty('noSession')){
                //block ip
                // tyahllo
            }else{
                if(user.hasOwnProperty('idAdmin') && user.hasOwnProperty('roll') && user.roll=='Sys'){
                    // this man is real 
                    

                }else{
                    req.session={};
                    res.send('go stupid man ');

                }
            }
        }
    })

    console.log(req.body);
}

module.exports = {
    GetLogin,
    PostLogin,
    GetCreateAdmin,
    PostCreateAdmin
}