// scopes permitidos

scopesValidationHandler = ({ allowedScope }) => {
    return (req, res, next) => {
        if (!req.user || (req.user && !req.user.SCOPES)) {
            next('No autorizado');
        }
        const access = req.user.SCOPES.includes(allowedScope);
        if (access) {
            next()
        } else {
            next({ status: 401, message: 'Permisos insuficientes' })
        }
    };
};

module.exports.scopesValidationHandler = scopesValidationHandler