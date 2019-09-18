const { mysqlCon } = require("../mysql");

const path = require("path");
class FolderCocodoc {
    constructor() {}

    checkFolderExistenceById = async id => {
        return new Promise((resolve, reject) => {
            const SQL = `select exists(SELECT true FROM cocodoc.folders where folders.id_folder = ?) as "exist";`;
            mysqlCon.query(SQL, [id], (error, resp) => {
                if (error) reject({ error: error });
                resp = JSON.parse(JSON.stringify(resp[0]))
                resolve({ exist: Boolean(resp.exist) });
            });
        });
    };

    checkFolderExistenceByPath = async path_user => {
        return new Promise((resolve, reject) => {
            const SQL = `select * from folders where path_user_folder = ?;`;
            mysqlCon.query(SQL, [path_user], (error, resp) => {
                if (error) reject({ error: error });
                let l = resp && resp.length > 0 ? true : false

                resolve({ check: l });
            });
        });
    };

    getFolderById = async id => {
        return new Promise((resolve, reject) => {
            const SQL = `select * from folders where id_folder = ?`;
            mysqlCon.query(SQL, [id], (error, resp) => {
                if (error) reject(error);
                let l = resp ? resp.length : 0;
                const row = l > 0 ? Object.assign({}, resp[0]) : null
                if (row) {
                    resolve({ status: 200, folder: row });
                } else {
                    reject({ status: 404, message: 'Carpeta no encontrada.' })
                }
            });
        });
    };

    createFolder = async(nameFolder, destinationFolderCode) => {
        return new Promise(async(resolve, reject) => {
            this.getFolderById(destinationFolderCode)
                .then(({ folder: { path_system_folder, path_user_folder } }) => {
                    this._nameFolder = nameFolder.toLowerCase();
                    this._id = `${Date.now()}`;
                    this._cod = this._id;
                    this._pathSystem = path.join(
                        `${path_system_folder}`,
                        `${this._id}-${this._nameFolder}`
                    );
                    this._pathUser = path.join(
                        `${path_user_folder}`,
                        `${this._nameFolder}`
                    );
                    this.checkFolderExistenceByPath(this._pathUser)
                        .then(({ check }) => {
                            if (check) {
                                reject({ status: 400, error: "No se pudo crear la carpeta" });
                            } else {
                                const SQL = `INSERT INTO folders(id_folder,name_folder,cod_folder,path_system_folder,path_user_folder)VALUES(?,?,?,?,?);`;
                                mysqlCon.query(
                                    SQL, [
                                        this._id,
                                        this._nameFolder,
                                        this._cod,
                                        this._pathSystem,
                                        this._pathUser
                                    ],
                                    (error, resp) => {
                                        if (error) reject(error);
                                        resolve(resp);
                                    }
                                );
                            }
                        })
                        .catch(error => reject(error));
                })
                .catch(error => reject(error));
        });
    };

    renameFolder = async(idFolder, newNameFolder) => {
        return new Promise((resolve, reject) => {
            this._nameFolder = newNameFolder.toLowerCase();
            this.getFolderById(idFolder)
                .then(({ folder: { path_system_folder, path_user_folder } }) => {
                    this._id = idFolder;
                    this._pathSystem = path.join(
                        `${path_system_folder.slice(0, path_system_folder.length - path_system_folder.split("/").pop().length)}`,
                        `${this._id}-${this._nameFolder}`
                    );
                    this._pathUser = path.join(
                        `${path_user_folder.slice(0, path_user_folder.length - path_user_folder.split("/").pop().length)}`,
                        `${this._nameFolder}`
                    );
                    this.checkFolderExistenceByPath(this._pathUser)
                        .then(({ check }) => {
                            if (check) {
                                reject({ status: 400, error: "No se pudo renombrar la carpeta" });
                            } else {
                                const SQL = `UPDATE folders SET name_folder = ?, path_system_folder = ?,path_user_folder = ? WHERE id_folder = ?;`;
                                mysqlCon.query(
                                    SQL, [
                                        this._nameFolder,
                                        this._pathSystem,
                                        this._pathUser,
                                        this._id
                                    ],
                                    (error, resp) => {
                                        if (error) reject(error);
                                        resolve(resp);
                                    }
                                );
                            }
                        })
                        .catch(error => reject(error));

                })
                .catch(error => reject(error));
        });
    };

    deleteFolder = async idFolder => {
        return new Promise((resolve, reject) => {
            const SQL = `DELETE FROM folders WHERE id_folder = ?;`;
            mysqlCon.query(SQL, [idFolder], (error, resp) => {
                if (error) reject(error);
                resolve(resp);
            });
        });
    };
}
module.exports.FolderCocodoc = FolderCocodoc;

// var l = new FolderCocodoc()
// l.getFolderById('1566168914390')
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error))