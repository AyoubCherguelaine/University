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

var Search=0

const tap = ()=>{
    Search+=1;
    let s = Search;

    setTimeout(OnSearch(s),4000);
}

const OnSearch = (s)=>{
    if(Search == s){
        Search=0;
        // make the event happen 
        pack={
            University : document.getElementById('SearchUniversityByName').value,
            Wilaya : document.getElementById('SearchUniversityByWilaya').value
        }
        socket.emit('SearchUniversity',pack);

    }else{
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

socket.on('CreateError',(ErrText)=>{
    Err(ErrText,5000);
})


socket.on('ModifyErr',(ErrText)=>{
    Err(ErrText,5000);
})

socket.on('SearchResult',(Universitys)=>{
    
})