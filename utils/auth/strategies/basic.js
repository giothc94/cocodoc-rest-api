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
<<<<<<< HEAD
    return JSON.parse(JSON.stringify(result)).message ?
        JSON.parse(JSON.stringify(result)).message :
        result;
=======
    return JSON.parse(JSON.stringify(result)).message ? JSON.parse(JSON.stringify(result)).message : result
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
};

passport.use(
    new BasicStrategy(async function(usr, passw, cb) {
        const userService = new UsersCocodoc();
        const rolesService = new RolesServices();
        try {
            const user = await userService.verifyUser({ user: usr, password: passw });
            user.STATE = Boolean(user.STATE);
            user.IS_NEW = Boolean(user.IS_NEW);
<<<<<<< HEAD
=======
            const userKeyToken = await jwt.sign(user.ID, config.authUserKeySecret);
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
            const { key } = await rolesService.getKeyRol(user.ID_ROL);
            const { scopes } = await rolesService.getRolAndScopesByKey(key);

            const payload = {
                sub: user.ID,
                name: `${user.PRIMER_NOMBRE.charAt(0).toUpperCase() 
                    + user.PRIMER_NOMBRE.slice(1)} ${user.SEGUNDO_NOMBRE.charAt(0).toUpperCase() 
                    + user.SEGUNDO_NOMBRE.slice(1)} ${user.PRIMER_APELLIDO.charAt(0).toUpperCase() 
                    + user.PRIMER_APELLIDO.slice(1)} ${user.SEGUNDO_APELLIDO.charAt(0).toUpperCase() 
                    + user.SEGUNDO_APELLIDO.slice(1)}`, //prettier-ignore
                scopes: scopes.sort()
            };
            const now = new Date();
<<<<<<< HEAD
            const expirationDate = new Date(user.TOKEN_EXPIRATION_DATE);
            if (user.STATE && now < expirationDate) {
                // Si aun no expira
                let response = structureResponse(payload, true, user.ACTIVE_TOKEN);
                response.isNew = user.IS_NEW
                return cb(null, {
                    ...response,
                    session: "su sesión sigue activa, debe usar el mismo token"
                });
            } else if ((user.STATE && now >= expirationDate) || !user.STATE) {
=======
            const expirationDate = new Date(user.TOKEN_EXPIRATION_DATE)
            if (user.STATE && now < expirationDate) {
                // Si aun no expira
                let response = structureResponse(payload, true, user.ACTIVE_TOKEN);
                return cb(null, {...response, session: "su sesión sigue activa, debe usar el mismo token" });
            } else if (
                (user.STATE && now >= expirationDate) ||
                !user.STATE
            ) {
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
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
<<<<<<< HEAD
                response.isNew = user.IS_NEW
                return cb(null, {...response, session: message, expiresIn: '2h' });
=======
                return cb(null, {...response, session: message });
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
            }
        } catch (error) {
            return cb(error);
        }
    })
);