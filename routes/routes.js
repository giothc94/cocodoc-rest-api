var UsersApiRouter = require("./api/users");
var FolderApiRouter = require("./api/directories");
var RolesApiRouter = require("./api/roles");
var FilesApiRouter = require("./api/files");
var AuthApiRouter = require("./api/auth");
var ChangePassword = require("./api/changePassword");
exports.routes = (app) => {
    app.use("/api/auth", AuthApiRouter);
    app.use("/api/auth/change-password", ChangePassword);
    app.use("/api/users", UsersApiRouter);
    app.use("/api/directories", FolderApiRouter);
    app.use("/api/roles", RolesApiRouter);
    app.use("/api/files", FilesApiRouter);
}