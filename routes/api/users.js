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

const router = express.Router();
router
    .get(
        "/",
        passport.authenticate("jwt", { session: false }), // prettier-ignore
<<<<<<< HEAD
        scopesValidationHandler({ allowedScope: "read:users" }),
=======
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
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
<<<<<<< HEAD
    .post(
        "/search",
        passport.authenticate("jwt", { session: false }), // prettier-ignore
        scopesValidationHandler({ allowedScope: "read:users" }),
        validationHandler(_KeywordUserSearch, "body"),
        (req, res, next) => {
            const { keyword } = req.body;
            // console.log(keyword)
            let us = new UsersServices();
            us.searchUser(keyword)
                .then(users => {
                    res.status(200).json({
                        Message: "Resultados",
                        Coincidences: users,
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
                })
                .catch(error => {
                    console.log('ERROR', error)
                    next(error)
                });
        }
    )
=======
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
    .get(
        "/:id",
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
<<<<<<< HEAD
                        ID_ROL,
                        TIPO_USUARIO
=======
                        ID_ROL
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
                    } = user;
                    user = {
                        Cedula: CEDULA,
                        PrimerNombre: PRIMER_NOMBRE,
                        SegundoNombre: SEGUNDO_NOMBRE,
                        PrimerApellido: PRIMER_APELLIDO,
                        SegundoApellido: SEGUNDO_APELLIDO,
                        Id: ID,
<<<<<<< HEAD
                        IdRol: ID_ROL,
                        TipoUsuario: TIPO_USUARIO
                    };
                    res.status(200).json({
                        User: user,
                        Message: "Usuario obtenido",
                        Ok: true,
                        Status: 200,
                        Statustext: "Ok"
=======
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
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
                    });
                })
                .catch(next);
        }
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: "create:users" }),
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
        scopesValidationHandler({ allowedScope: "update:users" }),
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
<<<<<<< HEAD
                        StatusText: "ok"
=======
                        StatusText: "Created"
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
                    });
                })
                .catch(next);
        }
    )
    .delete(
        "/:id",
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
                    res.status(200).json({
<<<<<<< HEAD
                        UsuarioEliminado: Boolean(resp),
=======
                        "UsuarioEliminado": Boolean(resp),
>>>>>>> 9a7cd8e94dd43b7cd9567e03d2bd09c94d6584b5
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
                })
                .catch(next);
        }
    );

module.exports = router;