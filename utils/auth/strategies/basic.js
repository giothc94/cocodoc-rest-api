const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const { UsersCocodoc } = require("../../../lib/dao/userCocodocDao");
const { RolesServices } = require("../../../services/roles");
const { config } = require("../../../config/index");
const jwt = require("jsonwebtoken");

passport.use(
    new BasicStrategy(async function(usr, passw, cb) {
        const userService = new UsersCocodoc();
        const rolesService = new RolesServices();
        try {
            const user = await userService.verifyUser({ user: usr, password: passw });
            const userKeyToken = await jwt.sign(user.ID, config.authUserKeySecret);
            const { key } = await rolesService.getKeyRol(user.ID_ROL);
            const scopes = await rolesService.getRolAndScopesByKey(key);

            const payload = {
                sub: userKeyToken,
                name: `${user.PRIMER_NOMBRE.charAt(0).toUpperCase() 
                    + user.PRIMER_NOMBRE.slice(1)} ${user.SEGUNDO_NOMBRE.charAt(0).toUpperCase() 
                    + user.SEGUNDO_NOMBRE.slice(1)} ${user.PRIMER_APELLIDO.charAt(0).toUpperCase() 
                    + user.PRIMER_APELLIDO.slice(1)} ${user.SEGUNDO_APELLIDO.charAt(0).toUpperCase() 
                    + user.SEGUNDO_APELLIDO.slice(1)}`, //prettier-ignore
                scopes: scopes.sort()
            };
            const authToken = jwt.sign(payload, config.authJwtSecret, {
                expiresIn: "2h"
            });
            payload.scopes = key;
            const response = {
                token: authToken,
                user: payload
            };
            return cb(null, response);
        } catch (error) {
            return cb(error);
        }
    })
);