

const DeleteErr = ()=>{
    let Err = document.getElementById('Err');
    Err.innerHTML = ""
 
}

const Err = (s,ms=3000)=>{

    let Err = document.getElementById('Err');
    Err.innerHTML = s
    setTimeout(DeleteErr, ms);

}

var Search=1

const tap = ()=>{
    Search+=1;
    let s = Search;

    setTimeout(GetFacultys(s),4000);
}


const GetMore = ()=>{
    let Lid = document.getElementById('LastFacultyId').value;
    if(parseInt(Lid)>0){
        GetFacultys(0)
    }else{
        Err('Problem in the last id of university ');
    }
}

const GetFaculty = (id)=>{
    socket.emit('GetFacultyDetail',id);
}

const GetFacultys = (s)=>{
    if(Search == s){
        Search=1;
        // make the event happen 
        pack={
            idUniversity: parseInt(document.getElementById('idUniversity').value),
            Faculty : document.getElementById('SearchUniversityByName').value,
        }
        socket.emit('GetFacultys',pack);
        return true;
    }else{
        if(s==0){
            Search=1;
            let Lid = document.getElementById('LastFacultyId').value;
            if(Lid == '0'){
                Lid=1;
            }
        // make the event happen 
        pack={
            Lid:parseInt(Lid) ,
            idUniversity:parseInt( document.getElementById('idUniversity').value),
            Faculty : document.getElementById('SearchUniversityByName').value,
        }
       
        socket.emit('GetFacultys',pack);
        return true;
        }
        return false;
    }
}

const ClickSubmitAddFaculty = ()=>{
    let name = document.getElementById('name').value;
    let idUniversity = document.getElementById('idUniversity').value;


    if(name.length >=5 && parseInt(idUniversity)>0){

        let pack={
            name:name,
            idUniversity:idUniversity
        }
    
        socket.emit('AddFaculty',pack);
    
    }else{
        Err("data is not completed");
    }

    return false;

}

const ClickSubmitModifyFaculty = ()=>{
    let name = document.getElementById('name').value;
    let idUniversity = document.getElementById('idUniversity').value;
    let Arch= document.getElementById('Archived').value;
    let pack={
        name:name,
        idUniversity,
        Archived :Arch
    }

    socket.emit('ModifyFaculty',pack);
}

//  Facultys

const CreateFacultyBox = (U)=>{

    let htm = "<div>"
    htm+= '<div class="idFacultyShow">'+U.idUFaculty+'</div>';
    htm+= '<div class="nameFacultyShow">'+U.name+'</div>'
    htm+='<div class="DetailButoon"> <button onClick="GetFaculty('+U.idFaculty+')" >Detail</button>  </div> '
    htm+='</div>'
    return htm

}

const AddToFacultyList = (U)=>{
    const Box = document.getElementById('UList');
    let Lid = document.getElementById('LastFacultyId')
    Lid.value = U.idUniversity;
    let New = CreateUniversityBox(U);
    Box.innerHTML+=New
}
//end


socket.on('FacultyCreateError',(ErrText)=>{
    Err(ErrText,5000);
})


socket.on('FacultyModifyErr',(ErrText)=>{
    Err(ErrText,5000);
})

socket.on('Facultys',(Facultys)=>{
    if(Facultys.length>0){
        for(let i =0;i<Facultys.length;i++){
            AddToFacultyList(Facultys[i]);
        }
    }
})


window.onload = ()=>{
    GetFacultys(0);
}