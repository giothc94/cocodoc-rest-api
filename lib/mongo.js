const { config } = require('../config');

// console.log('Cpnfig', config)

const { MongoClient } = require('mongodb');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName;
const MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}/${DB_NAME}`;
// console.log(MONGO_URI)


class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(error => {
                if (error) {
                    reject(error);
                }

                console.log('Conectado a mongo!!');
                resolve(this.client.db(this.dbName));
            })
        })
    }
}

module.exports = MongoLib;