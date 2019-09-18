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

router
    .get(
        "/",
        passport.authenticate("jwt", { session: false }), //prettier-ignore
        scopesValidationHandler({ allowedScope: "read:roles" }),
        async(req, res, next) => {
            let rs = new RolesServices();
            rs.getRoles()
                .then(resp => {
                    res.status(200).json({
                        Response: resp,
                        Message: "Lista de roles",
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
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
                    res.status(200).json({
                        Message: "Scopes",
                        ScopesDetail: resp,
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
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
                    res.status(200).json({
                        Message: "Scope",
                        Info: resp,
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
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
                    res.status(200).json({
                        Response: resp,
                        Message: "scope creado",
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
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