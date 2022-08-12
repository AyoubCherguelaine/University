const cookieParser = require('cookie-parser');
const express = require('express'); 
const session = require("express-session")

var app= express();



// mideleware 



app.use(cookieParser());
age = 1000*60*60*24;
console.log("age : " + age);
app.use(session({secret: "nothing",maxAge:age}));



app.listen(3000,()=>{
    console.log("localhost:3000/");
})

