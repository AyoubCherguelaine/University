
const db = require("../DB/MySqlConnection")

/*

---- les relvies year/semester/unity/module(coef,mark)


---- note display year/semester/unity/module(coef,mark)

---- les dettes

---- student  (nom,prenom,mat,pass,annee bac, university/faculte/departement/ speciality/studyYear)

---- ScholarStudent(idScholar,idStudent,StudyYear,ScholarYear)



*/



// create table of student



const createStudent = (callback)=>{

    let q = "create table Student(idStudent int primary key auto_increment , firstname text, lastname text , matricule text,bac_year int ,password text,Archived bool default 0)"

    
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });

}


const createScholarStudent = (callback)=>{
    //idStudyYear

    let q = "create table ScholarStudent(idScholarStudent int primary key auto_increment , idStudent int,idStudyYear int ,FinalResult boolean, Mark double,ScholarYear text, session int";
    q+=",constraint FK_ScholarStudent_Student foreign key (idStudent) references Student(idStudent),"
    q+="constraint FK_ScholarStudent_StudyYear foreign key (idStudyYear) references StudyYear(idStudyYear))"

    
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}


const createModel = (callback)=>{
    console.log("\n\nStudent Model : Create Tables\n\n");
    createStudent((Result)=>{
        console.log("Student.Student has been created ! \n");
        createScholarStudent((ResultSS)=>{
            console.log("Student.ScholarStudent has been created ! \n\n Student Model is Done ...\n\n\n\n");
            callback()
        })
    })

}

module.exports =createModel