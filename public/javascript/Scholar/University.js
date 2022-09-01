var socket = io('http://localhost:3000/');
socket.on('connection')


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

    setTimeout(GetUniversitys(s),4000);
}

const GetUniversitys = (s)=>{
    if(Search == s){
        Search=1;
        // make the event happen 
        pack={
            University : document.getElementById('SearchUniversityByName').value,
            Wilaya : document.getElementById('SearchUniversityByWilaya').value
        }
        socket.emit('GetUniversitys',pack);
        return true;
    }else{
        if(s==0){
            Search=1;
            let Lid = document.getElementById('LastUniversityId').value;
            if(Lid == '0'){
                Lid=1;
            }
        // make the event happen 
        pack={
            Lid:parseInt(Lid) ,
            University : document.getElementById('SearchUniversityByName').value,
            Wilaya : document.getElementById('SearchUniversityByWilaya').value
        }
        socket.emit('GetUniversitys',pack);
        return true;
        }
        return false;
    }
}

const ClickSubmitAddUniversity = ()=>{
    let name = document.getElementById('name').value;
    let idWilaya = document.getElementById('Wilaya').value;


    if(name.length >=5 && parseInt(idWilaya)>0){

        let pack={
            name:name,
            idWilaya:idWilaya
        }
    
        socket.emit('AddUniversity',pack);
    
    }else{
        Err("data is not completed");
    }

    return false;

}

const ClickSubmitModifyUniversity = ()=>{
    let idUniversity = document.getElementById('idUniversity').value;
    let name = document.getElementById('name').value;
    let Arch = document.getElementById('Archived').value;
    if(parseInt(idUniversity)>0 && name.length>5){
        let pack={
            idUniversity:idUniversity,
            name:name,
            Archived:Arch
        }
    
        socket.emit('ModifyUniversity',pack);
    }else{
        Err('data is not comleted')
    }
}

const CreateUniversityBox = (U)=>{

    let htm = "<div>"
    htm+= '<div class="idUniversityShow">'+U.idUniversity+'</div>';
    htm+= '<div class="nameUniversityShow">'+U.name+'</div>'
    htm+= ' <div class="nameWilayaShow">'+U.Wilaya+'</div>'
    htm+='<div class="DetailButoon"> <button onClick="GetUniversity('+U.idUniversity+')" >Detail</button>  </div> '
    htm+='</div>'
    return htm

}

const AddToUniversityList = (U)=>{
    const Box = document.getElementById('UList');
    let Lid = document.getElementById('LastUniversityId')
    Lid.value = U.idUniversity;
    let New = CreateUniversityBox(U);
    Box.innerHTML+=New
}

const GetMore = ()=>{
    let Lid = document.getElementById('LastUniversityId').value;
    if(parseInt(Lid)>0){
        GetUniversitys(0)
    }else{
        Err('Problem in the last id of university ');
    }
}

socket.on('CreateError',(ErrText)=>{
    Err(ErrText,5000);
})


socket.on('ModifyErr',(ErrText)=>{
    Err(ErrText,5000);
})

socket.on('Universitys',(Universitys)=>{

})

socket.on('UniversityUpdate',(university)=>{

})

window.onload =()=>{
    GetUniversitys(0);
}