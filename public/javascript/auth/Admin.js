const submit = ()=>{
    let form = document.getElementById('formLoginAdmin');
    let trash = document.createElement('input');
    trash.type= "hidden";
    trash.name="trash";
    trash.value="nothing";
    trash.hidden= true;
    form.appendChild(trash)
    let submit = document.createElement("button");
    submit.type= 'submit';
    form.appendChild(submit);
    submit.click();
}

nameAdminSugest= 0;

const change = ()=>{
nameAdminSugest++;
setTimeout(EmitNameAdminSugest(nameAdminSugest),3000);
}

const EmitNameAdminSugest =(n)=>{
    if(nameAdminSugest==n){
        // emit a message with socket
    }
}


const submitCreatAdmin = ()=>{
    const Err = document.getElementById('ErrCreating');
    const form= document.getElementById('FormCreatAdmin');
    const pass1 = document.getElementById('password');
    const pass2= document.getElementById('confirme');
    if(pass1.value == pass2.value){
        let sub = document.createElement('button');
        sub.type= 'submit';
        
        form.appendChild(sub);
        sub.click();
    }else{

        Err.innerHTML = "password are not the same !!!"
    }
}

const ShowPassword=()=>{
    const checkShow = document.getElementById('checkShow');

    const pass1 = document.getElementById('password');
    const pass2= document.getElementById('confirme');
    if(checkShow.checked){
        pass1.type="text";
        pass2.type="text";
    }else{
        pass1.type="password";
        pass2.type="password";
    }
   
}

