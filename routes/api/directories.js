const express = require("express");
const passport = require("passport");
const router = express.Router();
const { FileSystemService } = require("../../services/directory");
const validationHandler = require("../../utils/middleware/validationHandler");
const { scopesValidationHandler } = require('../../utils/middleware/scopesValidationHandler')
const {
    _folderCreateSchema,
    _folderIdSchemaSchema,
    _folderUpdateSchema
} = require("../../utils/schemas/verifyFolder");

router
    .get(
        "/",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: 'read:directory' }),
        async(req, res, next) => {
            let fss = new FileSystemService();
            fss
                .getDirectory()
                .then(directory => {
                    res.status(200).json({
                        data: directory,
                        message: "Directorio de Cocodoc",
                        ok: true,
                        status: 200,
                        statusText: "Ok"
                    });
                })
                .catch(next);
        }
    )
    .post(
        "/",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: 'create:directory' }),
        validationHandler(_folderCreateSchema),
        async(req, res, next) => {
            const { body } = req;
            let fss = new FileSystemService();
            fss
                .createFolder(body)
                .then(resp => {
                    res.status(201).json({
                        data: resp,
                        message: "Carpeta creada",
                        ok: true,
                        status: 201,
                        statusText: "Created"
                    });
                })
                .catch(next);
        }
    )
    .put(
        "/",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: 'update:directory' }),
        validationHandler(_folderUpdateSchema),
        async(req, res, next) => {
            const { body } = req;
            let fss = new FileSystemService();
            fss
                .renameFolder(body)
                .then(resp => {
                    res.status(201).json({
                        data: resp,
                        message: "Nombre de carpeta modificada",
                        ok: true,
                        status: 201,
                        statusText: "Created"
                    });
                })
                .catch(next);
        }
    )
    .delete(
        "/",
        passport.authenticate("jwt", { session: false }),
        scopesValidationHandler({ allowedScope: 'delete:directory' }),
        validationHandler(_folderIdSchemaSchema),
        async(req, res, next) => {
            const { body } = req;
            let fss = new FileSystemService();
            fss
                .removeFolder(body)
                .then(resp => {
                    res.status(200).json({
                        data: resp,
                        message: "Carpeta eliminada",
                        ok: true,
                        status: 200,
                        statusText: "ok"
                    });
                })
                .catch(next);
        }
    );
module.exports = router;