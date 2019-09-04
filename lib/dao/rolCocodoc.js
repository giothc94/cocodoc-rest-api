const { mysqlCon } = require("../mysql");
const crypto = require("crypto");

class Rol {
    constructor() {}

    createRol = ({ nameRol }) => {
        const token = this.generateRandomToken();
        const SQL = `CALL sp_ingresar_rol(?,?)`;
        return new Promise((resolve, reject) => {
            mysqlCon.query(SQL, [nameRol, token], (error, resp) => {
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
        });
    };

    createScopeForRol = ({ scope, keyRol }) => {
        const SQL = `call sp_ingresar_scope(?,?)`;
        return new Promise((resolve, reject) => {
            mysqlCon.query(SQL, [scope, keyRol], (error, resp) => {
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
        });
    };

    getKeyRol = id => {
        const SQL = `SELECT rol_user.key FROM cocodoc.rol_user WHERE rol_user.id_rol = ?;`;
        return new Promise((resolve, reject) => {
            mysqlCon.query(SQL, [id], (error, resp) => {
                if (error) {
                    reject(error);
                } else {
                    if (!resp.length) {
                        reject({ message: 'No hay resutados', status: 400 });
                    }
                    resolve(JSON.parse(JSON.stringify(resp[0])));
                }
            });
        });
    };

    getRolAndScopesByKey = key => {
        const SQL = `SELECT s.scope FROM cocodoc.rol_user ru INNER JOIN cocodoc.scopes s ON ru.id_rol = s.id_rol WHERE ru.key = ?;`;
        return new Promise((resolve, reject) => {
            mysqlCon.query(SQL, [key], (error, resp) => {
                if (error) {
                    reject(error);
                } else {
                    if (!resp.length) {
                        reject({ message: 'unauthorized' });
                    }
                    let data = [];
                    for (const r of resp) {
                        data.push(r.scope);
                    }
                    resolve(data);
                }
            });
        });
    };

    getScopesByIdRol = id => {
        const SQL = `SELECT scopes.scope FROM cocodoc.scopes where scopes.id_rol = ? order by scope asc;`
        return new Promise((resolve, reject) => {
            mysqlCon.query(SQL, [id], (error, resp) => {
                if (error) {
                    reject(error);
                } else {
                    if (!resp.length) {
                        reject({ message: 'No hay resutados', status: 400 });
                    }
                    resolve(JSON.parse(JSON.stringify(resp)));
                }
            });
        })
    }

    getRolesUsersCocodoc = () => {
        const SQL = `select * from rol_user;`;
        return new Promise((resolve, reject) => {
            mysqlCon.query(SQL, (err, resp) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(JSON.stringify(resp)));
                }
            });
        });
    };
}

module.exports.Rol = Rol

generateRandomToken = () => {
    const buffer = crypto.randomBytes(64);
    return buffer.toString("hex");
};

// var _ = new Rol();
// _.getRolAndScopesByKey('12d23efaa41b360ca11bfa00ab39c8d2a7b7cc345ca2d9efadad63e8989d728957b0763ccf5958ec424586f8b58acbb4cfa1210e1da53eeaf32c5176cfc16251')
//     .then(data => console.log(data))
//     .catch(error => console.log(error));