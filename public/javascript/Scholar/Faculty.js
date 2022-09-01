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