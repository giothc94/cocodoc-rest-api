const express = require('express');
const router = express.Router();
const { UsersServices } = require('../../services/users');

router.get('/', async function(req, res, next) {
    let su = new UsersServices();
    su.getRoles()
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