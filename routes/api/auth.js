const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
    "/",
    passport.authenticate("basic", { session: false }),
    async(req, res, next) => {
        res.status(200).json({
            message: "Usuario autenticado",
            data: req.user
        });
    }
);

module.exports = router;