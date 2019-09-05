// scopes permitidos

scopesValidationHandler = allowedScopes => {
    return (req, res, next) => {
        if (!req.user || (req.user && !req.user.SCOPES)) {
            next('No autorizado');
        }
        const access = allowedScopes
            .map(allowedScope => req.user.SCOPES.includes(allowedScope))
            .find(allowed => Boolean(allowed));
        if (access) {
            next()
        } else {
            next('Permisos insuficientes')
        }
    };
};

module.exports.scopesValidationHandler = scopesValidationHandler