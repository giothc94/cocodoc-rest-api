const MySql = require('../mysql');
const crypto = require("crypto");

class Rol {
    constructor() {
        this.mysql = new MySql()
    }

    createRol = ({ nameRol }) => {
        const token = this.generateRandomToken();
        const SQL = `CALL sp_ingresar_rol(?,?)`;
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(SQL, [nameRol, token], (error, resp) => {
                        if (error) {
                            reject(error);
                        } else {
                            const _resp = resp[0] || null;
                            if (_resp[0].message) {
                                reject({ message: _resp[0].message, status: 400 });
                            }
                            resolve(JSON.parse(JSON.stringify(_resp[0])));
                        }
                    });
                    connection.end()
                })
                .catch(reject)
        });
    };

    createScopeForRol = ({ scope, keyRol }) => {
        const SQL = `call sp_ingresar_scope(?,?)`;
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(SQL, [scope, keyRol], (error, resp) => {
                        if (error) {
                            reject(error);
                        } else {
                            const _resp = resp[0] || null;
                            if (_resp[0].message) {
                                reject({ message: _resp[0].message, status: 400 });
                            }
                            resolve(JSON.parse(JSON.stringify(_resp[0])));
                        }
                    });
                    connection.end()
                })
                .catch(reject)
        });
    };

    getKeyRol = id => {
        const SQL = `SELECT rol_user.key FROM rol_user WHERE rol_user.id_rol = ?;`;
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(SQL, [id], (error, resp) => {
                        if (error) {
                            reject(error);
                        } else {
                            if (!resp.length) {
                                reject({ message: 'No hay resutados', status: 400 });
                            }
                            resolve(JSON.parse(JSON.stringify(resp[0])));
                        }
                    });
                    connection.end()
                })
                .catch(reject)
        });
    };

    getRolAndScopesByKey = key => {
        const SQL = `SELECT s.scope,ru.type_rol,ru.key as 'id' FROM rol_user ru INNER JOIN scopes s ON ru.id_rol = s.id_rol WHERE ru.key = ?;`;
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(SQL, [key], (error, resp) => {
                        if (error) {
                            reject(error);
                        } else {
                            if (!resp.length) {
                                reject({ message: 'No autorizado' });
                            }
                            let rol = resp.map(({ type_rol }) => type_rol).shift();
                            let scopes = resp.map(({ scope }) => scope);
                            let id = resp.map(({ id }) => id).shift();
                            resolve({ id, rol, scopes: scopes.sort() });
                        }
                    });
                    connection.end()
                })
                .catch(reject)
        });
    };
    getScopesByIdRol = id => {
        const SQL = `SELECT scopes.scope,scopes.id_scope FROM scopes where scopes.id_rol = ? order by scope asc;`
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(SQL, [id], (error, resp) => {
                        if (error) {
                            reject(error);
                        } else {
                            if (!resp.length) {
                                reject({ message: 'No hay resutados', status: 400 });
                            }
                            resolve(JSON.parse(JSON.stringify(resp)));
                        }
                    });
                    connection.end()
                })
                .catch(reject)
        })
    }

    getRolesUsersCocodoc = () => {
        const SQL = `select * from rol_user;`;
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(SQL, (err, resp) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(JSON.parse(JSON.stringify(resp)));
                        }
                    });
                    connection.end()
                })
                .catch(reject)
        });
    };
    deleteScopeById = ({ idScope }) => {
        const SQL = `DELETE FROM scopes WHERE scopes.id_scope = ?;`;
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(
                        SQL, [idScope], //prettier-ignore
                        (err, resp) => {
                            if (err) {
                                reject(err)
                            } else {
                                let response = JSON.parse(JSON.stringify(resp));
                                if (response.affectedRows) {
                                    resolve({
                                        change: false,
                                        message: "scope eliminado"
                                    });
                                } else if (!response.affectedRows) {
                                    reject({ error: "no se encontro ningun registro" });
                                }
                            }
                        }
                    )
                    connection.end()
                })
                .catch(reject)
        })
    }
}

module.exports.Rol = Rol

generateRandomToken = () => {
    const buffer = crypto.randomBytes(64);
    return buffer.toString("hex");
};

// var _ = new Rol();
// _.getScopesByIdRol(1)
//     .then(data => console.log(data))
//     .catch(error => console.log(error));