const cookieParser = require('cookie-parser');
const express = require('express'); 
const session = require("express-session")
const bodyParser = require('body-parser')
var app= express();



// mideleware 



app.set('view engine', 'ejs');
app.use(cookieParser());
age = 1000*60*60*24;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log("age : " + age);
app.use(session({secret: "nothing",maxAge:age}));
app.use(express.static('public'));

app.get('/Admin/login',(req,res)=>{
    res.render('Admin/login');
})

app.post('/Admin/login',(req,res)=>{
    console.log('hello');
})


app.listen(3000,()=>{
    console.log("localhost:3000/");
})

