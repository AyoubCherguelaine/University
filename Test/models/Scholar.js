
const { Faculty, Departement, Speciality, StudyYear, Session } = require("../../models/Scholar");
const Scholar = require("../../models/Scholar"); 

var Wilaya = Scholar.Wilaya;


//Succes
function TestAddWilaya(pack){ 
   
   
    Wilaya.AddWilaya(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Add Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })
}

//  TestAddWilaya( pack = {name:"adrar"})
//  TestAddWilaya( pack = {name:"chlef"})
//  TestAddWilaya( pack = {name:"alaghouat"})
//  TestAddWilaya( pack = {name:"oum bouki"})
//  TestAddWilaya( pack = {name:"betna"})
//  TestAddWilaya( pack = {name:"bedjia"})
//  TestAddWilaya( pack = {name:"besekra"})
//  TestAddWilaya( pack = {name:"bechar"})
//  TestAddWilaya( pack = {name:"blida"})
//  TestAddWilaya( pack = {name:"bouira"})


//Succes
function TestGetWilayabyid(){
    pack = {idWilaya:1}
    Wilaya.GetWilayabyid(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console/log(Err)
        }else{
            console.log("Get Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })
}
//Succes
function TestModifyWilaya(){
    pack={
           name:"Adrar",
           idWilaya:1
         }

         Wilaya.ModifyWilaya(pack,(Err,Result)=>{
            if(Err) {
                console.log("Err");
                console.log(Err)
            }else{
                console.log("Modify Secces !!")
                console.log("Result :")
                console.log(Result);
            }
         })

}

//Succes not sure

function TextArchivedWilaya(){
    pack={idWilaya:3}
    Wilaya.ArchivedWilaya(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Archived Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })
};

//Succes 
function TestSearchWilaya(){
    pack={Wilaya:''}
    Wilaya.SearchWilaya(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Search Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })
}

// TestSearchWilaya();

//University

var University = Scholar.University;

//Succes 
function TestAddUniversity(pack){

    University.AddUniversity(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Add Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })

}


// TestAddUniversity({name:'Saad Dahleb Blida University',idWilaya:9});
// TestAddUniversity({name:'Ali Lounici Blida University',idWilaya:9});
// TestAddUniversity({name:'Abderahman Mira Bedjia University',idWilaya:6});



//Succes 
function TestGetUniversitybyid2(){
    pack = {idUniversity:3}
    University.GetUniversitybyid2(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Get Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })
}

//TestGetUniversitybyid2();


//Succes 
function TestModifyUniversity(){
    pack={name:"University Saad Dahleb Blida",idUniversity:1}
    University.ModifyUniversity(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Modify Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })

}

//TestModifyUniversity();


//Succes 
function TestArchivedUniversity(){
    pack={idUniversity:3}

    University.ArchivedUniversity(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Archived Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })
}


// TestArchivedUniversity();
// TestGetUniversitybyid2();
//Succes 
function TestDesArchivedUniversity(){
    pack= {idUniversity:3};
    University.DesArchivedUniversity(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("DesArchived Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })
}
// TestDesArchivedUniversity();
// TestGetUniversitybyid2();

//Succes
function TestSearchUniversity(){
    pack={University:'Ali'}
    University.SearchUniversity(pack,(Result)=>{
        
            console.log("Search Secces !!")
            console.log("Result :")
            console.log(Result);
        
    })
}

// TestSearchUniversity()


//Faculty

//Succes
function TestAddFaculty(){
    pack={name:'Medcine',idUniversity:1}
    Faculty.AddFaculty(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Add Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })

}

//TestAddFaculty() 
//for GetFaculty is already tested by add faculty  ,,, the returned value is geting by getFacultybyid2


//we don't test Modify, Archived or Desarchived cs is from the same function 

//Succes
function TestSearchFaculty(){
    pack={University:"sa"}
    Faculty.SearchFaculty(pack,(Result)=>{
        console.log("Add Secces !!")
        console.log("Result :")
        console.log(Result);
    })
}

//TestSearchFaculty();

//Departement

//Succes
function TestAddDepartement(){
    pack={name:"Mathematique",idFaculty:1}
    Departement.AddDepartement(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Add Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })
}

//TestAddDepartement()
//for GetDep is already tested by add Dep  ,,, the returned value is geting by getDepbyid2


//we don't test Modify, Archived or Desarchived cs is from the same function 

//Succes
function TestSearchDepartement(){
    pack={};
    Departement.SearchDepartement(pack,(Result)=>{
        console.log("Search Secces !!")
        console.log("Result :")
        console.log(Result);
    })
}
//TestSearchDepartement()


function TestAddSpeciality(pack){
    Speciality.AddSpeciality(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Add Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })

}



// TestAddSpeciality({name:"Informatique",idDepartement:1});
// TestAddSpeciality({name:"Isil",idDepartement:1});
// TestAddSpeciality({name:"Siq",idDepartement:1});
// TestAddSpeciality({name:"IL",idDepartement:1});
// TestAddSpeciality({name:"TAL",idDepartement:1});
// TestAddSpeciality({name:"SSI",idDepartement:1});
// TestAddSpeciality({name:"SIR",idDepartement:1});

//Succes
function TestSearchSpeciality(){
    pack={Faculty:'Science'};
    Speciality.SearchSpeciality(pack,(Result)=>{
        console.log("Search Secces !!")
        console.log("Result :")
        console.log(Result);
    })
}

//TestSearchSpeciality()


function TestAddStudyYear(pack){
  
    StudyYear.AddStudyYear(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Add Secces !!")
            console.log("Result :")
            console.log(Result);
        }
})
}


// TestAddStudyYear({name:'L2',idSpeciality:1})
// TestAddStudyYear({name:'L3',idSpeciality:2})
// TestAddStudyYear({name:'L3',idSpeciality:3})
// TestAddStudyYear({name:'M1',idSpeciality:4})
// TestAddStudyYear({name:'M2',idSpeciality:4})
// TestAddStudyYear({name:'M1',idSpeciality:5})
// TestAddStudyYear({name:'M2',idSpeciality:5})
// TestAddStudyYear({name:'M1',idSpeciality:6})
// TestAddStudyYear({name:'M2',idSpeciality:6})
// TestAddStudyYear({name:'M1',idSpeciality:7})
// TestAddStudyYear({name:'M2',idSpeciality:7})


function TestAddSession(pack){
    Session.AddSession(pack,(Err,Result)=>{
        if(Err) {
            console.log("Err");
            console.log(Err)
        }else{
            console.log("Add Secces !!")
            console.log("Result :")
            console.log(Result);
        }
    })
}

// TestAddSession({name:"session normal"})
// TestAddSession({name:"session 2"})
// TestAddSession({name:"session 3"})



// test for multi search

