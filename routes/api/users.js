const express = require('express');
const router = express.Router();
const { UsersServices } = require('../../services/users');


router
    .get('/', function(req, res, next) {
        let us = new UsersServices();
        us.getUsers()
            .then(users => {
                res.status(200).json({
                    data: users,
                    message: 'Lista de usuarios',
                    ok: true,
                    status: 200,
                    statusText: "Ok"
                })
            })
            .catch(next)
    })
    .get('/:id', function(req, res, next) {
        let su = new UsersServices();
        const { params: { id } } = req
        su.getUser(id)
            .then(user => {
                res.status(200).json({
                    data: user,
                    message: 'Usuario obtenido',
                    ok: true,
                    status: 200,
                    statusText: "Ok"
                })
            })
            .catch(next)
    })
    .post('/', function(req, res, next) {
        const { body } = req
        let su = new UsersServices();
        su.createUser(body)
            .then(resp => {
                res.status(201).json({
                    data: resp,
                    message: 'Usuario creado',
                    ok: true,
                    status: 201,
                    statusText: "Created"
                })
            })
            .catch(next)
    })
    .put('/', function(req, res, next) {
        const { body } = req
        let su = new UsersServices();
        su.updateUser(body)
            .then(resp => {
                res.status(200).json({
                    data: resp,
                    message: 'Usuario modificado',
                    ok: true,
                    status: 200,
                    statusText: "Created"
                })
            })
            .catch(next)
    })
    .delete('/:id', (req, res, next) => {
        const { params: { id } } = req
        let su = new UsersServices();
        su.deleteUser(id)
            .then(resp => {
                res.status(200).json({
                    response: resp,
                    ok: true,
                    status: 200,
                    statusText: "Ok"
                })
            })
            .catch(next)
    })

module.exports = router;