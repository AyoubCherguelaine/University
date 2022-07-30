const db = require("./DB/MySqlConnection")



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


const AddProfessor = (pack,callback)=>{
    if(pack.hasOwnProperty('firstname') && pack.hasOwnProperty('lastname') && pack.hasOwnProperty('matricule') && pack.hasOwnProperty('password') && pack.hasOwnProperty('idFaculty')  ){
        let q ="insert into Professor(firstname,lastname,matricule,password,idFaculty) values";
        q+="('"+pack.firstname+"','"+pack.lastname+"','"+pack.matricule+"','"+pack.password+"',"+pack.idFaculty+");";
         
        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            idProf= Result.insertId
            GetProfessorbyid({idProfessor:idProf},(Err,Result)=>{
                callback(Err,Result);
            })
        })
    }else{
        callback('package is not completed !',null);
    }
}

const GetProfessorbyid =(pack,callback)=>{
    if(pack.hasOwnProperty('idProfessor')){
        let q = "select idProfessor,firstname,lastname,matricule,F.idFaculty ,F.name as Faculty,U.idUniversity , U.name as University from Professor P join Faculty F join University U on P.idFaculty = F.idFaculty and F.idUniversity = U.idUniversity and P.idProfessor ="+idProfessor ;
        db.query(q,(Err,Result)=>{
            if(Err)throw Err;
            callback(null,Result)
        })

    }else{
        callback('no id Prof',null)
    }
}

const ModifyProfessor =(pack,callback)=>{
    let md = "update Professor set "; 
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
    if(pack.hasOwnProperty('idFaculty')){
        let q1 = " idFaculty = "+pack.idFaculty+" ";
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

    if(and && pack.hasOwnProperty('idProfessor')){
        md+=" where idProfessor="+pack.idProfessor;
        db.query(md,(Err,Result)=>{
            if(Err) throw Err;
            callback(null,Result);
        })
    }else{
        callback("there no item to update",null)
    }
}

const ArchivedProfessor = (pack,callback)=>{

    if(pack.hasOwnProperty('idProfessor')){
        npack={
            id:pack.idProfessor
        }
        ArchivedTable("Professor",npack,(Err,Result)=>{
            callback(Err,Result);
        })
    }else{
        callback("no id professor in Archived",null);
    }
}

const DesArchivedProfessor = (pack,callback)=>{

    if(pack.hasOwnProperty('idProfessor')){
        npack={
            id:pack.idProfessor
        }
        DesarchivedTable("Professor",npack,(Err,Result)=>{
            callback(Err,Result);
        })
    }else{
        callback("no id professor in DesArchived",null);
    }
}

const SearchMultiProfessor = (pack,callback)=>{
    let Arch = "and U.Archived = 0 ";

    if(pack.hasOwnProperty("Archived")){
        
            Arch = "and U.Archived = 1 "
        
    }else{
        if(pack.hasOwnProperty('All')){
            Arch = " ";
        }
    }

    let q = "select idProfessor,firstname,lastname,matricule,F.idFaculty ,F.name as Faculty,U.idUniversity , U.name as University ,idWilaya, W.name as Wilaya from Professor P join Faculty F join University U join Wilaya W on U.idWilaya=W.idWilaya and P.idFaculty = F.idFaculty and F.idUniversity = U.idUniversity "


    if(pack.hasOwnProperty("Wilaya")){
        let q1 = " and W.name like '%"+pack.Wilaya+"%' ";
        q+=q1
    }

    if(pack.hasOwnProperty("idWilaya")){
        let q1 = " and W.idWilaya  ="+pack.idWilaya+" ";
        q+=q1
    }

    if(pack.hasOwnProperty("University")){
        let q1 = " and U.name like '%"+pack.University+"%' ";
        q+=q1
    }

    if(pack.hasOwnProperty("idUniversity")){
        let q1 = " and U.idUniversity  ="+pack.idUniversity+" ";
        q+=q1
    }

    if(pack.hasOwnProperty("Faculty")){
        let q1 = " and F.name like '%"+pack.Faculty+"%' ";
        q+=q1
    }

    if(pack.hasOwnProperty("idFaculty")){
        let q1 = " and F.idFaculty  ="+pack.idFaculty+" ";
        q+=q1
    }

    db.query(q,(Err,Result)=>{
        if(Err)throw Err;
        callback(Result)
    })


}

module.exports={
    AddProfessor,
    GetProfessorbyid,
    ModifyProfessor,
    ArchivedProfessor,
    DesArchivedProfessor,
    SearchMultiProfessor
}