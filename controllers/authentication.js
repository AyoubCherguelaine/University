
/**
 * define session type for all user: 
 * 
 *      admin :     {idAdmin,roll,logined}
 *              System :        roll="Sys"
 *              University :    roll="Univ"
 *              Faculty :       roll="Fac"
 * 
 *  
 * 
 *      Professor : {idProfessor,firstname,lastname,logined}
 *      
 * 
 *      Student :   {idStudent,firstname,lastname,logined} 
 */


const auth = require('../models/authentication');
const db = require('../models/authentication');
const GetIp = (req)=>{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip;
}


function Roll(req, callback) {
    if (req.hasOwnProperty('session')) {

        let b = {
            noSession: "true"
        };
        callback(null, b);

    } else {
        let session = req.session;
        if (session.hasOwnProperty('idAdmin')) {
            switch (session.roll) {
                case "Sys": callback(null, { idAdmin: session.idAdmin, roll: "Sys" }); break;
                case "Univ": callback(null, { idAdmin: session.idAdmin, roll: "Univ" }); break;
                case "Fac": callback(null, { idAdmin: session.idAdmin, roll: "Fac" }); break;
                default: callback('this fake admin', null);
            }
        } else {


            if (session.hasOwnProperty('idProfessor')) {

                if (session.hasOwnProperty('firstname') && session.hasOwnProperty("lastname")) {
                    let obj = {
                        idProfessor: session.idProfessor,
                        firstname: session.firstname,
                        lastname: session.lastname
                    };
                    callback(null, obj);
                } else {
                    callback("fake Professor", null);
                }

            } else {
                if (session.hasOwnProperty('idStudent')) {
                    if (session.hasOwnProperty('firstname') && session.hasOwnProperty("lastname")) {
                        let obj = {
                            idStudent: session.idStudent,
                            firstname: session.firstname,
                            lastname: session.lastname
                        };
                        callback(null, obj);
                    } else {
                        callback("fake Student", null);
                    }
                }
            }

        }
    }

}

const CheckAdminAuth = (req,callback)=>{
    auth.CheckAdmin(req.body,(err,user)=>{
        callback(err,user)
    })
}

const CheckProfessorAuth = (req,callback)=>{
    auth.CheckProfessor(req.body,(err,user)=>{
        callback(err,user)
    })
}

const CheckStudentAuth = (req,callback)=>{
    auth.CheckStudent(req.body,(err,user)=>{
        callback(err,user)
    })
}

const GetLoginAdmin = (req,res)=>{



}

const LoginAdmin = (req,res)=>{

    if(res.session.logined){

        res.send("stop ur stupidity");
        console.log("you have already logined /n(there is session deja kho)")

    }else{

   

    let body = req.body;

    db.CheckAdmin(body,(err,Result)=>{

        if(err){
            console.log("err post Login");
            console.log("err");
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



const AddAdmin = (req,res)=>{
    let  body = req.body;

    let pack= {
        name:body.name,
        password:body.password,
        roll:body.roll
    }

    db.AddAdmin(pack,(p)=>{
        // pack 

        // idAdminSystem
        // idAdminUniversity
        // { idAdmin:idAdmin,idAdminFaculty:idAdminFaculty,
        // name:pack.name,roll:pack.roll }
        p.password = pack.password;
        p.trash = "value";
        req.body = p;
        
        LoginAdmin(req,res);

        

    })

}

module.exports = {
    Roll,
    GetIp,
    CheckAdminAuth,
    CheckProfessorAuth,
    CheckStudentAuth,
    LoginAdmin,
    AddAdmin,
    GetLoginAdmin
}
