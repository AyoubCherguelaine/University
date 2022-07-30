
//Admin
//scholar ->Profesor
//Profesor,Scholar -> Relvet,Semestre,
//Relvet->Student

const db = require('../DB/DB');



const dropDatabase = (callback)=>{
    db.query("drop database  IF EXISTS University",(Err,Result)=>{
        if(Err) throw Err;
        callback();
    })
}

const createDatabase = (callback)=>{


console.log("create database mysql  : ");


    db.query("create database  IF NOT EXISTS University",(Err,Result)=>{
        if(Err) throw Err;
        callback();
    })
}


const CreateTable= (callback)=>{
  
    const Scholar = require("./Scholar");
    const Student = require("./Student");
    const Professor = require("./Professor");
    const Relvet = require("./Relvet");
    const Prototype = require("./Prototype");
    const Admin = require("./Admin");

//auto_increment


    Admin(()=>{
        Scholar(()=>{
            Professor(()=>{
                Student(()=>{
                    Prototype(()=>{
                        
                        Relvet(()=>{
                            console.log("\n\n\n create database is done !")
                            callback();
                        })
    
                    })
                })
            })
        });
    
    });
    
}

dropDatabase(()=>{


createDatabase(()=>{
    CreateTable(()=>{
        process.exitCode = 0;
    })
})

})

