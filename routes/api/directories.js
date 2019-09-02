const express = require("express");
const router = express.Router();
const { FileSystemService } = require("../../services/directory");
const validationHandler = require("../../utils/middleware/validationHandler");
const {
    _folderCreateSchema,
    _folderIdSchemaSchema,
    _folderUpdateSchema
} = require("../../utils/schemas/verifyFolder");

router
    .get("/", async function(req, res, next) {
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
    })
    .post("/", validationHandler(_folderCreateSchema), async function(req, res, next) {
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
    })
    .put("/", validationHandler(_folderUpdateSchema), async function(req, res, next) {
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
    })
    .delete("/", validationHandler(_folderIdSchemaSchema), async(req, res, next) => {
        const { body } = req;
        let fss = new FileSystemService();
        fss
            .removeFolder(body)
            .then(resp => {
                res.status(201).json({
                    data: resp,
                    message: "Carpeta eliminada",
                    ok: true,
                    status: 200,
                    statusText: "ok"
                });
            })
            .catch(next);
    });
module.exports = router;