

const submit = ()=>{
    let form = document.getElementById('formLoginAdmin');
    let trash = document.createElement('input');
    trash.type= "text"
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


