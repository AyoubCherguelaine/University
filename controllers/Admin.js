

const GetLogin= (req,res)=>{
    res.render('Admin/login');
}
const PostLogin= (req,res)=>{
   
        console.log(req.body);
        res.end();
    
}

const GetCreateAdmin = (req,res)=>{
    //check session that is Admin System

    res.render('Admin/AddAdmin');
}

const PostCreateAdmin = (req,res)=>{
    console.log(req.body);
    res.end();
}

module.exports = {
    GetLogin,
    PostLogin,
    GetCreateAdmin,
    PostCreateAdmin
}