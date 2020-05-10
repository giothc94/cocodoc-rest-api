// imports
const mysql = require("mysql");
const { config } = require("./config/index");
const fs = require("fs").promises;
const chalk = require("chalk");


// error handler
const ERROR = (error) => {
  console.log(`${chalk.bgRedBright.whiteBright(`[ERROR]:`)} 🛑 ${error} 🛑`);
  process.exit(1);
};

// succcess handler
const SUCCESS = (message) => {
  console.log(`${chalk.bgGreenBright.blackBright(`[SUCCESS]:`)} ${message}`);
};

// config connection
connectionSettings = {
  host: config.mysqlHost,
  user: config.mysqlUser,
  password: config.mysqlPassword,
  multipleStatements: true,
};

// drop DB
const dropDb = (connection) =>
  new Promise((resolve, reject) => {
    let sql = "DROP DATABASE `" + config.mysqlDatabase + "`";
    connection.query(sql, (error, result) => {
      if (error) return reject(false);
      return resolve(true);
    });
  });

// Ping to server mysql
const verifyConnection = (connection) =>
  new Promise((resolve, reject) => {
    connection.ping((err) => {
      if (err) return reject(err);
      return resolve("🔨 Server ping response successful 🔧");
    });
  });

// Database existence verification
const verifyDatabase = (connection, nameDatabase) =>
  new Promise((resolve, reject) => {
    const verifyDb = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${nameDatabase}'`;
    connection.query(verifyDb, (error, result) => {
      if (error) return reject("Operacion verificacion no completada");
      if (result.length > 0) {
        return reject(`Database verification: The database already exists.`);
      }
      return resolve("🔨 The database verification was correct. 🔧");
    });
  });

// Create database
const createDatabase = (connection, uriScriptCreateDatabase) =>
  new Promise(async (resolve, reject) => {
    let createDataBase = await fs.readFile(uriScriptCreateDatabase, "utf-8").catch(err=>console.log(err));
    createDataBase = createDataBase.replace(
      /`cocodoc`/g,
      "`" + config.mysqlDatabase + "`"
    );
    connection.query(createDataBase, (error, result) => {
      if (error) {
        return reject("Operacion creacion de base de datos no completada");
      }
      return resolve("🚀 Database creation script executed successfully. 🚀");
    });
  });

// Create scopes
const createScopes = (connection, uriScriptCreateScopes) =>
  new Promise(async (resolve, reject) => {
    let createScopes = await fs.readFile(uriScriptCreateScopes, "utf-8").catch(err=>console.log(err));
    createScopes = createScopes.replace(
      /`cocodoc`/g,
      "`" + config.mysqlDatabase + "`"
    );
    connection.query(createScopes, (error, result) => {
      if (error) return reject("Operacion creacion de scopes no completada");
      return resolve("🔑 The role and scope entry successfully completed. 🔑");
    });
  });

// Create admin
const createAdmin = (connection) =>
  new Promise((resolve, reject) => {
    const createAdminScript =
      "use `" +
      config.mysqlDatabase +
      "`; call sp_ingreso_usuario(?,?,?,?,?,?);";
    connection.query(
      createAdminScript,
      [
        "0123456789",
        config.defaultAdminUsername,
        config.defaultAdminUsername,
        config.defaultAdminUsername,
        config.defaultAdminUsername,
        1,
      ],
      (error, result) => {
        if (error) return reject(error);
        return resolve(
          "👷 The administrator user was successfully registered. 👷"
        );
      }
    );
  });

let connection = mysql.createConnection(connectionSettings);
isCreated = null;
verifyConnection(connection)
  .then((msg) => {
    SUCCESS(msg);
    return verifyDatabase(connection, config.mysqlDatabase);
  })
  .then((msg) => {
    SUCCESS(msg);
    isCreated = true;
    console.log(isCreated)
    return createDatabase(connection, config.scriptCreateDb);
  })
  .then((msg) => {
    SUCCESS(msg);
    return createScopes(connection, config.scriptCreateScopes);
  })
  .then((msg) => {
    SUCCESS(msg);
    return createAdmin(connection);
  })
  .then((msg) => {
    SUCCESS(msg);
    process.exit(0);
  })
  .catch(async (error) => {
    console.log(error)
    if (isCreated) {
      let is = await dropDb(connection);
      is ? console.log(chalk.bgRedBright.whiteBright(`Drop database: ${config.mysqlDatabase}`)) : console.log(`No action.`)
    }
    ERROR(error);
  })

process.on("unhandledRejection", async (reason, promise) => {
    if (isCreated) {
      let is = await dropDb(connection);
      is ? console.log(chalk.bgRedBright.whiteBright(`Drop database: ${config.mysqlDatabase}`)) : console.log(`No action.`)
    }
  ERROR(reason);
});
