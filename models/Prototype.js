
const db = require("./DB/MySqlConnection")


const ArchivedTable=(Table,pack,callback)=>{
    if(pack.hasOwnProperty('id')){

        let q = "update "+Table+" set Archived=1  where id"+Table+" = "+pack.id+" ;";
       
        console.log(q)
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })

    }else{
        callback("id requirement !" , null)
    }
}


const DesarchivedTable = (Table,pack,callback)=>{
    if(pack.hasOwnProperty('id')){

        let q = "update "+Table+" set Archived="+0+" where id"+Table+" = "+pack.id+" ;";
       
        console.log(q)
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })

    }else{
        callback("id requirement !" , null)
    } 
}

const AddTypeSemestre =(pack,callback)=>{
    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('numbre') && pack.hasOwnProperty('idStudyYear') ){
        let q = "insert into TypeSemestre(name,number,idStudyYear) values";
         q += "('"+pack.name+"',"+pack.number+","+pack.idStudyYear+");"

         db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            id= Result.insertId;
            GetTypeSemestre({idTypeSemestre:id},(Err,Result)=>{
                callback(Err,Result);
            })
         })
    }else{
        callback("package is not completed !",null);
    }
}

const ModifyTypeSemestre = (pack,callback)=>{
    let md = "update TypeSemestre set "; 
    let and=false
    if(pack.hasOwnProperty('name')){
        let q1 = " name = '"+pack.name+"' ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }

    if(pack.hasOwnProperty('number')){
        let q1 = " number = "+pack.number+" ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }
    if(pack.hasOwnProperty('idStudyYear')){
        let q1 = " idStudyYear = "+pack.idStudyYear+" ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }
   

    if(and && pack.hasOwnProperty('idTypeSemestre')){
        md+=" where idTypeSemestre="+pack.idTypeSemestre;
        db.query(md,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })
    }else{
        callback("there no item to update",null)
    }

}



const ArchivedTypeSemestre =(pack,callback)=>{
    if(pack.hasOwnProperty('idTypeSemestre')){
        ArchivedTable('TypeSemestre',{id:pack.idTypeSemestre},(Err,Result)=>{
            callback(Err,Result);
        })
    }else{
        callback("no id for typeSemestre",null)
    }
}


const DesArchivedTypeSemestre =(pack,callback)=>{
    if(pack.hasOwnProperty('idTypeSemestre')){
        DesarchivedTable("TypeSemestre",{id:pack.idTypeSemestre},(Err,Result)=>{
            callback(Err,Result);
        })
    }else{
        callback("no id for typeSemestre",null)
    }
}

const GetTypeSemestre = (pack,callback)=>{
    if(pack.hasOwnProperty('idTypeSemestre')){
        let q= "select idTypeSemestre,ST.name as TypeSemestre,number,SY.idStudyYear,SY.name as StudyYear,S.idSpeciality,S.name as Speciality from TypeSemestre TS join StudyYear SY join Speciality S on S.idSpeciality=SY.idSpeciality and SY.idStudyYear=ST.idStudyYear and idTypeSemestre = "+ pack.idTypeSemestre+" ";
        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            callback(null,Result);
        })
    }else{
        callback("no idTypeSemestre !",null)
    }
}

const SearchMultiTypeSemestre = (pack,callback)=>{
    let Arch = "and Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }


    let q= "select idTypeSemestre,ST.name as TypeSemestre,number,SY.idStudyYear,SY.name as StudyYear,S.idSpeciality,S.name as Speciality from TypeSemestre TS join StudyYear SY join Speciality S join Departement D on D.idDepartement =S.Departement and  S.idSpeciality=SY.idSpeciality and SY.idStudyYear=ST.idStudyYear "+Arch;


    if(pack.hasOwnProperty('Departement')){
        let q1 = " and D.name like '%"+pack.Departement+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('idDepartement')){
        let q1 = " and D.idDepartement ="+pack.idDepartement+" " 
        q+=q1;
    }

    if(pack.hasOwnProperty('Speciality')){
        let q1 = " and S.name like '%"+pack.Speciality+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('idSpeciality')){
        let q1 = " and S.idSpeciality ="+pack.idSpeciality+" " 
        q+=q1;
    }
    if(pack.hasOwnProperty('StudyYear')){
        let q1 = " and SY.name like '%"+pack.StudyYear+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('idStudyYear')){
        let q1 = " and SY.idStudyYear ="+pack.idStudyYear+" " 
        q+=q1;
    }

    if(pack.hasOwnProperty('TypeSemestre')){
        let q1 = " and ST.name like '%"+pack.TypeSemestre+"%' "
        q+=q1;
    }

    db.query(q,(Err,Res)=>{
        if(Err) throw Err;
        callback(Res);
    })
}



const AddTypeUnity = (pack,callback)=>{
    if(pack.hasOwnProperty('name') && pack.hasOwnProperty("idTypeSemestre")){
        let q="insert into TypeUnity(name,idTypeSemestre) values";
        q+="('"+pack.name+"',"+pack.idTypeSemestre+");";
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            id = Result.insertId;
            // get
            GetTypeUnity({idTypeUnity:id},(Err,Result)=>{
                callback(Err,Result);
            })
        })
    }else{
        callback("package is note completed Type Unity")
    }
}

const GetTypeUnity = (pack,callback)=>{
    if(pack.hasOwnProperty('idTypeUnity')){
        let q= "select TU.idTypeUnity,TU.name as TypeUnity, TS.idTypeSemestre,ST.name as TypeSemestre,number,SY.idStudyYear,SY.name as StudyYear,S.idSpeciality,S.name as Speciality from TypeUnity TU join TypeSemestre TS join StudyYear SY join Speciality S join Departement D on TU.idTypeSemestre=TS.idTypeSemestre and D.idDepartement =S.Departement and  S.idSpeciality=SY.idSpeciality and SY.idStudyYear=ST.idStudyYear "+Arch +" and TU.idTypeUnity="+pack.idTypeUnity;

        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            callback(null,Result);
        })
    }else{
        callback("no id TypeUnity !")
    }
}


const ModifyTypeUnity = (pack,callback)=>{
    let md = "update TypeUnity set "; 
    let and=false
    if(pack.hasOwnProperty('name')){
        let q1 = " name = '"+pack.name+"' ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }

    if(pack.hasOwnProperty('idTypeSemestre')){
        let q1 = " idTypeSemestre = "+pack.idTypeSemestre+" ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }


    if(and && pack.hasOwnProperty('idTypeUnity')){
        md+=" where idTypeUnity="+pack.idTypeUnity;
        db.query(md,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })
    }else{
        callback("there no item to update",null)
    }
}


const ArchivedTypeUnity = (pack,callback)=>{
    if(pack.hasOwnProperty('idTypeUnity')){
        ArchivedTable('TypeUnity',{id:pack.idTypeUnity},(Err,Result)=>{
            callback(Err,Result);
        })
    }else{
        callback("no id for TypeUnity",null)
    }
}



const DesArchivedTypeUnity =(pack,callback)=>{
    if(pack.hasOwnProperty('idTypeUnity')){
        DesarchivedTable("TypeUnity",{id:pack.idTypeUnity},(Err,Result)=>{
            callback(Err,Result);
        })
    }else{
        callback("no id for TypeUnity",null)
    }
}


const SearchMultiTypeUnity = (pack,callback)=>{
    let Arch = "and Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }


    let q= "select TU.idTypeUnity,TU.name as TypeUnity, TS.idTypeSemestre,ST.name as TypeSemestre,number,SY.idStudyYear,SY.name as StudyYear,S.idSpeciality,S.name as Speciality from TypeUnity TU join TypeSemestre TS join StudyYear SY join Speciality S join Departement D on TU.idTypeSemestre=TS.idTypeSemestre and D.idDepartement =S.Departement and  S.idSpeciality=SY.idSpeciality and SY.idStudyYear=ST.idStudyYear "+Arch;


    if(pack.hasOwnProperty('Departement')){
        let q1 = " and D.name like '%"+pack.Departement+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('idDepartement')){
        let q1 = " and D.idDepartement ="+pack.idDepartement+" " 
        q+=q1;
    }

    if(pack.hasOwnProperty('Speciality')){
        let q1 = " and S.name like '%"+pack.Speciality+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('idSpeciality')){
        let q1 = " and S.idSpeciality ="+pack.idSpeciality+" " 
        q+=q1;
    }
    if(pack.hasOwnProperty('StudyYear')){
        let q1 = " and SY.name like '%"+pack.StudyYear+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('idStudyYear')){
        let q1 = " and SY.idStudyYear ="+pack.idStudyYear+" " 
        q+=q1;
    }

    if(pack.hasOwnProperty('TypeSemestre')){
        let q1 = " and ST.name like '%"+pack.TypeSemestre+"%' "
        q+=q1;
    }

    if(pack.hasOwnProperty('idTypeSemestre')){
        let q1 = " and ST.idTypeSemestre ="+pack.idTypeSemestre+" " 
        q+=q1;
    }

    if(pack.hasOwnProperty('TypeUnity')){
        let q1 = " and SU.name like '%"+pack.TypeUnity+"%' "
        q+=q1;
    }

    db.query(q,(Err,Res)=>{
        if(Err) throw Err;
        callback(Res);
    })
}

// module

const AddTypeModule = (pack,callback)=>{
    if(pack.hasOwnProperty("name") && pack.hasOwnProperty("Coef") && pack.hasOwnProperty("Credit")  && pack.hasOwnProperty("idTypeUnity") ){
        let q = "insert into TypeModule(name,Coef,Credit,idTypeUnity";
        if(pack.hasOwnProperty('idProfessor')){
            q+=",idProfessor) values";
            q+="('"+pack.name+"',"+pack.Coef+","+pack.Credit+","+pack.idTypeUnity+","+pack.idProfessor+");";


        }else{
            q+="('"+pack.name+"',"+pack.Coef+","+pack.Credit+","+pack.idTypeUnity+");";
            
        }

        db.query(q,(Err,Res)=>{
            if(Err) throw Err;
            id=Res.insertId;
            GetTypeModule({idTypeModule:id},(Err,Resultt)=>{
                callback(Err,Resultt);
            })
        })

    }else{
        callback("package not completed !!!",null);
    }
}

const GetTypeModule=(pack,callback)=>{
    if(pack.hasOwnProperty("idTypeModule")){
        let q = "select * from TypeModule where idTypeModule =" +pack.idTypeModule;

          db.query(q,(Err,Res)=>{
        if(Err) throw Err;
        if(Res.length ==1){
            idProfessor= Res.idProfessor;
            if(idProfessor>0){
                let q= "select TM.idTypeModule,TM.name as TypeModule,TM.Coef,TM.Credit, P.idProfessor,concat(P.firstname,' ',P.lastname) as ProfessorName , TU.idTypeUnity,TU.name as TypeUnity, TS.idTypeSemestre,ST.name as TypeSemestre,number,SY.idStudyYear,SY.name as StudyYear,S.idSpeciality,S.name as Speciality from TypeModule TM join Professor P join TypeUnity TU join  TypeSemestre TS join StudyYear SY join Speciality S join Departement D on TM.idTypeUnity=TU.idTypeUnity and TM.idProfessor=P.idProfessor and TU.idTypeSemestre=TS.idTypeSemestre and D.idDepartement =S.Departement and  S.idSpeciality=SY.idSpeciality and SY.idStudyYear=ST.idStudyYear "+Arch;
                db.query(q,(Err,Result)=>{
                    if(Err) throw Err;
                    callback(null,Result)
                })
            }else{
                let q= "select TM.idTypeModule,TM.name as TypeModule,TM.Coef,TM.Credit, TU.idTypeUnity,TU.name as TypeUnity, TS.idTypeSemestre,ST.name as TypeSemestre,number,SY.idStudyYear,SY.name as StudyYear,S.idSpeciality,S.name as Speciality from TypeModule TM join TypeUnity TU join  TypeSemestre TS join StudyYear SY join Speciality S join Departement D on TM.idTypeUnity=TU.idTypeUnity and TU.idTypeSemestre=TS.idTypeSemestre and D.idDepartement =S.Departement and  S.idSpeciality=SY.idSpeciality and SY.idStudyYear=ST.idStudyYear "+Arch;
                db.query(q,(Err,Result)=>{
                    if(Err) throw Err;
                    callback(null,Result)
                })
            }
        }
    })

    }else{
        callback("no id typeModule",null)
    }
}


const ModifyTypeModule = (pack,callback)=>{
    let md = "update TypeModule set "; 
    let and=false
    if(pack.hasOwnProperty('name')){
        let q1 = " name = '"+pack.name+"' ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }

    if(pack.hasOwnProperty('Coef')){
        let q1 = " Coef = "+pack.Coef+" ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }
    if(pack.hasOwnProperty('Credit')){
        let q1 = " Credit = "+pack.Credit+" ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }
    if(pack.hasOwnProperty('idProfessor')){
        let q1 = " idProfessor = "+pack.idProfessor+" ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }

    if(pack.hasOwnProperty('idTypeUnity')){
        let q1 = " idTypeUnity = "+pack.idTypeUnity+" ";
        if(and){
            md+=" , "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }


    if(and && pack.hasOwnProperty('idTypeModule')){
        md+=" where idTypeModule="+pack.idTypeModule;
        db.query(md,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })
    }else{
        callback("there no item to update",null)
    }
}


const ArchivedTypeModule = (pack,callback)=>{
    if(pack.hasOwnProperty('idTypeModule')){
        ArchivedTable('TypeModule',{id:pack.idTypeModule},(Err,Result)=>{
            callback(Err,Result);
        })
    }else{
        callback("no id for TypeModule",null)
    }
}



const DesArchivedTypeModule =(pack,callback)=>{
    if(pack.hasOwnProperty('idTypeModule')){
        DesarchivedTable("TypeModule",{id:pack.idTypeModule},(Err,Result)=>{
            callback(Err,Result);
        })
    }else{
        callback("no id for TypeModule",null)
    }
}

const SearchMultiTypeModule = (pack,callback)=>{
    
    let Arch = "and Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }


    let q= "select TM.idTypeModule,TM.name as TypeModule,TM.Coef,TM.Credit, TU.idTypeUnity,TU.name as TypeUnity, TS.idTypeSemestre,ST.name as TypeSemestre,number,SY.idStudyYear,SY.name as StudyYear,S.idSpeciality,S.name as Speciality from TypeModule TM join TypeUnity TU join  TypeSemestre TS join StudyYear SY join Speciality S join Departement D on TM.idTypeUnity=TU.idTypeUnity and TU.idTypeSemestre=TS.idTypeSemestre and D.idDepartement =S.Departement and  S.idSpeciality=SY.idSpeciality and SY.idStudyYear=ST.idStudyYear "+Arch;


    if(pack.hasOwnProperty('Speciality')){
        let q1 = " and S.name like '%"+pack.Speciality+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('idSpeciality')){
        let q1 = " and S.idSpeciality ="+pack.idSpeciality+" " 
        q+=q1;
    }
    if(pack.hasOwnProperty('StudyYear')){
        let q1 = " and SY.name like '%"+pack.StudyYear+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('idStudyYear')){
        let q1 = " and SY.idStudyYear ="+pack.idStudyYear+" " 
        q+=q1;
    }

    if(pack.hasOwnProperty('TypeSemestre')){
        let q1 = " and ST.name like '%"+pack.TypeSemestre+"%' "
        q+=q1;
    }

    if(pack.hasOwnProperty('idTypeSemestre')){
        let q1 = " and ST.idTypeSemestre ="+pack.idTypeSemestre+" " 
        q+=q1;
    }

    if(pack.hasOwnProperty('TypeUnity')){
        let q1 = " and SU.name like '%"+pack.TypeUnity+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('idTypeUnity')){
        let q1 = " and SU.idTypeUnity ="+pack.idTypeUnity+" " 
        q+=q1;
    }

    if(pack.hasOwnProperty('TypeModule')){
        let q1 = " and SM.name like '%"+pack.TypeModule+"%' "
        q+=q1;
    }

    db.query(q,(Err,Res)=>{
        if(Err) throw Err;
        callback(Res);
    })
}


module.exports={
    TypeSemestre:{
        AddTypeSemestre,
        GetTypeSemestre,
        ModifyTypeSemestre,
        ArchivedTypeSemestre,
        DesArchivedTypeSemestre,
        SearchMultiTypeSemestre
    },
    TypeUnity:{
        AddTypeUnity,
        GetTypeUnity,
        ModifyTypeUnity,
        ArchivedTypeUnity,
        DesArchivedTypeUnity,
        SearchMultiTypeUnity
    },
    TypeModule:{
        AddTypeModule,
        GetTypeModule,
        ModifyTypeModule,
        ArchivedTypeModule,
        DesArchivedTypeModule,
        SearchMultiTypeModule
    }
}