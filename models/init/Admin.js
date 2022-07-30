
const db = require("../DB/MySqlConnection")


/**
 * ---- Admin(idAdmin,password,name)
 * 
 * 
 */

const CreateAdmin= (callback)=>{
    let q= " create table Admin(idAdmin int primary key auto_increment , name varchar(30) unique,password text)";

    db.query(q,(Err,Result)=>{

        if(Err) throw Err;
        callback();
    });
}

const CreateAdminSystem= (callback)=>{
    let q = "create table AdminSystem(idAdminSystem int primary key auto_increment,idAdmin int,";
    q+="constraint FK_AdminSystem_Admin foreign key (idAdmin) references Admin(idAdmin))";
    db.query(q,(Err,Result)=>{

        if(Err) throw Err;
        callback();
    });

}

const CreateAdminUniversity=(callback)=>{
    let q = "create table AdminUniversity(idAdminUniversity int primary key auto_increment,idAdmin int ,";
    q+="constraint FK_AdminUniversity_Admin foreign key (idAdmin) references Admin(idAdmin))";
    db.query(q,(Err,Result)=>{

        if(Err) throw Err;
        callback();
    });
}

const CreateAdminFaculty=(callback)=>{
    //FOREIGN KEY 
    let q = "create table AdminFaculty(idAdminFaculty int primary key auto_increment,idAdmin int ,";
    q+="constraint FK_AdminFaculty_Admin foreign key (idAdmin) references Admin(idAdmin))";
    db.query(q,(Err,Result)=>{

        if(Err) throw Err;
        callback();
    });
}


const createModel = (callback)=>{
    console.log("\n\nAdmin Model : Create Tables\n\n");
    CreateAdmin((ResultA)=>{
        console.log("Admin.Admin has been created ! \n");
        CreateAdminSystem((ResAS)=>{
            console.log("Admin.AdminSystem has been created ! \n");
            CreateAdminUniversity((ResU)=>{
                console.log("Admin.AdminUniversity has been created ! \n");
                CreateAdminFaculty((ResF)=>{
                    console.log("Admin.AdminFaculty has been created ! \n\n Admin Model is Done ...\n\n\n\n");

                    callback();
                })
            })
        })
    })
}

module.exports=createModel;