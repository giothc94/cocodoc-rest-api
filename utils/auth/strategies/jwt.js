const jwt = require("jsonwebtoken");
const passport = require("passport");
const { config } = require("../../../config/index");
const { UsersServices } = require("../../../services/users");
const { Strategy, ExtractJwt } = require("passport-jwt");

passport.use(
    new Strategy({
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async(tokenPayload, cb) => {
            const usersService = new UsersServices();
            const userId = jwt.verify(
                tokenPayload.sub,
                config.authUserKeySecret
            );
            try {
                const user = await usersService.getUser(userId);
                cb(null, {...user, scopes: tokenPayload.scopes });
            } catch (error) {
                return cb({ error: { message: "no autorizado", status: 401 } });
            }
        }
    )
);