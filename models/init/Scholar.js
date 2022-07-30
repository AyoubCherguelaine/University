const db = require("../DB/MySqlConnection")

/*

---- Wilaya (idWilaya, wilayanom)
---- University (idUniversity,nom,#idWilaya)
---- Faculty(idFaculty,nom,#idUniversity)
---- Departement(idDepartement,nom,#idFaculty)
---- Speciality(idSpeciality,nom,#idDepartement)
---- StudyYear(idStudyYear,name,#idSpeciality)
---- Session (idSession,name)

*/


const createWilaya = (callback)=>{
    let q = "create table Wilaya(idWilaya int primary key auto_increment , name varchar(300) unique,Archived int default 0);"

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}


const createUniversity = (callback)=>{
    let q = "create table University(idUniversity int  primary key auto_increment , name varchar(300) unique,idWilaya int ,Archived int default 0, constraint FK_University_Wilaya foreign key (idWilaya) references Wilaya(idWilaya) );"

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}


const createFaculty = (callback)=>{
    let q = "create table Faculty(idFaculty int  primary key auto_increment , name text,idUniversity int ,Archived int default 0, constraint FK_Faculty_University foreign key (idUniversity) references University(idUniversity) );"

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}



const createDepartement = (callback)=>{
    let q = "create table Departement(idDepartement int  primary key auto_increment , name text,idFaculty int ,Archived int default 0 ,constraint FK_Departement_Faculty foreign key (idFaculty) references Faculty(idFaculty) );"

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}



const createSpeciality = (callback)=>{
    let q = "create table Speciality(idSpeciality int  primary key auto_increment , name text,idDepartement int ,Archived int default 0,constraint FK_Speciality_Departement foreign key (idDepartement) references Departement(idDepartement) );"

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}


const createStudyYear = (callback)=>{
    let q = "create table StudyYear(idStudyYear int  primary key auto_increment , name text,idSpeciality int ,Archived int default 0,constraint FK_StudyYear_Speciality foreign key (idSpeciality) references Speciality(idSpeciality) );"

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}

const createSession = (callback)=>{

    let q = "create table Session( idSession int primary key auto_increment auto_increment , name ENUM('session normal','session 2','session 3'));"

    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}


const CreatModel = (callback)=>{
    console.log("\n\nScolar Model : Create Tables\n\n")
    createWilaya((ResultW)=>{
        console.log("Scholar.Wilaya has been created ! \n");
        createUniversity((ResultU)=>{
            console.log("Scholar.University has been created ! \n");
            createFaculty((ResultF)=>{
                console.log("Scholar.Faculty has been created ! \n");
                createDepartement((ResultD)=>{
                    console.log("Scholar.Departement has been created ! \n");
                    createSpeciality((ResultS)=>{
                        console.log("Scholar.Speciality has been created ! \n");
                        createStudyYear((ResultSY)=>{
                            console.log("Scholar.StudyYear has been created ! \n");
                            createSession((ResultS)=>{
                                console.log("Scholar.Session has been created ! \n\n Scholar Model is Done ...\n\n\n\n");

                                callback();
                            })
                            
                        })

                    })

                })
            })
        })
    })


}



module.exports = CreatModel;
