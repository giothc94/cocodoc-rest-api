const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const { UsersCocodoc } = require("../../../lib/dao/userCocodocDao");
const { RolesServices } = require("../../../services/roles");
const { config } = require("../../../config/index");
const { Session } = require("../../../lib/session");
const jwt = require("jsonwebtoken");

signAuthToken = (payload, expiresin) => {
    return jwt.sign(payload, config.authJwtSecret, {
        expiresIn: expiresin
    });
};
structureResponse = (payload, expiresIn = false, token = "") => {
    let response = {};
    if (expiresIn) {
        response.token = token;
        delete payload.scopes;
        response.user = payload;
        return response;
    } else {
        let exp = new Date();
        payload.expiresIn = exp.setHours(exp.getHours() + 2);
        // payload.expiresIn = exp.setSeconds(exp.getSeconds() + 30);
        response.token = signAuthToken(payload, "2h");
        delete payload.scopes;
        response.user = payload;
        return response;
    }
};
getTokenExpirationDate = token => {
    const result = jwt.verify(token, config.authJwtSecret);
    return JSON.parse(JSON.stringify(result)).message ?
        JSON.parse(JSON.stringify(result)).message :
        result;
};

passport.use(
    new BasicStrategy(async function(usr, passw, cb) {
        const userService = new UsersCocodoc();
        const rolesService = new RolesServices();
        try {
            const user = await userService.verifyUser({ user: usr, password: passw });
            user.STATE = Boolean(user.STATE);
            user.IS_NEW = Boolean(user.IS_NEW);
            const userKeyToken = await jwt.sign(user.ID, config.authUserKeySecret);
            const { key } = await rolesService.getKeyRol(user.ID_ROL);
            const { scopes } = await rolesService.getRolAndScopesByKey(key);

            const payload = {
                sub: userKeyToken,
                name: `${user.PRIMER_NOMBRE.charAt(0).toUpperCase() 
                    + user.PRIMER_NOMBRE.slice(1)} ${user.SEGUNDO_NOMBRE.charAt(0).toUpperCase() 
                    + user.SEGUNDO_NOMBRE.slice(1)} ${user.PRIMER_APELLIDO.charAt(0).toUpperCase() 
                    + user.PRIMER_APELLIDO.slice(1)} ${user.SEGUNDO_APELLIDO.charAt(0).toUpperCase() 
                    + user.SEGUNDO_APELLIDO.slice(1)}`, //prettier-ignore
                scopes: scopes.sort()
            };
            const now = new Date();
            const expirationDate = new Date(user.TOKEN_EXPIRATION_DATE);
            if (user.STATE && now < expirationDate) {
                // Si aun no expira
                let response = structureResponse(payload, true, user.ACTIVE_TOKEN);
                return cb(null, {
                    ...response,
                    session: "su sesión sigue activa, debe usar el mismo token"
                });
            } else if ((user.STATE && now >= expirationDate) || !user.STATE) {
                // si ya expiro o va a iniciar sesion
                const response = structureResponse(payload);
                const { expiresIn } = getTokenExpirationDate(response.token);
                let session = new Session();
                let { message } = await session.changeSessionState({
                    idKeyUser: user.KEY,
                    state: true,
                    tokenExpirationDate: new Date(expiresIn),
                    activeToken: response.token
                });
                return cb(null, {...response, session: message });
            }
        } catch (error) {
            return cb(error);
        }
    })
);