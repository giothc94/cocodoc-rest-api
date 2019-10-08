const passport = require("passport");
const express = require("express");
const router = express.Router();
const { RolesServices } = require("../../services/roles");
const {
    _CreateScopeSchema,
    _KeyRolSchema
} = require("../../utils/schemas/verifyScope");
const validationHandler = require("../../utils/middleware/validationHandler");
const {
    scopesValidationHandler
} = require("../../utils/middleware/scopesValidationHandler");
const responses = require('../../utils/response/responses')

router
    .get(
        "/",
        passport.authenticate("jwt", { session: false }), //prettier-ignore
        scopesValidationHandler({ allowedScope: "read:roles" }),
        async(req, res, next) => {
            let rs = new RolesServices();
            rs.getRoles()
                .then(resp => {
                    responses.successResponse(res, 200, 'Lista de roles', resp)
                })
                .catch(next);
        }
    )
    .get(
        '/scopes', //prettier-ignore
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: "read:scopes" }),
        (req, res, next) => {
            const { keyRol } = req.params;
            let rs = new RolesServices();
            rs.getScopes()
                .then(resp => {
                    responses.successResponse(res, 200, 'Scopes', resp)
                })
                .catch(next);
        }
    )
    .get(
        '/scope/:keyRol', //prettier-ignore
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: "read:scopes" }),
        validationHandler(_KeyRolSchema, "params"),
        (req, res, next) => {
            const { keyRol } = req.params;
            let rs = new RolesServices();
            rs.getRolAndScopesByKey(keyRol)
                .then(resp => {
                    responses.successResponse(res, 200, 'Scope', resp)
                })
                .catch(next);
        }
    )
    .post(
        '/scope', //prettier-ignore
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: "create:scope" }),
        validationHandler(_CreateScopeSchema),
        (req, res, next) => {
            const { nameScope, keyRol } = req.body;
            let rs = new RolesServices();
            rs.createScopeForRol({ scope: nameScope, keyRol: keyRol })
                .then(resp => {
                    responses.successResponse(res, 200, 'Scope creado', resp)
                })
                .catch(next);
        }
    )
    .delete(
        '/scope/:idScope', //prettier-ignore
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: "delete:scope" }),
        (req, res, next) => {
            let rs = new RolesServices();
        }
    );

module.exports = router;