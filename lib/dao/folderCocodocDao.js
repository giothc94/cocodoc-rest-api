const MySql = require("../mysql");
const path = require("path");
class FolderCocodoc {
  constructor() {
    this.mysql = new MySql();
  }

  checkFolderExistenceById = async id => {
    return new Promise((resolve, reject) => {
      const SQL = `select exists(SELECT true FROM cocodoc.folders where folders.id_folder = ?) as "exist";`;
      this.mysql
        .connection()
        .then(connection => {
          connection.query(SQL, [id], (error, resp) => {
            if (error) reject({ error: error });
            resp = JSON.parse(JSON.stringify(resp[0]));
            resolve({ exist: Boolean(resp.exist) });
          });
          connection.end();
        })
        .catch(reject);
    });
  };

  checkFolderExistenceByPath = async path_user => {
    return new Promise((resolve, reject) => {
      const SQL = `select * from folders where path_user_folder = ?;`;
      this.mysql
        .connection()
        .then(connection => {
          connection.query(SQL, [path_user], (error, resp) => {
            if (error) reject({ error: error });
            let l = resp && resp.length > 0 ? true : false;
            resolve({ check: l });
          });
          connection.end();
        })
        .catch(reject);
    });
  };

  getFolderById = async id => {
    console.log("ID", id);
    return new Promise((resolve, reject) => {
      const SQL = `select * from folders where id_folder = ?`;
      this.mysql
        .connection()
        .then(connection => {
          connection.query(SQL, [id], (error, resp) => {
            if (error) reject(error);
            let l = resp ? resp.length : 0;
            const row = l > 0 ? Object.assign({}, resp[0]) : null;
            if (row) {
              resolve({ status: 200, folder: row });
            } else {
              reject({ status: 404, message: "Carpeta no encontrada." });
            }
          });
          connection.end();
        })
        .catch(reject);
    });
  };

  rootExist = () => {
    return new Promise((resolve, reject) => {
      const SQL = `SELECT count(*) as total FROM cocodoc.folders where is_root = 1;`;
      this.mysql
        .connection()
        .then(connection => {
          connection.query(SQL, (error, [resp]) => {
            if (error) return reject(error);
            let { total } = JSON.parse(JSON.stringify(resp));
            if (total === 0) return resolve({exist:false});
            if (total === 1) {
                let SQL = `SELECT * FROM cocodoc.folders where is_root = 1;`;
                connection.query(SQL,(errorFolder,[folder])=>{
                    if (errorFolder) return reject(errorFolder);
                    return resolve({exist:true, folder:JSON.parse(JSON.stringify(folder))})
                })
                connection.end();
            }
            if (total > 1) return reject(new Error('Existe inconsistencia en la base de datos.'));
          });
        })
        .catch(reject);
    });
  };

  createFolder = async (nameFolder, destinationFolderCode) => {
    return new Promise(async (resolve, reject) => {
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
          return this.checkFolderExistenceByPath(this._pathUser);
        })
        .then(({ check }) => {
          if (check) {
            reject({
              status: 400,
              message:
                "No se pudo crear la carpeta, ya existe una con el mismo nombre."
            });
          } else {
            return this.mysql.connection();
          }
        })
        .then(connection => {
          const SQL = `INSERT INTO folders(id_folder,name_folder,cod_folder,path_system_folder,path_user_folder)VALUES(?,?,?,?,?);`;
          connection.query(
            SQL,
            [
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
          connection.end();
        })
        .catch(reject);
    });
  };

  createRootFolder = async (nameFolder) => {
    return new Promise(async (resolve, reject) => {
        const {config} = require('../../config/index')
        const DIR_NAME = `${config.dirRoot}`;
        let rootFolder = path.join(DIR_NAME,nameFolder)
        this.checkFolderExistenceByPath(rootFolder)
        .then(({ check }) => {
            if (check) {
                reject({
                    status: 400,
                    message:
                    "No se pudo crear la carpeta, ya existe una con el mismo nombre."
                });
            } else {
                this._nameFolder = nameFolder.toLowerCase();
                this._id = `${Date.now()}`;
                this._cod = this._id;
                this._pathSystem = path.join(
                  `${DIR_NAME}`,
                  `${this._id}-${this._nameFolder}`
                );
                this._pathUser = `/${this._nameFolder}`
            return this.mysql.connection();
          }
        })
        .then(connection => {
          const SQL = `INSERT INTO folders(id_folder,name_folder,cod_folder,path_system_folder,path_user_folder,is_root)VALUES(?,?,?,?,?,1);`;
          connection.query(
            SQL,
            [
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
          connection.end();
        })
        .catch(reject);
    });
  };

  renameFolder = async (idFolder, newNameFolder) => {
    return new Promise((resolve, reject) => {
      this._nameFolder = newNameFolder.toLowerCase();
      this.getFolderById(idFolder)
        .then(({ folder: { path_system_folder, path_user_folder } }) => {
          this._id = idFolder;
          this._pathSystem = path.join(
            `${path_system_folder.slice(
              0,
              path_system_folder.length -
                path_system_folder.split("/").pop().length
            )}`,
            `${this._id}-${this._nameFolder}`
          );
          this._pathUser = path.join(
            `${path_user_folder.slice(
              0,
              path_user_folder.length - path_user_folder.split("/").pop().length
            )}`,
            `${this._nameFolder}`
          );
          return this.checkFolderExistenceByPath(this._pathUser);
        })
        .then(({ check }) => {
          if (check) {
            reject({
              status: 400,
              message:
                "No se pudo renombrar la carpeta, ya existe una con el mismo nombre."
            });
          } else {
            return this.mysql.connection();
          }
        })
        .then(connection => {
          const SQL = `UPDATE folders SET name_folder = ?, path_system_folder = ?,path_user_folder = ? WHERE id_folder = ?;`;
          connection.query(
            SQL,
            [this._nameFolder, this._pathSystem, this._pathUser, this._id],
            (error, resp) => {
              if (error) reject(error);
              resolve(resp);
            }
          );
          connection.end();
        })
        .catch(reject);
    });
  };

  deleteFolder = async idFolder => {
    return new Promise((resolve, reject) => {
      const SQL = `DELETE FROM folders WHERE id_folder = ?;`;
      this.mysql
        .connection()
        .then(connection => {
          connection.query(SQL, [idFolder], (error, resp) => {
            if (error) reject(error);
            resolve(resp);
          });
          connection.end();
        })
        .catch(reject);
    });
  };
}
module.exports.FolderCocodoc = FolderCocodoc;

// var l = new FolderCocodoc()
// l.getFolderById('1566168914390')
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error))
