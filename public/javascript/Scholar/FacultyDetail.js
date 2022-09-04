var socket = io('http://localhost:3000/');
socket.on('connection')


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