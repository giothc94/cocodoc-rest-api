const express = require("express");
const {
    validationPdfHandler,
    validationIdPdf,
    validationParamsPdf
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
                    res.status(200).json({
                        ...resp,
                        message: "Documento creado",
                        ok: true,
                        status: 200,
                        statusText: "Ok"
                    });
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
                    res.status(200).json({
                        Docs: resp,
                        Message: "Resultado de busqueda",
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
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
                .then(resp => {
                    fs.createReadStream(resp).pipe(res);
                })
                .catch(next);
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
                    res.status(200).json({
                        Match: resp,
                        Message: "Resultado de busqueda",
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
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
                    res.status(200).json({
                        Message: "Documento eliminado",
                        Ok: true,
                        Status: 200,
                        StatusText: "Ok"
                    });
                })
                .catch(next);
        }
    );

module.exports = router;