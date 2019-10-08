const express = require("express");
const router = express.Router();
const passport = require("passport");
const { SessionService } = require("../../services/session");
const responses = require("../../utils/response/responses");

router.post(
    "/log-in",
    passport.authenticate("basic", { session: false }),
    async(req, res, next) => responses.successResponse(res, 200, "Usuario autenticado", req.user)
);

router.get(
    "/check",
    passport.authenticate("jwt", { session: false }),
    async(req, res, next) => responses.successResponse(res, 200, "Verificado")
);
router.post(
    "/sign-out",
    passport.authenticate("jwt", { session: false }),
    async(req, res, next) => {
        const { KEY } = req.user;
        var session = new SessionService();
        session
            .changeSessionState({ idKeyUser: KEY, state: false })
            .then(resp => {
                delete resp.change;
                responses.successResponse(res, 200, "Cambio de sesion", {
                    SessionState: "inactive",
                    ...resp
                });
            })
            .catch(next);
    }
);

module.exports = router;