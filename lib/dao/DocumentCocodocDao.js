const MySql = require("../../lib/mysql");

class DocumentCocodoc {
    constructor() {
        this.mysql = new MySql()
    }
    createDocumentCocodoc = ({
        idDocumet,
        nameDocument,
        registrationDate,
        lastModification,
        idFolder,
        idUser
    }) => {
        const SQL = `call sp_ingresar_documento(?,?,?,?,?,?);`;
        return new Promise(async(resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(
                        SQL, [
                            idDocumet,
                            nameDocument,
                            registrationDate,
                            lastModification,
                            idFolder,
                            idUser
                        ],
                        (error, resp) => {
                            if (error) {
                                reject(error);
                            } else {
                                const _resp = JSON.parse(JSON.stringify(resp[0])) || null;
                                if (_resp[0].message) {
                                    reject({..._resp[0], status: 400 });
                                } else {
                                    resolve(JSON.parse(JSON.stringify(_resp[0])));
                                }
                            }
                        }
                    );
                    connection.end()
                })
                .catch(reject)
        });
    };
    deleteDocumentCocodoc = ({ idDoc }) => {
        const SQL = `DELETE FROM cocodoc.documents WHERE documents.id_doc = ?;`;
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(SQL, [idDoc], (error, resp) => {
                        if (error) {
                            reject(error);
                        } else {
                            let response = JSON.parse(JSON.stringify(resp));
                            if (response.affectedRows) {
                                resolve({
                                    change: false,
                                    message: "documento eliminado"
                                });
                            } else if (!response.affectedRows) {
                                reject({ error: "no se encontro ningun registro" });
                            }
                        }
                    })
                    connection.end()
                })
                .catch(reject)
        })
    }
    getDocumentCocodoc = ({ idDoc }) => {
        const SQL = `SELECT f.path_system_folder,d.id_doc,d.name_doc FROM cocodoc.documents d inner join cocodoc.folders f on d.id_folder = f.id_folder where d.id_doc = ?;`
        return new Promise((resolve, reject) => {
            this.mysql.connection()
                .then(connection => {
                    connection.query(SQL, [idDoc], (error, resp) => {
                        if (error) {
                            reject(error);
                        } else {
                            const _resp = resp.length > 0 ? JSON.parse(JSON.stringify(resp.shift())) : null;
                            if (!_resp) {
                                reject({ message: 'no existe el documento', status: 400 });
                            } else {
                                resolve({..._resp });
                            }
                        }
                    })
                    connection.end()
                })
                .catch(reject)
        })
    };
};

module.exports.DocumentCocodoc = DocumentCocodoc;