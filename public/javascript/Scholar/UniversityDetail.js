var socket = io('http://localhost:3000/');
socket.on('connection')

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