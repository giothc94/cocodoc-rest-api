const { mysqlCon } = require('../mysql');

class UsersCocodoc {
    constructor() {}

    createUserCocodoc = ({ cedula, pNombre, sNombre, pApellido, sApellido, idRol }) => {
        const SQL = `call sp_ingreso_usuario(?,?,?,?,?,?);`
        return new Promise((resolve, reject) => {
            mysqlCon.query(
                SQL, [
                    cedula,
                    pNombre.toLowerCase(),
                    sNombre.toLowerCase(),
                    pApellido.toLowerCase(),
                    sApellido.toLowerCase(),
                    idRol
                ],
                (err, resp) => {
                    if (err) {
                        reject(err)
                    } else {
                        let res = JSON.parse(JSON.stringify(resp[0])) || null
                        if (res[0].existe) {
                            reject({ message: 'El usuario ya existe', status: 400 })
                        } else {
                            resolve(JSON.parse(JSON.stringify(resp)))
                        }
                    }
                })
        })
    }

    getRolesUsersCocodoc = () => {
        const SQL = `select * from rol_user;`
        return new Promise((resolve, reject) => {
            mysqlCon.query(SQL, (err, resp) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(JSON.stringify(resp)))
                }
            });
        })
    }

    getUsersCocodoc = () => {
        const SQL = `CALL sp_listar_usuarios;`
        return new Promise((resolve, reject) => {
            mysqlCon.query(SQL, (err, resp) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(JSON.stringify(resp[0])))
                }
            });
        })
    }

    getUserCocodoc = (id) => {
        const SQL = `call sp_obtener_usuario(?);`
        return new Promise((resolve, reject) => {
            mysqlCon.query(
                SQL, [
                    id
                ],
                (err, resp) => {
                    if (err) {
                        reject(err)
                    } else {
                        const r = resp[0] ? JSON.parse(JSON.stringify(resp[0])) : null
                        if (!r) {
                            reject({ message: 'No existe', status: 404 })
                        }
                        resolve(r)
                    }
                });
        })
    }

    deleteUserCocodoc = (id) => {
        const SQL = `call sp_eliminar_usuario(?);`
        return new Promise((resolve, reject) => {
            mysqlCon.query(
                SQL, [
                    id
                ],
                (err, resp) => {
                    if (err) {
                        reject(err)
                    } else {
                        const r = JSON.parse(JSON.stringify(resp[0]))
                        if (r[0].MESSAGE_ERROR) {
                            reject({ message: r[0].MESSAGE_ERROR, status: 400 })
                        }
                        resolve(r[0])
                    }
                });
        })
    }

    updateUserCocodoc = ({ id, cedula, pNombre, sNombre, pApellido, sApellido, idRol }) => {
        const SQL = `call sp_actulizar_usuario(?,?,?,?,?,?,?);`
        return new Promise((resolve, reject) => {
            mysqlCon.query(
                SQL, [
                    id,
                    cedula,
                    pNombre.toLowerCase(),
                    sNombre.toLowerCase(),
                    pApellido.toLowerCase(),
                    sApellido.toLowerCase(),
                    idRol
                ],
                (err, resp) => {
                    if (err) {
                        reject(err)
                    } else {
                        const r = JSON.parse(JSON.stringify(resp[0]))
                        if (r[0].MESSAGE_ERROR) {
                            reject({ message: r[0].MESSAGE_ERROR, status: 400 })
                        }
                        resolve(r[0])
                    }
                });
        })
    }
}

module.exports.UsersCocodoc = UsersCocodoc