var mysql = require('mysql')


var conn = mysql.createConnection({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPW,
    database:process.env.DBDATA
})

module.exports = conn