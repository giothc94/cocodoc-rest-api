const passport = require("passport");
const express = require("express");
const router = express.Router();
const { RolesServices } = require("../../services/roles");
const { _CreateScopeSchema, _KeyRolSchema } = require('../../utils/schemas/verifyScope');
const validationHandler = require('../../utils/middleware/validationHandler');

router
    .get(
        "/",
        passport.authenticate("jwt", { session: false }), //prettier-ignore
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
                .catch(next)
        }
    )
    .get(
        '/scope/:keyRol', //prettier-ignore
        passport.authenticate("jwt", { session: false }),
        validationHandler(_KeyRolSchema, 'params'),
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
                .catch(next)
        }
    )
    .post(
        '/scope', //prettier-ignore
        passport.authenticate("jwt", { session: false }),
        validationHandler(_CreateScopeSchema),
        (req, res, next) => {
            const { nameScope, keyRol } = req.body
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
        (req, res, next) => {
            let rs = new RolesServices();
        }
    );

module.exports = router;