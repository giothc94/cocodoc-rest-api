require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbCollectionName: process.env.DB_COLLECTION_NAME,
  //mysql
  mysqlHost: process.env.MYSQL_HOST,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlDatabase: process.env.MYSQL_DATABASE,
  //FileSystem
  dirRoot: process.env.ROOT,
  dirReports: process.env.PATH_REPORTS,
  tempImg: process.env.TEMP_IMG,
  pathPapelera: process.env.PATH_PAPELERA,
  //users
  defaultAdminUsername: process.env.DEFAULT_ADMIN_USERNAME,
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  // auth
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  authUserKeySecret: process.env.AUTH_USER_KEY_SECRET,
  // api keys
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
  // scripts
  scriptCreateDb: process.env.SCRIPT_CREATE_DB,
  scriptCreateScopes: process.env.SCRIPT_CREATE_SCOPES,
};
module.exports = { config };
