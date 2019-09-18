const joi = require("@hapi/joi");
const { config } = require("../../config/index");
const TEMP_IMG = `${config.tempImg}`;
const path = require("path");

const validate = (data, schema) => {
    const error = joi.validate(data, schema);
    return error;
};

const validationPdfHandler = (
    schemaData,
    checkData = "body",
    checkFiles = "files"
) => {
    return (req, res, next) => {
        if (!req[checkData] || !req[checkFiles]) {
            next({ message: "se requiere body y files en el request", status: 400 });
        } else if (!req[checkFiles].images) {
            next({ message: "files.images es requerido", status: 400 });
        } else {
            var listImgs = [];
            if (Array.isArray(req[checkFiles].images)) {
                for (const img of req[checkFiles].images) {
                    listImgs.push(path.join(TEMP_IMG, img.name));
                    img.mv(path.join(TEMP_IMG, img.name), error => {
                        if (error) next({ message: "No se agrego la imagen", status: 400 });
                    });
                }
            } else {
                req[checkFiles].images.mv(
                    path.join(TEMP_IMG, req[checkFiles].images.name),
                    error => {
                        if (error) {
                            next({ message: "No se agrego la imagen", status: 400 });
                        }
                    }
                );
                listImgs.push(path.join(TEMP_IMG, req[checkFiles].images.name));
            }
            const error = validate(req[checkData], schemaData);
            req[checkData].documentsFiles = listImgs;
            error.error ?
                next({
                    message: error.error.details[0].message,
                    status: 400
                }) :
                next();
        }
    };
};
const validationIdPdf = (schemaData, checkData = "params") => {
    return (req, res, next) => {
        const { id } = req[checkData];
        if (!id) {
            next({ message: "se requiere el id en los params", status: 400 });
        } else {
            const error = validate(id, schemaData);
            error.error ?
                next({ message: error.error.details[0].message, status: 400 }) :
                next();
        }
    };
};
const validationParamsPdf = (schemaData, checkData = "query") => {
    return (req, res, next) => {
        const { query } = req[checkData];
        var { queryParam } = req[checkData];
        if (!query || !queryParam) {
            next({ message: "se requiere el query y queryParam en el query", status: 400 });
        } else {
            const error = validate({ query, queryParam }, schemaData);
            if (error.error) {
                next({ message: error.error.details[0].message, status: 400 })
            } else {
                req[checkData].queryParam = queryParam.replace(/ /g, "|")
                next();
            }
        }
    };
};

//REEMPLAZA EL VALIDATE
module.exports = { validationPdfHandler, validationIdPdf, validationParamsPdf };