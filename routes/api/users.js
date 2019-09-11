const express = require("express");
const passport = require("passport");
const { UsersServices } = require("../../services/users");
const validationHandler = require("../../utils/middleware/validationHandler");
const {
    _UserCreateSchema,
    _UserUpdateSchema,
    _UserIdSchema
} = require("../../utils/schemas/verifyUser");

const router = express.Router();
router
    .get(
        "/",
        passport.authenticate("jwt", { session: false }), // prettier-ignore
        (req, res, next) => {
            let us = new UsersServices();
            us.getUsers()
                .then(users => {
                    res.status(200).json({
                        Message: "Lista de usuarios",
                        ListUsers: users,
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
                })
                .catch(next);
        }
    )
    .get(
        "/:id",
        passport.authenticate("jwt", { session: false }),
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
                        ID_ROL
                    } = user;
                    user = {
                        Cedula: CEDULA,
                        PrimerNombre: PRIMER_NOMBRE,
                        SegundoNombre: SEGUNDO_NOMBRE,
                        PrimerApellido: PRIMER_APELLIDO,
                        SegundoApellido: SEGUNDO_APELLIDO,
                        Id: ID,
                        IdRol: ID_ROL
                    };
                    res.status(200).json({
                        User: user,
                        Response: {
                            Message: "Usuario obtenido",
                            Ok: true,
                            Status: 200,
                            Statustext: "Ok"
                        }
                    });
                })
                .catch(next);
        }
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        validationHandler(_UserCreateSchema),
        (req, res, next) => {
            const { body } = req;
            let su = new UsersServices();
            su.createUser(body)
                .then(resp => {
                    res.status(201).json({
                        User: resp,
                        Message: "Usuario creado",
                        Ok: true,
                        Status: 201,
                        Statustext: "Created"
                    });
                })
                .catch(next);
        }
    )
    .put(
        "/",
        passport.authenticate("jwt", { session: false }),
        validationHandler(_UserUpdateSchema),
        (req, res, next) => {
            const { body } = req;
            let su = new UsersServices();
            su.updateUser(body)
                .then(resp => {
                    res.status(200).json({
                        User: resp,
                        Message: "Usuario modificado",
                        Ok: true,
                        Status: 200,
                        StatusText: "Created"
                    });
                })
                .catch(next);
        }
    )
    .delete(
        "/:id",
        passport.authenticate("jwt", { session: false }),
        validationHandler(_UserIdSchema, "params"),
        (req, res, next) => {
            const {
                params: { id }
            } = req;
            let su = new UsersServices();
            su.deleteUser(id)
                .then(resp => {
                    res.status(200).json({
                        "UsuarioEliminado": Boolean(resp),
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
                })
                .catch(next);
        }
    );

module.exports = router;