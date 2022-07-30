var mysql      = require('mysql');
const Config= require("./config")

var connection = mysql.createConnection({
  host     : Config.Database.host,
  user     : Config.Database.user,
  password : Config.Database.password,
});
 
connection.connect();



module.exports = connection;