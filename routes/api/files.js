const express = require("express");
const {
    validationPdfHandler,
    validationIdPdf,
    validationParamsPdf,
    validationUploadPdfHandler
} = require("../../utils/middleware/validationPdfHandler");
const {
    _pdfCreate,
    _idDocument,
    _documentQuery
} = require("../../utils/schemas/verifyPdf");
const passport = require("passport");
const fs = require("fs");
const router = express.Router();
const { DocumentsService } = require("../../services/documents");
const {
    scopesValidationHandler
} = require("../../utils/middleware/scopesValidationHandler");
const responses = require('../../utils/response/responses')

router
    .post(
        "/",
        passport.authenticate('jwt', { session: false }), // prettier-ignore
        scopesValidationHandler({ allowedScope: "create:files" }),
        validationPdfHandler(_pdfCreate),
        async(req, res, next) => {
            const { body } = req;
            const { user } = req;
            const pdf = new DocumentsService();
            pdf
                .createPdf(body, user)
                .then(resp => {
                    responses.successResponse(res, 200, 'Documento creado', {...resp })
                })
                .catch(next);
        }
    )
    .post(
        "/upload",
        passport.authenticate('jwt', { session: false }), // prettier-ignore
        scopesValidationHandler({ allowedScope: "create:files" }),
        validationUploadPdfHandler(_pdfCreate),
        async(req, res, next) => {
            const { body } = req;
            const { user } = req;
            const pdf = new DocumentsService();
            pdf
                .uploadPdf(body, user)
                .then(resp => {
                    responses.successResponse(res, 200, 'Documento cargado', {...resp })
                })
                .catch(next);
        }
    )
    .get(
        "/",
        passport.authenticate('jwt', { session: false }), // prettier-ignore
        scopesValidationHandler({ allowedScope: "read:files" }),
        async(req, res, next) => {
            const pdf = new DocumentsService();
            pdf
                .getAllPdf()
                .then(resp => {
                    responses.successResponse(res, 200, 'Resultado de busqueda', resp)
                })
                .catch(next);
        }
    )
    .get(
        "/search/:id",
        passport.authenticate('jwt', { session: false }), // prettier-ignore
        scopesValidationHandler({ allowedScope: "read:files" }),
        validationIdPdf(_idDocument), //prettier-ignore
        async(req, res, next) => {
            const {
                params: { id }
            } = req;
            const pdf = new DocumentsService();
            pdf
                .getPdf(id)
                .then(resp => res.sendFile(resp))
                .catch(error => {
                    console.log(error);
                    next(error)
                });
        }
    )
    .get(
        "/search",
        passport.authenticate('jwt', { session: false }), // prettier-ignore
        scopesValidationHandler({ allowedScope: "read:files" }),
        validationParamsPdf(_documentQuery), //prettier-ignore
        async(req, res, next) => {
            const {
                query: { query, queryParam }
            } = req;
            const pdf = new DocumentsService();
            pdf
                .searchPdf({ _query: query, queryParam: queryParam })
                .then(resp => {
                    responses.successResponse(res, 200, 'Resultado de busqueda', resp)
                })
                .catch(next);
        }
    )
    .delete(
        "/:id",
        passport.authenticate('jwt', { session: false }), // prettier-ignore
        scopesValidationHandler({ allowedScope: "delete:files" }),
        validationIdPdf(_idDocument), //prettier-ignore
        async(req, res, next) => {
            const {
                params: { id }
            } = req;
            const pdf = new DocumentsService();
            pdf
                .deletePdf(id)
                .then(resp => {
                    responses.successResponse(res, 200, 'Documento eliminado')
                })
                .catch(next);
        }
    );

module.exports = router;