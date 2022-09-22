const db = require('./DB/MySqlConnection');
/**
 * define function check from db:
 * 
 *  Admin (System,University,Faculty)
 * 
 *  Professor        
 * 
 *  Student
 */

/**
 * admin auth{name,password,trash } 
 * Professor auth{matricule,password,use}
 * Student auth{matricule,password,way}
 */
 
const CheckAdmin = (auth,callback)=>{

    if(auth.hasOwnProperty('name') && auth.hasOwnProperty('password') && auth.hasOwnProperty('trash') ){
        // it's okey

        let q = "";
        q+= "select * from Admin where name='"+auth.name+"' and password='"+auth.password+"' ;";

        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
         
            if(Result.length == 1 ){
                row = Result[0];
                idAdmin= row.idAdmin;
                let q1 = "select idAdminSystem from AdminSystem where idAdmin="+idAdmin+";";
                db.query(q1,(Err,ResultSys)=>{
                    if(Err)throw Err;
                   
                    if(ResultSys.length == 1){
                        //valide that this admin is System Administarator
                        idAdminSystem = ResultSys[0].idAdminSystem;
                            user={
                                idAdmin:idAdmin,
                                idAdminSystem:idAdminSystem,
                                name:row.name,
                                roll:"System"
                            }
                            
                            callback(null,user);
                    }else{
                        // he is not a system admin 
                        let q2 = "select idAdminUniversity from AdminUniversity where idAdmin="+idAdmin+" ;";
                        db.query(q2,(Err,ResultU)=>{
                            if(Err) throw Err;
                            if(ResultU.length ==1){
                                idAdminUniversity=ResultU[0].idAdminUniversity;
                                user={
                                    idAdmin:idAdmin,
                                    idAdminUniversity:idAdminUniversity,
                                    name:row.name,
                                    roll:"University"
                                }
                                callback(null,user);
                            }else{
                                // is not univ admin
                                let q3 = "select idAdminFaculty from AdminFaculty where idAdmin="+ idAdmin+" ;"
                                db.query(q3,(Err,ResultF)=>{
                                    if(Err)throw Err;
                                        if(ResultF.length==1){
                                            idAdminFaculty=ResultF[0].idAdminFaculty;
                                            user={
                                                idAdmin:idAdmin,
                                                idAdminFaculty:idAdminFaculty,
                                                name:row.name,
                                                roll:"Faculty"
                                            }
                                            callback(null,user);
                                        }else{
                                            let user = null;
                                            callback(null,user);
                                            console.log("chkopii marakch  dayro f tables ta3 admin ,,, ")
                                        }

                                })
                            }
                        })
                    }
                })
            }else{
                let user = null;
              
                callback("Error ther is no fucking admin with this fucking pass",user)
            }
        })


    }else{
        Err="stop this shit";
        user = null;
        callback(Err,user)
    }


}

const CheckProfessor = (auth,callback)=>{
    if(auth.hasOwnProperty('matricule') && auth.hasOwnProperty('password') && auth.hasOwnProperty("use")){

        let q = "select * from Prodessor where matricule='"+auth.matricule+"' and password='"+auth.password+"' ;";

        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            if(Result.length ==1){
                row = Result[0];
                let user={
                    Firstname:row.firstname,
                    idProfessor:row.idProfessor,
                    Lastname:row.lastname,
                    Matricule:row.matricule,
                }
                callback(null,user);
            }else{

                let user = null;
                callback(null,user)
            }
        });

    }else{
        Err=" package rah ghlet"
        callback(Err,null);
    }
}

const CheckStudent =(auth,callback)=>{

    if(auth.hasOwnProperty("matricule") && auth.hasOwnProperty("password") && auth.hasOwnProperty("way") ){

        let q = "select * from Student where matricule='"+auth.matricule+"' and password='"+auth.password+"' ;"

        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            if(Result.length ==1){
                let row=Result[0];
                let user={
                    idStudent:row.idStudent,
                    Firstname:row.firstname,
                    Lastname:row.lastname,
                    matricule:row.matricule
                }
                callback(null,user)
            }else{
                let user = null;
                callback(null,user)
            }
        })
    }else{
        Err=" package rah ghlet ";
        callback(Err,null);
    }

}





const AddSystemAdmin = (idAdmin,callback)=>{

    let q = "insert into AdminSystem(idAdmin) values ("+idAdmin+");";

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result.insertId)
    })


}


const AddUniversityAdmin = (idAdmin,callback)=>{

    let q = "insert into AdminUniversity(idAdmin) values ("+idAdmin+");";

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result.insertId)
    })


}

const AddFacultyAdmin = (idAdmin,callback)=>{

    let q = "insert into AdminFaculty(idAdmin) values ("+idAdmin+");";

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result.insertId)
    })


}

const AddAdmin=(pack,callback)=>{
    if(pack.hasOwnProperty("name") && pack.hasOwnProperty("password") && pack.hasOwnProperty("roll")){
        let q= "insert into Admin(name,password) values('"+pack.name+"','"+pack.password+"');";

        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            idAdmin= Result.insertId
           
            switch(pack.roll){
                case "System": AddSystemAdmin(idAdmin,(idAdminSystem)=>{
                    callback({idAdmin:idAdmin,idAdminSystem:idAdminSystem,name:pack.name,roll:pack.roll});
                }) ;break;
                case "University": AddUniversityAdmin(idAdmin,(idAdminUniversity)=>{
                    callback({idAdmin:idAdmin,idAdminUniversity:idAdminUniversity,name:pack.name,roll:pack.roll});
                }) ;break;
                case "Faculty": AddFacultyAdmin(idAdmin,(idAdminFaculty)=>{
                    callback({idAdmin:idAdmin,idAdminFaculty:idAdminFaculty,name:pack.name,roll:pack.roll});

                }) ;break;
                default : console.log("no Roll is true stop this shit man ! \n")
            }
        });

    }else{
        console.log("stupid \npackage is not completed !") 
        // try to stop ip iddress
    }
}




module.exports= {
    CheckAdmin,
    CheckProfessor,
    CheckStudent,
    AddAdmin};

