const express = require("express");
const {
    validationPdfHandler,
    validationIdPdf
} = require("../../utils/middleware/validationPdfHandler");
const { _pdfCreate, _idDocument } = require("../../utils/schemas/verifyPdf");
const passport = require("passport");
const fs = require("fs");
const router = express.Router();
const { DocumentsService } = require("../../services/documents");
router
    .post(
        "/",
        passport.authenticate('jwt', { session: false }), // prettier-ignore
        validationPdfHandler(_pdfCreate),
        async(req, res, next) => {
            const { body } = req;
            const {
                user: {
                    ID,
                    CEDULA,
                    PRIMER_NOMBRE,
                    SEGUNDO_NOMBRE,
                    PRIMER_APELLIDO,
                    SEGUNDO_APELLIDO,
                    TIPO_USUARIO,
                    ID_ROL,
                    SCOPES
                }
            } = req;
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
        "/:id",
        passport.authenticate('jwt', { session: false }), // prettier-ignore
        validationIdPdf(_idDocument), //prettier-ignore 
        async(req, res, next) => {
            const { params: { id } } = req
            const pdf = new DocumentsService();
            pdf.getPdf(id)
                .then(resp => {
                    fs.createReadStream(resp).pipe(res);
                })
                .catch(next)
        });

module.exports = router;