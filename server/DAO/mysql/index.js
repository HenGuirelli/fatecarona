const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bob@123"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});