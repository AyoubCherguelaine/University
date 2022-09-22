const {University} = require('../models/Scholar');
const Auth = require('./authentication');

const getUniversityDashboard = (req,res)=>{

    //dashboard
    Auth.Roll(req,(err,Result)=>{
        if(err){
            console.log(err);
        }else{
            if(Result.hasOwnProperty('Roll')){
                res.render('Scholar/University/DashBoard');
            }else{
                if(Result.hasOwnProperty('idProfessor')){
                    //render {to dash Professor}
                }else{
                    if(Result.hasOwnProperty('idStudent')){
                         //render {to dash Student}
                    }else{
                        // render {to home page}
                    }
                }
            }
        }
})
    

}



module.exports={
    getUniversityDashboard
}