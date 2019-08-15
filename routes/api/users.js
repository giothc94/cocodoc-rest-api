const express = require('express');
const router = express.Router();
const UsersServices = require('../../services/users');


router.get('/', async function(req, res) {
    su = new UsersServices();
    const users = await su.getUsers();
    res.status(200).json({
        data: users,
        message: 'Lista de usuarios'
    })

});
router.get('/:id', async function(req, res) {
    su = new UsersServices();
    const { params } = req
    const user = await su.getUser(params.id)
    if (user) {
        res.status(200).json({
            data: user,
            message: 'Usuario obtenido',
            ok: true,
            status: 200,
            statusText: "Ok"
        })
    } else {
        res.status(404).json({
            response: res.message,
            message: 'No se encontro usuario',
            ok: false,
            status: 404,
            statusText: "Not found"
        })
    }

});
router.post('/', async function(req, res) {
    newuser = JSON.parse(JSON.stringify(req.body))
    su = new UsersServices();
    const resp = await su.createUser(newuser)
    if (resp.message) {
        res.status(400).json({
            response: resp.message,
            message: 'No se creo ningun usuario',
            ok: false,
            status: 400,
            statusText: "Bad Request"
        })
    } else {
        let r = resp[0]
        res.status(201).json({
            data: r[0],
            message: 'Usuario creado',
            ok: true,
            status: 201,
            statusText: "Created"
        })
    }
});

router.put('/', async function(req, res) {
    user = JSON.parse(JSON.stringify(req.body))
    su = new UsersServices();
    const resp = await su.updateUser(user)
    if (resp.MESSAGE_ERROR) {
        res.status(202).json({
            response: resp.MESSAGE_ERROR,
            message: 'No modifico el usuario',
            ok: false,
            status: 400,
            statusText: "Bad Request"
        })
    } else {
        res.status(201).json({
            data: resp,
            message: 'Usuario modificado',
            ok: true,
            status: 201,
            statusText: "Created"
        })
    }
});

router.delete('/:id', async(req, res) => {
    var { id } = req.params
    id = parseInt(id)
    if (!isNaN(id) && id > 0) {
        su = new UsersServices();
        const resps = await su.deleteUser(id)
        if (resps.MESSAGE_ERROR) {
            console.log('RESP', resps)
            res.status(202).json({
                message: resps.MESSAGE_ERROR,
                ok: false,
                status: 202,
                statusText: "Accepted"
            })
        } else {
            res.status(200).json({
                message: 'Usuario borrado',
                ok: true,
                status: 200,
                statusText: "Ok"
            })
        }
    } else {
        res.status(202).json({
            response: res.message,
            message: 'El parametro enviado debe ser un entero positivo',
            ok: false,
            status: 400,
            statusText: "Bad Request"
        })
    }
})

module.exports = router;