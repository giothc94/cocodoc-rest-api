const express = require('express');
const router = express.Router();
const UsersServices = require('../../services/users');

router.get('/', async function(req, res) {
    su = new UsersServices();
    const roles = await su.getRoles()
    console.log(roles)
    res.status(200).json({
        data: roles,
        message: 'Lista de roles'
    })
});

module.exports = router;