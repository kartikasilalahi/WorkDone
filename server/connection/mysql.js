const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Qwerty-123",
    database: 'workdone',
    port: "3306"
});
module.exports = db