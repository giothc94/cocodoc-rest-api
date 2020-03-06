const express = require("express");
const passport = require("passport");
const { UsersServices } = require("../../services/users");
const validationHandler = require("../../utils/middleware/validationHandler");
const {
    _UserCreateSchema,
    _UserUpdateSchema,
    _UserIdSchema,
    _KeywordUserSearch
} = require("../../utils/schemas/verifyUser");
const {
    scopesValidationHandler
} = require("../../utils/middleware/scopesValidationHandler");
const responses = require('../../utils/response/responses')

const router = express.Router();
router
    .get(
        "/list",
        passport.authenticate("jwt", { session: false }), // prettier-ignore
        scopesValidationHandler({ allowedScope: "read:users" }),
        (req, res, next) => {
            let us = new UsersServices();
            us.getUsers()
                .then(users => {
                    responses.successResponse(res, 200, 'Lista de usuarios', users)
                })
                .catch(next);
        }
    )
    .post(
        "/search",
        passport.authenticate("jwt", { session: false }), // prettier-ignore
        scopesValidationHandler({ allowedScope: "read:users" }),
        validationHandler(_KeywordUserSearch, "body"),
        (req, res, next) => {
            const { keyword } = req.body;
            let us = new UsersServices();
            us.searchUser(keyword)
                .then(users => {
                    responses.successResponse(res, 200, 'Resultados', users)
                })
                .catch(error => {
                    console.log(error)
                    next(error)
                });
        }
    )
    .get(
        "/:id/get",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: "read:users" }),
        validationHandler(_UserIdSchema, "params"),
        (req, res, next) => {
            let su = new UsersServices();
            const {
                params: { id }
            } = req;
            su.getUser(id)
                .then(user => {
                    const {
                        CEDULA,
                        PRIMER_NOMBRE,
                        SEGUNDO_NOMBRE,
                        PRIMER_APELLIDO,
                        SEGUNDO_APELLIDO,
                        ID,
                        ID_ROL,
                        TIPO_USUARIO
                    } = user;
                    user = {
                        Cedula: CEDULA,
                        PrimerNombre: PRIMER_NOMBRE,
                        SegundoNombre: SEGUNDO_NOMBRE,
                        PrimerApellido: PRIMER_APELLIDO,
                        SegundoApellido: SEGUNDO_APELLIDO,
                        Id: ID,
                        IdRol: ID_ROL,
                        TipoUsuario: TIPO_USUARIO
                    };
                    responses.successResponse(res, 200, 'Usuario obtenido', user)
                })
                .catch(next);
        }
    )
    .post(
        "/create",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: "create:users" }),
        validationHandler(_UserCreateSchema),
        (req, res, next) => {
            const { body } = req;
            let su = new UsersServices();
            su.createUser(body)
                .then(resp => {
                    responses.successResponse(res, 201, 'Usuario creado', resp)
                })
                .catch(next);
        }
    )
    .put(
        "/update",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: "update:users" }),
        validationHandler(_UserUpdateSchema),
        (req, res, next) => {
            const { body } = req;
            let su = new UsersServices();
            su.updateUser(body)
                .then(resp => {
                    responses.successResponse(res, 200, 'Usuario modificado', resp)
                })
                .catch(next);
        }
    )
    .delete(
        "/:id/delete",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: "delete:users" }),
        validationHandler(_UserIdSchema, "params"),
        (req, res, next) => {
            const {
                params: { id }
            } = req;
            let su = new UsersServices();
            su.deleteUser(id)
                .then(resp => {
                    responses.successResponse(res, 200, 'Usuario eliminado')
                })
                .catch(next);
        }
    );

module.exports = router;