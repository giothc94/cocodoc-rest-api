const express = require("express");
const passport = require("passport");
const router = express.Router();
const { FileSystemService } = require("../../services/directory");
const validationHandler = require("../../utils/middleware/validationHandler");
const {
  scopesValidationHandler
} = require("../../utils/middleware/scopesValidationHandler");
const {
  _folderCreateSchema,
  _folderIdSchemaSchema,
  _folderUpdateSchema,
  _rootFolderCreateSchema
} = require("../../utils/schemas/verifyFolder");
const responses = require("../../utils/response/responses");
router
  .get(
    "/",
    passport.authenticate("jwt", { session: false }),
    scopesValidationHandler({ allowedScope: "read:directory" }),
    async (req, res, next) => {
      let fss = new FileSystemService();
      fss
        .getDirectory()
        .then(directory => {
          responses.successResponse(res, 200, "Directorio de Cocodoc", {
            ...directory
          });
        })
        .catch(next);
    }
  )
  .post(
    "/",
    passport.authenticate("jwt", { session: false }),
    scopesValidationHandler({ allowedScope: "create:directory" }),
    validationHandler(_folderCreateSchema),
    async (req, res, next) => {
      const { body } = req;
      let fss = new FileSystemService();
      fss
        .createFolder(body)
        .then(resp => {
          responses.successResponse(res, 201, "Carpeta creada", { ...resp });
        })
        .catch(next);
    }
  )
  .post(
    "/create-root-folder",
    passport.authenticate("jwt", { session: false }),
    scopesValidationHandler({ allowedScope: "create:directory" }),
    validationHandler(_rootFolderCreateSchema),
    async (req, res, next) => {
      const { body } = req;
      let fss = new FileSystemService();
      fss
        .createRootFolder(body)
        .then(resp => {
          responses.successResponse(res, 201, "Carpeta creada", { ...resp });
        })
        .catch(next);
    }
  )
  .put(
    "/",
    passport.authenticate("jwt", { session: false }),
    scopesValidationHandler({ allowedScope: "update:directory" }),
    validationHandler(_folderUpdateSchema),
    async (req, res, next) => {
      const { body } = req;
      let fss = new FileSystemService();
      fss
        .renameFolder(body)
        .then(resp => {
          responses.successResponse(res, 201, "Nombre de carpeta modificada", {
            ...resp
          });
        })
        .catch(next);
    }
  )
  .delete(
    "/:idFolder",
    passport.authenticate("jwt", { session: false }),
    scopesValidationHandler({ allowedScope: "delete:directory" }),
    validationHandler(_folderIdSchemaSchema, "params"),
    async (req, res, next) => {
      const { params } = req;
      let fss = new FileSystemService();
      fss
        .removeFolder(params)
        .then(resp => {
          responses.successResponse(res, 200, "Carpeta eliminada");
        })
        .catch(next);
    }
  );
module.exports = router;
