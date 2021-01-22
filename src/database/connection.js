const mysql = require("mysql-await");
const data = require("./database");
const database = mysql.createConnection(data);
module.exports = database;
