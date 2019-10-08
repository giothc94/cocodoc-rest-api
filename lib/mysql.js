const { config } = require('../config');
const mysql = require('mysql');
class MySql {
    dataDb = {
        host: config.mysqlHost,
        user: config.mysqlUser,
        password: config.mysqlPassword,
        database: config.mysqlDatabase
    }
    constructor() {}
    connection = () => Promise.resolve(mysql.createConnection(this.dataDb))
}
module.exports = MySql;