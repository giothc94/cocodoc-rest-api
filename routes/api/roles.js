const express = require('express');
const router = express.Router();
const { RolesServices } = require('../../services/roles');

router.get('/', async function(req, res, next) {
    let rs = new RolesServices();
    rs.getRoles()
        .then(resp => {
            res.status(200).json({
                response: resp,
                message: 'Lista de roles',
                ok: true,
                status: 200,
                statusText: "Ok"
            })
        })
        .catch(next)
});

module.exports = router;