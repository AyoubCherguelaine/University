
const db = require("../DB/MySqlConnection")


/* 

---- Semestre(idSemestre,name,numbre,idStudyYear,Mark)

---- Unity(idUnity,name,idSemestre,mark)

---- Module(idModules,name,idProfessor,Coef,Credit,idUnity)

---- ModuleDetail(idModuleDetail,session,Exam not null,td,idModule)

---- 

*/

const createRelvet = (callback)=>{
    let q = "create table Relvet(idRelvet int primary key auto_increment,date date,idStudent int,Archived bool,";
    q+="constraint FK_Relvet_Student foreign key (idStudent) references Student(idStudent))"
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}

const createSemestre= (callback)=>{
    
    let q = "create table Semestre(idSemestre int primary key auto_increment ,idRelvet int ,idTypeSemestre int,Mark double,Archived bool,";
    q+="constraint FK_Semestre_TypeSemestre foreign key (idTypeSemestre) references TypeSemestre(idTypeSemestre)";
    q+="constraint FK_Semestre_Relvet foreign key (idRelvet) references Relvet(idRelvet))"

    
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}

const createUnity= (callback)=>{
    
    let q = "create table Unity(idUnity int primary key auto_increment ,Mark double,idSemestre int ,idTypeUnity int,Archived bool,";
    q+="constraint FK_Unity_Semestre foreign key (idSemestre) references Semestre(idSemestre)"
    q+="constraint FK_Unity_TypeUnity foreign key (idTypeUnity) references TypeUnity(idTypeUnity))"
    
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}


const createModule= (callback)=>{
    
    let q = "create table Module(idModule int primary key auto_increment ,Valide int default 1,Mark double,idUnity int ,idSession int default 1, idTypeModule int,Archived bool deafult 0,";
    q+= "constraint FK_Module_Unity foreign key (idUnity) references Unity(idUnity),"
    q+= "constraint FK_Module_TypeModule foreign key (idTypeModule) references TypeModule(idTypeModule),"
    q+= "constraint FK_Module_Session foreign key (idSession) references Session(idSession),"
    
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}


const CreateModel = (callback)=>{
    console.log("\n\Relvet Model : Create Tables\n\n")

    createRelvet((ResRl)=>{
        console.log("Relvet.Relvet has been created ! \n");
    
    createSemestre((ResultS)=>{
        console.log("Relvet.Semestre has been created ! \n");
        createUnity((ResultU)=>{
            console.log("Relvet.Unity has been created ! \n");
            createModule((ResultM)=>{
                console.log("Relvet.Module has been created ! \n\n Scholar Model is Done ...\n\n\n\n");
                    callback();
            })
        })
    })
})
}


module.exports = CreateModel;