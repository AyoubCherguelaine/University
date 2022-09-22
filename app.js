const cookieParser = require('cookie-parser');
const express = require('express'); 
const session = require("express-session")
const bodyParser = require('body-parser')
var app= express();
const AdminRouter = require('./routers/Admin')


// mideleware 


app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(cookieParser());
age = 1000*60*60*24;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log("age : " + age);
app.use(session({secret: "nothing",maxAge:age}));
app.use(express.static('public'));

app.use('/Admin',AdminRouter)


app.listen(3001,()=>{
    
})

