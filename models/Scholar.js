const db= require("./DB/MySqlConnection");


//useless function

const ModifyTableScholar = (Table,pack,callback)=>{
    if(Table=="Wilaya" || Table=="University" || Table=="Faculty" || Table=="Departement" || Table=="Speciality" ||Table=="StudyYear" || Table=="Session" ){

        if(pack.hasOwnProperty('name') && pack.hasOwnProperty("id")){
            let q = "update "+Table+" set name= '"+pack.name+"' where id"+Table+" = " +pack.id +" ;";
            db.query(q,(Err,Result)=>{
                if(Err)throw Err;
                callback(null,Result);
            })
        }else{
            console.log("pack is not complited !");
            callback("pack is not complited !",null)
        }
        

    }else{
        callback("Table Name not in Model");
    }
}

const ArchivedTable=(Table,pack,callback)=>{
    if(pack.hasOwnProperty('id')){

        let q = "update "+Table+" set Archived="+1+" where id"+Table+" = "+pack.id+" ;";
       
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

const SearchTable=(Table,basicQuery,Search,Value,concate=false,type)=>{

    if(Table=="Wilaya" || Table=="University" || Table=="Faculty" || Table=="Departement" || Table=="Speciality" || Table=="StudyYear" ){
        if(type=="int" || type =="double" || type=="float" || type=="bool"){
            //without ''
            let q="";
            if(concate){
                 q = basicQuery + " and " + Search +" = "+Value+" ";
            }else{
                 q = basicQuery + " " + Search +" = "+Value+" ";
             }

             return q;

        }else{
                //text or somthing
                if(concate){
                    q = basicQuery + " and " + Search +" like '"+Value+"' ";
               }else{
                    q = basicQuery + " " + Search +" like '"+Value+"' ";
                }

                return q;
            
        }
    }else{
        callback("no table !",null)
    }

}

//Wilaya 

const AddWilaya = (pack,callback)=>{
    // pack = {name:"Wilaya"}
    if(pack.hasOwnProperty('name')){
        let q = "insert into Wilaya(name) values('"+pack.name+"');";

        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            idWilaya =  Result.insertId;
            callback(null,{idWilaya:idWilaya,name:pack.name});
        })
    }else{
        callback("no name in fucking package",null)
    }
}

const GetWilayabyid = (pack,callback)=>{
    //pack = {idWilaya:idWilaya}
    if(pack.hasOwnProperty('idWilaya')){
        let q1="select * from Wilaya where idWilaya="+pack.idWilaya+" ;";
        db.query(q1,(Err,Result)=>{
            if(Err)throw Err;
            if(Result.length ==1){
                Wilaya={
                    idWilaya:Result[0].idWilaya,
                    name:Result[0].name
                }
                callback(null,Wilaya);
            }else{
                callback("no iteam",null);
            }
            
        })
    }else{
        callback("no id wilaya !",null);
    }
}

const ModifyWilaya = (pack,callback)=>{
    // pack={
    //     name:"NewWilaya",
    //     idWilaya:idWilaya
    // }
    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('idWilaya')){

        let npack={
            name:pack.name,
            id:pack.idWilaya
        }
        ModifyTableScholar('Wilaya',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null);
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("not compatible",null)
    }

  
}

const ArchivedWilaya= (pack,callback)=>{

    //pack={idWilaya:idwilaya}

    if(pack.hasOwnProperty('idWilaya')){
        npack={
            id:pack.idWilaya
        }
        ArchivedTable('Wilaya',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id Wilaya! ",null);
    }
}


const DesArchivedWilaya= (pack,callback)=>{

    //pack={idWilaya:idwilaya}

    if(pack.hasOwnProperty('idWilaya')){
        npack={
            id:pack.idWilaya
        }
        DesarchivedTable('Wilaya',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id Wilaya! ",null);
    }
}


const SearchWilaya= (pack,callback)=>{
    /**
     * pack={Wilaya:"Wilaya"}
     * pack={}
     * pack={Archived=true}
     * pack={All=true}
     */

    let Arch = "and W.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and W.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    if(pack.hasOwnProperty("Wilaya")){
        let q="select * from Wilaya W where name like '%"+pack.Wilaya+"%' "+Arch+";";
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })
    }else{
        let q="select * from Wilaya W where "+Arch+";";
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })
    }
}

//University

/**
 * 
 * @param {name,idWilaya} pack 
 * @param {Err,Result} callback 
 */

const AddUniversity = (pack,callback)=>{
    /**
     * pack={name:'University',idWilaya:idWilaya}
     */
    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('idWilaya') ){
        let q = "insert into University(name,idWilaya) values";
        q+=" ('"+pack.name+"',"+pack.idWilaya+");";
        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            idUniversity =  Result.insertId;
            GetUniversitybyid2({idUniversity:idUniversity},(Err,Res)=>{
                if(Err) {
                    console.log(Err); callback(Err,null);
                }
                callback(null,Res);
            })
        })
    }else{
        callback("no name or wilaya ya chkoopi",null);
    }
}


const GetUniversitybyid2 = (pack,callback)=>{
    if(pack.hasOwnProperty("idUniversity")){
        let q= "select idUniversity,U.name as University ,U.Archived Archived,W.idWilaya, W.name as Wilaya from University U join Wilaya W on U.idWilaya = W.idWilaya   and U.idUniversity="+pack.idUniversity+" ;";
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            if(Result.length ==1){
                University = Result[0];
                callback(null,University);
            }else{
                callback("no item university",null);
            }
        })
    }else{
        callback("no id university in query",null);
    }
}

const GetUniversitybyid = (pack,callback)=>{
    /**
     * pack={idUniversity:1}
     */
    if(pack.hasOwnProperty('idUniversity')){
        let q1="select * from University where idUniversity="+pack.idUniversity+" ;";
        db.query(q1,(Err,Result)=>{
            if(Err)throw Err;
            if(Result.length ==1){
                wilaya={
                    idWilaya:Result[0].idWilaya
                }
                
                GetWilayabyid(wilaya,(Err,Res)=>{
                    if(Err){
                        console.log(Err);
                        callback(Err,null);
                    }
                    University={
                        idUniversity:Result[0].idUniversity,
                        name:Result[0].name,
                        wilaya:Res
                        
                    }
                    callback(null,University);
    
                })
                
              
            }else{
                callback("there is no university with this data !",null)
            }
            
        })
    }else{
        callback("no idUniversity ya chkoupi !");
    }
}

/**
 * 
 * @param {name,idUniversity} pack 
 * @param {Err,Result} callback 
 */
const ModifyUniversity = (pack,callback)=>{
    /**
     * pack={name:"newUniversity",idUniversity:id}
     */
    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('idUniversity')){

        let npack={
            name:pack.name,
            id:pack.idUniversity
        }
        ModifyTableScholar('University',npack,(Err,Result)=>{
        if(Err){
            callback(Err,null);
        }else{
                callback(null,Result);
            }
        })
    }else{
        callback("not compatible",null)
    }
}


const ArchivedUniversity = (pack,callback)=>{
    /**
     * pack={idUniversity:id}
     */
    if(pack.hasOwnProperty('idUniversity')){
        npack={
            id:pack.idUniversity
        }
        ArchivedTable('University',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id University! ",null);
    }
}




const DesArchivedUniversity = (pack,callback)=>{
    /**
     * pack={idUniversity:id}
     */
    if(pack.hasOwnProperty('idUniversity')){
        npack={
            id:pack.idUniversity
        }
        DesarchivedTable('University',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id University! ",null);
    }
}

const SearchUniversity = (pack,callback)=>{

    /**
     * pack={Archived:true}
     * pack={All:true}
     * pack={Wilaya:'name}
     * pack={idWilaya:1}
     * pack={University:"name"}
     * pack={}
     */
    let Arch = "and U.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and U.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }


    if(pack.hasOwnProperty("Wilaya")){
        let q= "select idUniversity,U.name as University ,U.Archived as Archived,W.idWilaya, W.name as Wiayala from University U join Wilaya W on U.idWilaya = W.idWilaya  and W.name like '%"+pack.Wilaya +"%'  "+Arch+";";
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(Result);
        })
     
    }else{
    if(pack.hasOwnProperty('idWilaya')){
        let q= "select idUniversity,U.name as University ,U.Archived as Archived,W.idWilaya, W.name as Wiayala from University U join Wilaya W on U.idWilaya = W.idWilaya  and U.IdWilaya = "+pack.idWilaya +" "+Arch+";";

        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(Result);
        })
     
    }else{

        if(pack.hasOwnProperty('University')){
            let q= "select idUniversity,U.name as University ,U.Archived as Archived,W.idWilaya, W.name as Wiayala from University U join Wilaya W on U.idWilaya = W.idWilaya and U.name like '%"+pack.University+"%'  "+Arch+";";

            db.query(q,(Err,Result)=>{
                if(Err) throw Err;
                callback(Result);
            })
        }else{
            let q= "select idUniversity,U.name as University ,U.Archived as Archived,W.idWilaya, W.name as Wiayala from University U join Wilaya W on U.idWilaya = W.idWilaya   "+Arch+";";
            db.query(q,(Err,Result)=>{
                if(Err) throw Err;
                callback(Result);
            })
        }

    }
}
} 

const SearchMultiUniversity= (pack,callback)=>{
    let Arch = "and U.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and U.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    let q= "select idUniversity,U.name as University ,U.Archived as Archived,W.idWilaya, W.name as Wiayala from University U join Wilaya W on U.idWilaya = W.idWilaya   "+Arch+" ";

    if(pack.hasOwnProperty('Wilaya')){
        q1= " and W.name like '%"+pack.Wilaya+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idWilaya')){
        q1= " and W.idWilaya ="+pack.idWilaya+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('University')){
        q1= " and U.name like '%"+pack.University+"%' ";
        q+=q1;
    }

    db.query(q,(Err,Result)=>{
        if(Err)throw Err;
        callback(Result)
    })


}

//Faculty
const AddFaculty = (pack,callback)=>{
    /**
     * pack={name:'name',idUniversity:id}
     */
    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('idUniversity')){
        let q = "insert into Faculty(name,idUniversity) values";
        q+=" ('"+pack.name+"',"+pack.idUniversity+");";
        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            idFaculty =  Result.insertId;
            GetFacultybyid2({idFaculty:idFaculty},(Err,Res)=>{
                if(Err) {
                    console.log(Err); callback(Err,null);
                }
                callback(null,Res);
            })
        })
    }else{
        callback("no name or iduniversity a chkoopi !")
    }
}


const GetFacultybyid2 = (pack,callback)=>{
    if(pack.hasOwnProperty("idFaculty")){
        let q =" select  idFaculty, F.name as Faculty,U.idUniversity , U.name as University,W.idWilaya , W.name as Wilaya from Faculty F join University U join Wilaya W on F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and idFaculty="+pack.idFaculty+" ;";
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            if(Result.length ==1){
                Faculty = Result[0];
                callback(null,Faculty);
            }else{
                callback("no item Faculty",null);
            }
        })
    }else{
        callback("no id faculty",null)
    }
}

const GetFacultybyid=(pack,callback)=>{
    if(pack.hasOwnProperty('idFaculty')){
        let q = " select * from Faculty where idFaculty="+pack.idFaculty+" ;";
        db.query(q,(Err,Result)=>{
            if(Result.length==1){
                idUniversity = Result[0].idUniversity;
                npack={idUniversity:idUniversity};
                GetUniversitybyid(npack,(Err,Res)=>{
                    if(Err){
                        console.log(Err);
                        callback(Err,null);
                    }
                    if(Res.length==1){
                        Faculty={
                            idFaculty:Result[0].idFaculty,
                            name:Result[0].name,
                            University:Res
                        }
                        callback(null,Faculty);
                    }else{
                        callback("no university with this ,, you hacked the database rulls !")
                    }
                })
            }else{
                callback("no item",null)
            }
        })
    }else{
        callback("no idFaculty !",null)
    }
}

const ModifyFaculty = (pack,callback)=>{

    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('idFaculty')){

        let npack={
            name:pack.name,
            id:pack.idFaculty
        }
        ModifyTableScholar('Faculty',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null);
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("not compatible",null)
    }

  
}


const ArchivedFaculty= (pack,callback)=>{
    if(pack.hasOwnProperty('idFaculty')){
        npack={
            id:pack.idFaculty
        }
        ArchivedTable('Faculty',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id Faculty! ",null);
    }
}

const DesArchivedFaculty= (pack,callback)=>{
    if(pack.hasOwnProperty('idFaculty')){
        npack={
            id:pack.idFaculty
        }
        DesarchivedTable('Faculty',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id Faculty! ",null);
    }
}


const SearchFaculty = (pack,callback)=>{

    /**
     * pack={}
     * pack={Archived=true}
     * pack={All=true}
     * pack={Wilaya:"name"}
     * pack={idWilaya:1}
     * pack={University:"name"}
     * pack={idUniversity:1}
     * pack={Faculty:'anme}
     */
    let Arch = "and F.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and F.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    if(pack.hasOwnProperty("Wilaya")){
        let q =" select  idFaculty, F.name as Faculty,U.idUniversity , U.name as University,W.idWilaya , W.name as Wilaya from Faculty F join University U join Wilaya W on F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and W.name like '%"+pack.Wilaya+"%'  "+Arch+";";
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(Result);
        })

    }else{
        if(pack.hasOwnProperty('idWilaya')){
        let q =" select  idFaculty, F.name as Faculty,U.idUniversity , U.name as University,W.idWilaya , W.name as Wilaya from Faculty F join University U join Wilaya W on F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and W.idWilaya = "+pack.idWilaya +"  "+Arch+";";
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(Result);
        })
        }else{
            if(pack.hasOwnProperty("University")){
                let q =" select  idFaculty, F.name as Faculty,U.idUniversity , U.name as University,W.idWilaya , W.name as Wilaya from Faculty F join University U join Wilaya W on F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and U.name like '%" +pack.University +"%'  "+Arch+";";
                db.query(q,(Err,Result)=>{
                    if(Err) throw Err;
                    callback(Result);
                })
            }else{
                if(pack.hasOwnProperty("idUniversity")){
                     let q =" select  idFaculty, F.name as Faculty,U.idUniversity , U.name as University,W.idWilaya , W.name as Wilaya from Faculty F join University U join Wilaya W on F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and U.idUniversity = "+ pack.idUniversity +"  "+Arch+";"
                     db.query(q,(Err,Result)=>{
                        if(Err) throw Err;
                        callback(Result);
                    })
                    }else{
                    if(pack.hasOwnProperty("Faculty")){
                        let q =" select  idFaculty, F.name as Faculty,U.idUniversity , U.name as University,W.idWilaya , W.name as Wilaya from Faculty F join University U join Wilaya W on F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and F.name like '%"+pack.Faculty+"%'  "+Arch+";";
                        db.query(q,(Err,Result)=>{
                            if(Err) throw Err;
                            callback(Result);
                        })
                    }else{
                        let q =" select  idFaculty, F.name as Faculty,U.idUniversity , U.name as University,W.idWilaya , W.name as Wilaya from Faculty F join University U join Wilaya W on F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  "+Arch+";"
                        db.query(q,(Err,Result)=>{
                            if(Err) throw Err;
                            callback(Result);
                        })
                    }
                }
            }
        }
    }
}


const SearchMultiFaculty =(pack,callback)=>{
    let Arch = "and F.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and F.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    let q =" select  idFaculty, F.name as Faculty,U.idUniversity , U.name as University,W.idWilaya , W.name as Wilaya from Faculty F join University U join Wilaya W on F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  "+Arch+" "

    if(pack.hasOwnProperty('Wilaya')){
        q1= " and W.name like '%"+pack.Wilaya+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idWilaya')){
        q1= " and W.idWilaya ="+pack.idWilaya+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('University')){
        q1= " and U.name like '%"+pack.University+"%' ";
        q+=q1;
    }
    if(pack.hasOwnProperty('idUniversity')){
        q1= " and U.idUniversity ="+pack.idUniversity+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('Faculty')){
        q1= " and F.name like '%"+pack.Faculty+"%' ";
        q+=q1;
    }

    db.query(q,(Err,Result)=>{
        if(Err)throw Err;
        callback(Result)
    })

}

//Departement
const AddDepartement = (pack,callback)=>{
    /**
     * pack={name:"Dep",idFaculty:1}
     */
   if(pack.hasOwnProperty("name") && pack.hasOwnProperty('idFaculty')){
        let q = "insert into Departement(name,idFaculty) values";
        q+=" ('"+pack.name+"',"+pack.idFaculty+");";
        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            idDepartement =  Result.insertId;
            GetDepartementbyid2({idDepartement:idDepartement},(Err,Res)=>{
                if(Err) {
                    console.log(Err); callback(Err,null);
                }
                callback(null,Res);
            })
        })
   }else{
    callback("there is no name id faculty !",null)
   } 
}

const GetDepartementbyid2 = (pack,callback)=>{
    if(pack.hasOwnProperty("idDepartement")){
        let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and idDepartement="+pack.idDepartement+" ;"
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            if(Result.length ==1){
                Departement = Result[0];
                callback(null,Departement);
            }else{
                callback("no item Departement",null);
            }
        })
    }else{
        callback("no idDepartement",null)
    }
}

const GetDepartementbyid = (pack,callback)=>{
    if(pack.hasOwnProperty('idDepartement')){
        let q = " select * from Departement where idDepartement="+pack.idFaculty+" ;";
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            if(Result.length==1){
                idFaculty = Result[0].idFaculty;
                npack={
                    idFaculty:idFaculty
                }

                GetFacultybyid(npack,(Err,Res)=>{
                    if(Err){
                        console.log(Err);
                        callback(Err,null);
                    }
                    callback(null,{idDepartement:Result[0].idDepartement,name:Result[0].name,Faculty:Res});
    
                })

            }else{
                callback("no item Departement",null);
            }
        })
    }else{
        callback("there is no id departement !",null);
    }
}



const ModifyDepartement = (pack,callback)=>{

    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('idDepartement')){

        let npack={
            name:pack.name,
            id:pack.idDepartement
        }
        ModifyTableScholar('Departement',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null);
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("not compatible",null)
    }

  
}


const ArchivedDepartement= (pack,callback)=>{
    if(pack.hasOwnProperty('idDepartement')){
        npack={
            id:pack.idDepartement
        }
        ArchivedTable('Departement',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id Departement! ",null);
    }
}

const DesArchivedDepartement= (pack,callback)=>{
    if(pack.hasOwnProperty('idDepartement')){
        npack={
            id:pack.idDepartement
        }
        DesarchivedTable('Departement',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id Departement! ",null);
    }
}


const SearchDepartement = (pack,callback) =>{

      /**
     * pack={}
     * pack={Archived=true}
     * pack={All=true}
     * pack={Wilaya:"name"}
     * pack={idWilaya:1}
     * pack={University:"name"}
     * pack={idUniversity:1}
     * pack={Faculty:'anme}
     */

    let Arch = "and D.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and D.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    if(pack.hasOwnProperty("Wilaya")){
        let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and W.name like '%" +pack.Wilaya+"%'  "+Arch+";" 
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(Result);
        })

    }else{
        if(pack.hasOwnProperty('idWilaya')){
        let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and W.idWilaya = "+pack.idWilaya+"  "+Arch+";"
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(Result);
        })
        }else{
            if(pack.hasOwnProperty("University")){
                let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and U.name like '%"+pack.University+"%'  "+Arch+";"
                db.query(q,(Err,Result)=>{
                    if(Err) throw Err;
                    callback(Result);
                })

            }else{
                if(pack.hasOwnProperty("idUniversity")){
                    let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and U.idUniversity = "+pack.idUniversity+"  "+Arch+";"
                    db.query(q,(Err,Result)=>{
                        if(Err) throw Err;
                        callback(Result);
                    })

                }else{

                    if(pack.hasOwnProperty("Faculty")){
                        let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and F.name like '%"+pack.Faculty+"%'  "+Arch+";"
                        db.query(q,(Err,Result)=>{
                            if(Err) throw Err;
                            callback(Result);
                        })

                    }else{

                        if(pack.hasOwnProperty("idFaculty")){
                            let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and F.idFaculty ="+pack.idFaculty+"  "+Arch+";"
                            db.query(q,(Err,Result)=>{
                                if(Err) throw Err;
                                callback(Result);
                            })

                        }else{
                            if(pack.hasOwnProperty('Departement')){
                                let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and D.name like '%"+pack.Departement+"%' "+Arch+";"
                                db.query(q,(Err,Result)=>{
                                    if(Err) throw Err;
                                    callback(Result);
                                })

                            }else{
                                let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya "+Arch+";"
                                db.query(q,(Err,Result)=>{
                                    if(Err) throw Err;
                                    callback(Result);
                                })

                            }
                        }

                    }
                }
            }
        }
    }
}

const SearchMultiDepartement = (pack,callback)=>{
   
    let Arch = "and D.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and D.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    let q ="select idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya  from Departement D join Faculty F join University U join Wilaya W on D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya "+Arch+" "

    if(pack.hasOwnProperty('Wilaya')){
        q1= " and W.name like '%"+pack.Wilaya+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idWilaya')){
        q1= " and W.idWilaya ="+pack.idWilaya+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('University')){
        q1= " and U.name like '%"+pack.University+"%' ";
        q+=q1;
    }
    if(pack.hasOwnProperty('idUniversity')){
        q1= " and U.idUniversity ="+pack.idUniversity+" ";
        q+=q1;
    }
    if(pack.hasOwnProperty('Faculty')){
        q1= " and F.name like '%"+pack.Faculty+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idFaculty')){
        q1= " and F.idFaculty ="+pack.idFaculty+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('Departement')){
        q1= " and D.name like '%"+pack.Departement+"%' ";
        q+=q1;
    }
    db.query(q,(Err,Result)=>{
        if(Err)throw Err;
        callback(Result)
    })
}

//Speciality

const AddSpeciality = (pack,callback)=>{
    if(pack.hasOwnProperty("name") && pack.hasOwnProperty('idDepartement')){
        let q = "insert into Speciality(name,idDepartement) values";
        q+=" ('"+pack.name+"',"+pack.idDepartement+");";
        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            idSpeciality =  Result.insertId;
            GetSpecialitybyid2({idSpeciality:idSpeciality},(Err,Res)=>{
                if(Err) {
                    console.log(Err); callback(Err,null);
                }
                callback(null,Res);
            })
        })
    }else{
        callback("there is no name or id departemnt !",null);
    }
}

const GetSpecialitybyid2=(pack,callback)=>{

    if(pack.hasOwnProperty("idSpeciality")){
        let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and idSpeciality="+pack.idSpeciality+" ;";
        
        db.query(q,(Err,Result)=>{
            
                if(Err) throw Err;
                if(Result.length ==1){
                    Speciality = Result[0];
                    callback(null,Speciality);
                }else{
                    callback("no item Speciality",null);
                }
            
        })

    }else{
        callback("no id Speciality")
    }

}


const ModifySpeciality = (pack,callback)=>{

    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('idSpeciality')){

        let npack={
            name:pack.name,
            id:pack.idSpeciality
        }
        ModifyTableScholar('Speciality',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null);
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("not compatible",null)
    }

  
}


const ArchivedSpeciality= (pack,callback)=>{
    if(pack.hasOwnProperty('idSpeciality')){
        npack={
            id:pack.idSpeciality
        }
        ArchivedTable('Speciality',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id Speciality! ",null);
    }
}

const DesArchivedSpeciality= (pack,callback)=>{
    if(pack.hasOwnProperty('idSpeciality')){
        npack={
            id:pack.idSpeciality
        }
        DesarchivedTable('Speciality',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id Speciality! ",null);
    }
}


const SearchSpeciality = (pack,callback) =>{

    let Arch = "and S.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and S.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    if(pack.hasOwnProperty("Wilaya")){
        let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and W.name like '%" +pack.Wilaya+"%'  "+Arch+";"
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(Result);
        })

    }else{
        if(pack.hasOwnProperty('idWilaya')){
            let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and W.idWilaya = "+pack.idWilaya+"  "+Arch+";"
            db.query(q,(Err,Result)=>{
                if(Err) throw Err;
                callback(Result);
            })
        }else{
            if(pack.hasOwnProperty("University")){
                let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and U.name like '%"+pack.University+"%'  "+Arch+";"
                db.query(q,(Err,Result)=>{
                    if(Err) throw Err;
                    callback(Result);
                })
            }else{
                if(pack.hasOwnProperty("idUniversity")){
                    let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and U.idUniversity = "+pack.idUniversity+"  "+Arch+";"
                    db.query(q,(Err,Result)=>{
                        if(Err) throw Err;
                        callback(Result);
                    })
                }else{

                    if(pack.hasOwnProperty("Faculty")){
                        let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and F.name like '%"+pack.Faculty+"'  "+Arch+";"
                        db.query(q,(Err,Result)=>{
                            if(Err) throw Err;
                            callback(Result);
                        })
                    }else{

                        if(pack.hasOwnProperty("idFaculty")){
                            let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and F.idFaculty ="+pack.idFaculty+"  "+Arch+";"
                            db.query(q,(Err,Result)=>{
                                if(Err) throw Err;
                                callback(Result);
                            })
                        }else{
                            if(pack.hasOwnProperty('Departement')){
                                let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and D.name like '%"+pack.Departement+"%'  "+Arch+";"
                                db.query(q,(Err,Result)=>{
                                    if(Err) throw Err;
                                    callback(Result);
                                })
                            }else{
                                if(pack.hasOwnProperty("idDepartement")){
                                    let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and D.idDepartement = " +pack.idDepartement+"  "+Arch+";"
                                    db.query(q,(Err,Result)=>{
                                        if(Err) throw Err;
                                        callback(Result);
                                    })
                                }else{
                                    if(pack.hasOwnProperty("Speciality")){
                                        let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and S.name like '%" +pack.Speciality+"%'  "+Arch+";"
                                        db.query(q,(Err,Result)=>{
                                            if(Err) throw Err;
                                            callback(Result);
                                        })
                                    }else{
                                        let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  "+Arch+";"
                                        db.query(q,(Err,Result)=>{
                                            if(Err) throw Err;
                                            callback(Result);
                                        })
                                    }
                                }
                            }
                        }

                    }
                }
            }
        }
    }
}

const SearchMultiSpeciality =(pack,callback)=>{
    let Arch = "and S.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and S.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }
    let q = " select idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from Speciality S join Departement D join Faculty F join University U join Wilaya W on S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  "+Arch+" "


    if(pack.hasOwnProperty('Wilaya')){
        q1= " and W.name like '%"+pack.Wilaya+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idWilaya')){
        q1= " and W.idWilaya ="+pack.idWilaya+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('University')){
        q1= " and U.name like '%"+pack.University+"%' ";
        q+=q1;
    }
    if(pack.hasOwnProperty('idUniversity')){
        q1= " and U.idUniversity ="+pack.idUniversity+" ";
        q+=q1;
    }
    if(pack.hasOwnProperty('Faculty')){
        q1= " and F.name like '%"+pack.Faculty+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idFaculty')){
        q1= " and F.idFaculty ="+pack.idFaculty+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('Departement')){
        q1= " and D.name like '%"+pack.Departement+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idDepartement')){
        q1= " and D.idDepartement ="+pack.idDepartement+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('Speciality')){
        q1= " and S.name like '%"+pack.Speciality+"%' ";
        q+=q1;
    }


    db.query(q,(Err,Result)=>{
        if(Err)throw Err;
        callback(Result)
    })

}
//StudyYear

const AddStudyYear = (pack,callback)=>{
    if(pack.hasOwnProperty('name') && pack.hasOwnProperty("idSpeciality")){

        let q = "insert into StudyYear(name,idSpeciality) values";
        q+="('"+pack.name+"',"+pack.idSpeciality+");"
        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            idSY= Result.insertId;
            GetStudyYearbyid2({idStudyYear:idSY},(Err,Res)=>{
                if(Err){
                    console.log(Err)
                    callback(Err,null)
                }else{
                    callback(null,Res);
                }
            })
        })

    }else{
        callback("no name or is Speciality",null);
    }
}

const GetStudyYearbyid2= (pack,callback)=>{
    if(pack.hasOwnProperty("idStudyYear")){
        let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=S.idSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and idStudyYear="+pack.idStudyYear+" ;";
        
        db.query(q,(Err,Result)=>{
            
                if(Err) throw Err;
                if(Result.length ==1){
                    StudyYear = Result[0];
                    callback(null,StudyYear);
                }else{
                    callback("no item StudyYear",null);
                }
            
        })

    }else{
        callback("no id StudyYear")
    }
}

const ModifyStudyYear = (pack,callback)=>{

    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('idStudyYear')){

        let npack={
            name:pack.name,
            id:pack.idStudyYear
        }
        ModifyTableScholar('StudyYear',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null);
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("not compatible",null)
    }

  
}

const ArchivedStudyYear= (pack,callback)=>{
    if(pack.hasOwnProperty('idStudyYear')){
        npack={
            id:pack.idStudyYear
        }
        ArchivedTable('StudyYear',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id StudyYear! ",null);
    }
}

const DesArchivedStudyYear= (pack,callback)=>{
    if(pack.hasOwnProperty('idStudyYear')){
        npack={
            id:pack.idStudyYear
        }
        DesarchivedTable('StudyYear',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null)
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("no id StudyYear! ",null);
    }
}


const SearchStudyYear = (pack,callback)=>{

    let Arch = "and SY.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and SY.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    if(pack.hasOwnProperty("Wilaya")){
        let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and W.name like '%" +pack.Wilaya+"%'  "+Arch+";"
        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            callback(Result);
        })

    }else{
        if(pack.hasOwnProperty('idWilaya')){
            let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and W.idWilaya = "+pack.idWilaya+"  "+Arch+";"
            db.query(q,(Err,Result)=>{
                if(Err) throw Err;
                callback(Result);
            })
        }else{
            if(pack.hasOwnProperty("University")){
                let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  and U.name like '%"+pack.University+"%'  "+Arch+";"
                db.query(q,(Err,Result)=>{
                    if(Err) throw Err;
                    callback(Result);
                })
            }else{
                if(pack.hasOwnProperty("idUniversity")){
                    let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and U.idUniversity = "+pack.idUniversity+"  "+Arch+";"
                    db.query(q,(Err,Result)=>{
                        if(Err) throw Err;
                        callback(Result);
                    })
                }else{

                    if(pack.hasOwnProperty("Faculty")){
                        let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  and F.name like '%"+pack.Faculty+"%'  "+Arch+";"
                        db.query(q,(Err,Result)=>{
                            if(Err) throw Err;
                            callback(Result);
                        })
                    }else{

                        if(pack.hasOwnProperty("idFaculty")){
                            let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  and F.idFaculty ="+pack.idFaculty+"  "+Arch+";"
                            db.query(q,(Err,Result)=>{
                                if(Err) throw Err;
                                callback(Result);
                            })
                        }else{
                            if(pack.hasOwnProperty('Departement')){
                                let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  and D.name like '%"+pack.Departement+"%'  "+Arch+";"
                                db.query(q,(Err,Result)=>{
                                    if(Err) throw Err;
                                    callback(Result);
                                })
                            }else{
                                if(pack.hasOwnProperty("idDepartement")){
                                    let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  and D.idDepartement = " +pack.idDepartement+"  "+Arch+";"
                                    db.query(q,(Err,Result)=>{
                                        if(Err) throw Err;
                                        callback(Result);
                                    })
                                }else{
                                    if(pack.hasOwnProperty("Speciality")){
                                        let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and S.name like '%" +pack.Speciality+"%'  "+Arch+";"
                                        db.query(q,(Err,Result)=>{
                                            if(Err) throw Err;
                                            callback(Result);
                                        })
                                    }else{
                                   
                                        if(pack.hasOwnProperty("idSpeciality")){
                                            let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and S.idSpeciality = "+pack.idSpeciality+"  "+Arch+";"
                                            db.query(q,(Err,Result)=>{
                                                if(Err) throw Err;
                                                callback(Result);
                                            })
                                        }else{
                                            if(pack.hasOwnProperty("StudyYear")){
                                                let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya and SY.name = "+pack.StudyYear+"  "+Arch+";"
                                                db.query(q,(Err,Result)=>{
                                                    if(Err) throw Err;
                                                    callback(Result);
                                                })
                                            }else{
                                                let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  "+Arch+";"
                                                db.query(q,(Err,Result)=>{
                                                    if(Err) throw Err;
                                                    callback(Result);
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            }
        }
    }

}

const SearchMultiStudyYear = (pack,callback)=>{

    let Arch = "and SY.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and SY.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    let q = " select idStudyYear,SY.name as StudyYear, S.idSpeciality,S.name as Speciality,D.idDepartement,D.name as Departement, F.idFaculty ,F.name as Faculty,U.idUniversity,U.name as University ,W.idWilaya,W.name as Wilaya from StudyYear SY join Speciality S join Departement D join Faculty F join University U join Wilaya W on SY.idSpeciality=SidSpeciality and S.idDepartement=D.idDepartement and  D.idFaculty = F.idFaculty and   F.idUniversity = U.idUniversity and U.idWilaya = W.idWilaya  "+Arch+";"


    if(pack.hasOwnProperty('Wilaya')){
        q1= " and W.name like '%"+pack.Wilaya+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idWilaya')){
        q1= " and W.idWilaya ="+pack.idWilaya+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('University')){
        q1= " and U.name like '%"+pack.University+"%' ";
        q+=q1;
    }
    if(pack.hasOwnProperty('idUniversity')){
        q1= " and U.idUniversity ="+pack.idUniversity+" ";
        q+=q1;
    }
    if(pack.hasOwnProperty('Faculty')){
        q1= " and F.name like '%"+pack.Faculty+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idFaculty')){
        q1= " and F.idFaculty ="+pack.idFaculty+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('Departement')){
        q1= " and D.name like '%"+pack.Departement+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idDepartement')){
        q1= " and D.idDepartement ="+pack.idDepartement+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('Speciality')){
        q1= " and S.name like '%"+pack.Speciality+"%' ";
        q+=q1;
    }

    if(pack.hasOwnProperty('idSpeciality')){
        q1= " and S.idSpeciality ="+pack.idSpeciality+" ";
        q+=q1;
    }

    if(pack.hasOwnProperty('StudyYear')){
        q1= " and SY.name like '%"+pack.StudyYear+"%' ";
        q+=q1;
    }


    db.query(q,(Err,Result)=>{
        if(Err)throw Err;
        callback(Result)
    })

}

//Session

const AddSession= (pack,callback)=>{
    if(pack.hasOwnProperty('name')){
        if(pack.name =="session normal" || pack.name =="session 2"  || pack.name =="session 3" ){

            let q = "insert into Session(name) values ('"+pack.name+"');";
            db.query(q,(Err,Result)=>{
                if(Err) throw Err;

                GetSessionbyid({idSession:Result.insertId},(Err,Res)=>{
                    if(Err){
                        console.log(Err);
                        callback(Err,null)
                    }else{
                        callback(null,Res);
                    }
                })
              
            })

        }else{
            callback("session name not compatible !" ,null)
        }
    }else{
        callback("no name of session !",null);
    }
    
}

const GetSessionbyid = (pack,callback)=>{

    if(pack.hasOwnProperty('idSession')){
        let q = "select * from Session where idSession="+pack.idSession+" ;";

        db.query(q,(Err,Result)=>{
            if(Err) throw Err;
            if(Result.length ==1){
                callback(null,Result[0]);
            }else{
                callback("no item ",null);
            }
        })

    }else{
        callback("no id session !",null)
    }

}

const ModifySession= (pack,callback)=>{

    if(pack.hasOwnProperty('name') && pack.hasOwnProperty('idSession')){

        let npack={
            name:pack.name,
            id:pack.idSession
        }
        ModifyTableScholar('Session',npack,(Err,Result)=>{
            if(Err){
                callback(Err,null);
            }else{
                callback(null,Result);
            }
        })

    }else{
        callback("not compatible",null)
    }

  
}

const GetAllSession=(pack,callback)=>{
    let q = "select * from Session ;";
    db.query(q,(Err,Result)=>{
        if(Err) throw Err;
        callback(Result);
    })
}

module.exports={
    Wilaya:{
        AddWilaya,
        GetWilayabyid,
        ModifyWilaya,
        ArchivedWilaya,
        DesArchivedWilaya,
        SearchWilaya
    }
    ,
    University:{
        AddUniversity,
        GetUniversitybyid2,
        ModifyUniversity,
        ArchivedUniversity,
        DesArchivedUniversity,
        SearchUniversity,
        SearchMultiUniversity,
        SearchMultiUniversity
    }
    ,
    Faculty:{
        AddFaculty,
        GetFacultybyid2,
        ModifyFaculty,
        ArchivedFaculty,
        DesArchivedFaculty,
        SearchFaculty,
        SearchMultiFaculty

    }

    ,
    Departement:{
        AddDepartement,
        GetDepartementbyid2,
        ModifyDepartement,
        ArchivedDepartement,
        DesArchivedDepartement,
        SearchDepartement,
        SearchMultiDepartement
    }
    ,
    Speciality:{
        AddSpeciality,
        GetSpecialitybyid2,
        ModifySpeciality,
        ArchivedSpeciality,
        DesArchivedSpeciality,
        SearchSpeciality,
        SearchMultiSpeciality
    }
    ,
    StudyYear:{
        AddStudyYear,
        GetStudyYearbyid2,
        ModifyStudyYear,
        ArchivedStudyYear,
        DesArchivedStudyYear,
        SearchStudyYear,
        SearchMultiStudyYear
    }
    ,
    Session:{
        AddSession,
        GetSessionbyid,
        ModifySession,
        GetAllSession
    }
    
}