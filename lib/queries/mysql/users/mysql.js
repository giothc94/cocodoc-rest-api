const { mysqlCon } = require('../../../mysql');
/**
 * @param user
 * 
 */
function create({ cedula, pNombre, sNombre, pApellido, sApellido, idRol }) {
    SQL = `call sp_ingreso_usuario('${cedula}','${pNombre}','${sNombre}','${pApellido}','${sApellido}',${idRol});`
    return new Promise((resolve, reject) => {
        mysqlCon.query(SQL, (err, resp) => {
            if (err) {
                reject(err)
            } else {
                let res = JSON.parse(JSON.stringify(resp[0])) || null
                if (res[0].existe) {
                    reject({ message: 'El usuario ya existe' })
                } else {
                    resolve(JSON.parse(JSON.stringify(resp)))
                }
            }
        })
    })

}
module.exports.create = create

function getRoles() {
    SQL = `select * from rol_user;`
    return new Promise((resolve, reject) => {
        mysqlCon.query(SQL, (err, resp) => {
            if (err) {
                console.log('No se pudo obtener la lista de roles')
                reject(err)
            } else {
                console.log('Lista de roles obtenida')
                resolve(JSON.parse(JSON.stringify(resp)))
            }
        });
    })
}
module.exports.getRoles = getRoles

function getUsers() {
    SQL = `CALL sp_listar_usuarios;`
    return new Promise((resolve, reject) => {
        mysqlCon.query(SQL, (err, resp) => {
            if (err) {
                console.log('No se pudo obtener la lista de usuarios')
                reject(err)
            } else {
                console.log('Lista de usuarios obtenida')
                resolve(JSON.parse(JSON.stringify(resp[0])))
            }
        });
    })
}
module.exports.getUsers = getUsers

function getUser(id) {
    SQL = `call sp_obtener_usuario(${id});`
    return new Promise((resolve, reject) => {
        console.log(SQL)
        mysqlCon.query(SQL, (err, resp) => {
            if (err) {
                console.log('No se pudo obtener el usuario')
                reject(err)
            } else {
                console.log('Usuario obtenido')
                resolve(JSON.parse(JSON.stringify(resp[0])))
            }
        });
    })
}
module.exports.getUser = getUser

function deleteUser(id) {
    SQL = `call sp_eliminar_usuario(${id});`
    return new Promise((resolve, reject) => {
        mysqlCon.query(SQL, (err, resp) => {
            if (err) {
                // console.log('No se pudo eliminar el usuario')
                reject(err)
            } else {
                const r = JSON.parse(JSON.stringify(resp[0]))
                if (r[0].MESSAGE_ERROR) {
                    // console.log('No se pudo eliminar el usuario')
                    reject({ MESSAGE_ERROR: 'No se pudo eliminar el usuario, no existe el registro' })
                }
                // console.log('Usuario eliminado', r)
                resolve(r[0])
            }
        });
    })
}
module.exports.deleteUser = deleteUser

function updateUser({ id, cedula, pNombre, sNombre, pApellido, sApellido, idRol }) {
    SQL = `call sp_actulizar_usuario(${id},'${cedula}','${pNombre}','${sNombre}','${pApellido}','${sApellido}',${idRol});`
    return new Promise((resolve, reject) => {
        mysqlCon.query(SQL, (err, resp) => {
            if (err) {
                // console.log('No se pudo eliminar el usuario')
                reject(err)
            } else {
                const r = JSON.parse(JSON.stringify(resp[0]))
                if (r[0].MESSAGE_ERROR) {
                    // console.log('No se pudo eliminar el usuario')
                    reject({ MESSAGE_ERROR: r[0].MESSAGE_ERROR })
                }
                // console.log('Usuario eliminado', r)
                resolve(r[0])
            }
        });
    })
}
module.exports.updateUser = updateUser