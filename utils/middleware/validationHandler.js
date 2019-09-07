const joi = require("@hapi/joi");
const { config } = require("../../config/index");
const TEMP_IMG = `${config.tempImg}`;

const validate = (data, schema) => {
    const error = joi.validate(data, schema);
    return error;
};

const validationHandler = (schema, check = "body") => {
    return function(req, res, next) {
        const error = validate(req[check], schema);
        error.error ?
            next({ message: error.error.details[0].message, status: 400 }) :
            next();
    };
};

module.exports = validationHandler;