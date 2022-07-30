
const db = require("../DB/MySqlConnection")



const createTypeSemestre = (callback)=>{
    let q = "create table TypeSemestre(idTypeSemestre int primary key auto_increment ,name text,number int,idStudyYear int ,Archived bool default 0,";
    q+="constraint FK_TypeSemestre_StudyYear foreign key (idStudyYear) references StudyYear(idStudyYear))";
     
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}

const createTypeUnity= (callback)=>{
    
    let q = "create table TypeUnity(idTypeUnity int primary key auto_increment ,name text,idTypeSemestre int ,";
    q+="constraint FK_TypeUnity_TypeSemestre foreign key (idTypeSemestre) references TypeSemestre(idTypeSemestre))"

    
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}



const createTypeModule= (callback)=>{
    
    let q = "create table TypeModule(idTypeModule int primary key auto_increment ,name text,Coef int,Credit int,idProfessor int,idTypeUnity int , ";
    q+= "constraint FK_TypeModule_TypeUnity foreign key (idTypeUnity) references TypeUnity(idTypeUnity))"

    
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;

        callback(Result);
    });
}



const CreateModel = (callback)=>{
    console.log("\n\Prototype Model : Create Tables\n\n")

    createTypeSemestre((ResultS)=>{
        console.log("Prototype.TypeSemestre has been created ! \n");
        createTypeUnity((ResultU)=>{
            console.log("Prototype.TypeUnity has been created ! \n");
            createTypeModule((ResultM)=>{
                console.log("Prototype.TypeModule has been created ! \n\n Scholar Model is Done ...\n\n\n\n");
                    callback();
            })
        })
    })

}


module.exports = CreateModel;