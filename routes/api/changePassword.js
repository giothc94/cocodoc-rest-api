const express = require("express");
const router = express.Router();
const passport = require("passport");
const { UsersServices } = require('../../services/users');
const validationHandler = require("../../utils/middleware/validationHandler");
const { _UpdateUserPassword } = require('../../utils/schemas/verifyUser');
const responses = require('../../utils/response/responses')

router.post(
    "/",
    passport.authenticate('ChangePasswordStrategy', { session: false }), //prettier-ignore
    validationHandler(_UpdateUserPassword),
    async(req, res, next) => {
        const { user: { KEY } } = req
        const { body: { newPassword } } = req;
        const us = new UsersServices();
        us.updatePasswordUser({ idKey: KEY, newPassword: newPassword })
            .then(resp => {
                delete resp.change
                responses.successResponse(res, 200, 'Cambio de password', {
                    ...resp,
                    ok: true,
                    status: 200,
                    statusText: "ok"
                })
            })
            .catch(next)
    }
);

module.exports = router;