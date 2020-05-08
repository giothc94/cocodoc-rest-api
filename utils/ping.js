const mysql = require("mysql");
const Mongo = require("mongodb").MongoClient;
const { config } = require("../config/index");
const chalk = require("chalk");

module.exports.checkServices = function () {
  dataDb = {
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase,
  };

  let services = [];
  let connSql = mysql.createConnection(dataDb);

  const DB_NAME = config.dbName;
  const MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}/${DB_NAME}`;

  connSql.ping((err) => {
    if (err) services.push({ service: "MySQL", status: "Inactive" });
    else connSql.end();
    Mongo.connect(MONGO_URI, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        services.push({ service: "MongoDB", status: "Inactive" });
      } else client.close();

      if (services[0]) {
        console.log(
          chalk.bgRed.whiteBright(services[0].service, services[0].status)
        );
        process.exit(1);
      }

      if (services[1]) {
        console.log(
          chalk.bgRed.whiteBright(services[1].service, services[1].status)
        );
        process.exit(1);
      }

      console.log(chalk.bgGreenBright.whiteBright("All active services"));
    });
  });
};
