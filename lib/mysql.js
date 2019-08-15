const { config } = require('../config');

var mysql = require('mysql');
var connectionMysql = mysql.createConnection({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase
});

module.exports.mysqlCon = connectionMysql;

// connectionMysql.connect();

// connectionMysql.query('SELECT * from user_cocodoc', function(error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
// });

// connectionMysql.end();