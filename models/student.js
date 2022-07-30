const db = require("./DB/MySqlConnection");


const AddStudent = (pack,callback)=>{
    if(pack.hasOwnProperty('firstname') && pack.hasOwnProperty('lastname') && pack.hasOwnProperty('password') && pack.hasOwnProperty('firstname') && pack.hasOwnProperty('matricule') && pack.hasOwnProperty('bac_year') ){
        let q="insert into Student(firstname,lastname,matricule,bac_year,password) values ";
        q+="('"+pack.fisrtname+"','"+pack.lastname+"','"+pack.matricule+"','"+pack.bac_year+"','"+pack.password+"');"
        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            idStudent =Result.insertId;
            user = {
                idStudent:idStudent,
                matricule:pack.matricule
            }
            callback(user)
        })
    }
}

const ModifyStudent = (pack,callback)=>{
    let md = "update Student set "; 
    let and=false
    if(pack.hasOwnProperty('firstname')){
        let q1 = " firstname = '"+pack.fisrtname+"' ";
        if(and){
            md+=" and "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }

    if(pack.hasOwnProperty('lastname')){
        let q1 = " lastname = '"+pack.lastname+"' ";
        if(and){
            md+=" and "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }
    if(pack.hasOwnProperty('matricule')){
        let q1 = " matricule = '"+pack.matricule+"' ";
        if(and){
            md+=" and "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }
    if(pack.hasOwnProperty('bac_year')){
        let q1 = " bac_year = "+pack.bac_year+" ";
        if(and){
            md+=" and "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }
    if(pack.hasOwnProperty('password')){
        let q1 = " password = '"+pack.password+"' ";
        if(and){
            md+=" and "+q1;
        }else{
            and=true;
            md+=q1;
        }
     
    }

    if(and && pack.hasOwnProperty('idStudent')){
        md+=" where idStudent="+pack.idStudent;
        db.query(md,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })
    }else{
        callback("there no item to update",null)
    }


}


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

const GetStudentbyid = (pack,callback)=>{
    if(pack.hasOwnProperty('idStudent')){
        let q = "select * from Student where idStudent="+pack.idStudent+" ;";
        db.query(md,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })
    }else{
        callback("there nno id for student",null)
    }

}

const ArchivedStudent = (pack,callback)=>{
    if(pack.hasOwnProperty('idStudent')){
        npack = {
            id:pack.idStudent
        }

        ArchivedTable("Student",npack,(Err,Result)=>{
            callback(Err,Result)
        })
    }else{
        callback("no id Student",null)
    }
}

const DesArchivedStudent = (pack,callback)=>{
    if(pack.hasOwnProperty('idStudent')){
        npack = {
            id:pack.idStudent
        }

        DesarchivedTable("Student",npack,(Err,Result)=>{
            callback(Err,Result)
        })
    }else{
        callback("no id Student",null)
    }
}

const SearchMultiStudent = (pack,callback)=>{
    let Arch = "and Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    let q= "select * from Student where 1=1 " + Arch;

    if(pack.hasOwnProperty('firstname')){

        let q1 = " and firstname like '%"+pack.fisrtname+"%' "
        q+=q1;
    }


    if(pack.hasOwnProperty('lastname')){

        let q1 = " and lastname like '%"+pack.lastname+"%' "
        q+=q1;
    }

    if(pack.hasOwnProperty('matricule')){

        let q1 = " and matricule like '%"+pack.matricule+"%' "
        q+=q1;
    }

    if(pack.hasOwnProperty('bac_year')){

        let q1 = " and bac_year like '%"+pack.bac_year+"%' "
        q+=q1;
    }

    db.query(q,(Err,Res)=>{
        if(Err) throw Err;
        callback(Res);
    })


}

module.exports = {
    AddStudent,
    GetStudentbyid,
    ModifyStudent,
    ArchivedStudent,
    DesArchivedStudent,
    SearchMultiStudent
}