const jwt = require("jsonwebtoken");
const passport = require("passport");
const { config } = require("../../../config/index");
const { Session } = require("../../../lib/session");
const { UsersServices } = require("../../../services/users");
const { Strategy, ExtractJwt } = require("passport-jwt");

passport.use(
    new Strategy({
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async(tokenPayload, cb) => {
            const usersService = new UsersServices();
            const session = new Session();
            try {
                const userId = jwt.verify(tokenPayload.sub, config.authUserKeySecret);
                const user = await usersService.getUser(userId);
                let { state } = await session.getState({
                    idKey: user.KEY
                });
                state = Boolean(state);
                expiresIn = new Date(tokenPayload.expiresIn);
                user.TOKEN_EXPIRATION_DATE = new Date(user.TOKEN_EXPIRATION_DATE);
                if (
                    state &&
                    expiresIn.getMinutes() === user.TOKEN_EXPIRATION_DATE.getMinutes() &&
                    expiresIn.getHours() === user.TOKEN_EXPIRATION_DATE.getHours()
                ) {
                    cb(null, {...user, SCOPES: tokenPayload.scopes });
                } else {
                    return cb({ message: "no autorizado", status: 401 });
                }
            } catch (error) {
                return cb({ message: "no autorizado", status: 401 });
            }
        }
    )
);