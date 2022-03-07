// const {Client, Pool} = require('pg')

// const client = new Pool({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "Chansith1439",
//     database: "postgres"
// })

// module.exports = client

const express = require("express");
const mysql = require("mysql");
const { password } = require("pg/lib/defaults");

const app = express();

app.use(express.json());

const client = mysql.createConnection({
    user: "root",
    host : "localhost",
    password : "chansithjob",
    database : "new_schema"

});

app.listen(3306,() =>{
    console.log("running server");
});
module.exports = client