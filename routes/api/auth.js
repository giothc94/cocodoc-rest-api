const express = require("express");
const router = express.Router();
const passport = require("passport");
const { SessionService } = require('../../services/session')

router.post(
    "/log-in",
    passport.authenticate("basic", { session: false }),
    async(req, res, next) => {
        res.status(200).json({
            message: "Usuario autenticado",
            ...req.user
        });
    }
);

<<<<<<< HEAD
router.get(
    "/check",
    passport.authenticate("jwt", { session: false }),
    async(req, res, next) => {
        res.status(200).json({
            ok: 'verified'
        });
    }
);

=======
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
router.post(
    "/sign-out",
    passport.authenticate("jwt", { session: false }),
    async(req, res, next) => {
        const { KEY } = req.user
        var session = new SessionService();
        session.changeSessionState({ idKeyUser: KEY, state: false })
            .then(resp => {
                delete resp.change
                res.status(200).json({
                    SessionState: 'inactive',
                    ...resp
                });
            })
            .catch(next)
    }
);

module.exports = router;