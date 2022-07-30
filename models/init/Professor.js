
const db = require("../DB/MySqlConnection")


/*

----  Faculty( idFaculty)
----- professor (fname,l name, matricule, password,idDepartement)

*/


const createProfessor = (callback)=>{

    let q = "create table Professor(idProfessor int primary key auto_increment , firstname text, lastname text , matricule text , password text , idFaculty int,Archived bool default 0";
    q+= ", constraint FK_Professor_Faculty foreign key (idFaculty) references Faculty(idFaculty))";
    
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });

}


const createModel= (callback)=>{
    console.log("\n\nProfessor Model : Create Tables\n\n");
    
    createProfessor((ResultSS)=>{
            console.log("Professor.Professor has been created ! \n\n Professor Model is Done ...\n\n\n\n");
            callback()
        })


}

module.exports =createModel