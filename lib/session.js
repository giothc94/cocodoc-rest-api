const MySql = require("./mysql");

class Session {
    constructor() {
        this.mysql = new MySql()
    }
    changeSessionState({
        idKeyUser,
        state,
        tokenExpirationDate = null,
        activeToken = null
    }) {
        return new Promise((resolve, reject) => {
            const SQL = `UPDATE cocodoc.key_user SET state = ?,tokenExpirationDate = ?,activeToken = ? WHERE id_key = ?;`;
            this.mysql.connection()
                .then(connection => {
                    connection.query(
                        SQL, // prettier-ignore
                        [state, tokenExpirationDate, activeToken, idKeyUser],
                        (error, resp) => {
                            if (error) {
                                reject(error);
                            } else {
                                let response = JSON.parse(JSON.stringify(resp));
                                if (response.affectedRows && !response.changedRows) {
                                    resolve({
                                        change: false,
                                        message: "no hubo cambio de sesión de usuario"
                                    });
                                } else if (response.affectedRows && response.changedRows) {
                                    let m = state ?
                                        "cambio de estado de sesión a activo" :
                                        "cambio de estado de sesión a inactivo";
                                    resolve({ change: true, message: m });
                                } else if (!response.affectedRows) {
                                    reject({ error: "no se encontro ningun registro" });
                                }
                            }
                        }
                    );
                    connection.end()
                })
                .catch(reject)
        });
    }

    getState = ({ idKey }) => {
        const SQL = `SELECT state,tokenExpirationDate FROM cocodoc.key_user WHERE id_key = ?;`;
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(SQL, [idKey], (error, resp) => {
                        if (error) {
                            reject(error)
                        } else {
                            if (resp.length > 0) {
                                resolve(JSON.parse(JSON.stringify(resp[0])))
                            } else {
                                reject({ message: 'sin resultados' })
                            }
                        }
                    })
                    connection.end()
                })
                .catch(reject)
        })
    }
}
module.exports.Session = Session;

// var session = new Session();
// session
//     .changeSessionState({ idKeyUser: 2, state: false })
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error));

// session
//     .getState({ idKey: 1 })
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error));