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

socket.on('CreateError',(ErrText)=>{
    Err(ErrText,5000);
})


socket.on('ModifyErr',(ErrText)=>{
    Err(ErrText,5000);
})