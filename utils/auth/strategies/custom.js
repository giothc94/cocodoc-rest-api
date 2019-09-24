const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportCustom = require("passport-custom");
const { config } = require("../../../config/index");
const { Session } = require("../../../lib/session");
const { UsersServices } = require("../../../services/users");
const { Strategy, ExtractJwt } = require("passport-jwt");

const CustomStrategy = passportCustom.Strategy;
passport.use(
    "ChangePasswordStrategy",
    new CustomStrategy(async(req, cb) => {
        try {
            let usersService = new UsersServices();
            const token = req.headers["authorization"].split(" ").pop();
            const payload = jwt.verify(token, config.authJwtSecret);
            const userId = payload.sub;
            const user = await usersService.getUser(userId);
            user.STATE = Boolean(user.STATE);
            if (!user.STATE) {
                cb("Unauthorized");
            }
            cb(null, {...user, Scopes: payload.scopes });
        } catch (error) {
            cb("Unauthorized");
        }
    })
);