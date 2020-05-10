const fs = require("fs");
const path = require("path");
const dirTree = require("directory-tree");
const normalize = require("normalize-path")
const { config } = require("../config");
const { FolderCocodoc } = require("./dao/folderCocodocDao");

const DIR_NAME = `${config.dirRoot}`;
const DIRNAME_LENGTH = DIR_NAME.length;
class FileSystem extends FolderCocodoc {
  constructor() {
    super();
  }

  createFolderAndPath = ({ nameFolder, destinationFolderCode }) => {
    return new Promise(async (resolve, reject) => {
      this.createFolder(nameFolder, destinationFolderCode)
        .then(resp => {
          fs.mkdir(normalize(this._pathSystem), async error => {
            if (error) {
              await this.deleteFolder(this._id);
            } else {
              resolve({
                message: `La carpeta '${this._nameFolder}', se creo exitosamente`
              });
            }
          });
        })
        // .then(reject({ status: 400, message: `La carpeta '${this._nameFolder}', NO pudo ser creada` }))
        .catch(error => {
          reject(error);
        });
    });
  };
  createRootFolderAndPath = ({ nameFolder }) => {
    return new Promise(async (resolve, reject) => {
      this.rootExist()
        .then(({ exist, folder }) => {
          if (exist)
            return reject({ message: "ya existe la carpeta root" });
          return this.createRootFolder(nameFolder);
        })
        .then(resp => {
          fs.mkdir(normalize(this._pathSystem), async error => {
            if (error) {
              await this.deleteFolder(this._id);
            } else {
              resolve({
                message: `La carpeta '${this._nameFolder}', se creo exitosamente`
              });
            }
          });
        })
        // .then(reject({ status: 400, message: `La carpeta '${this._nameFolder}', NO pudo ser creada` }))
        .catch(error => {
          reject(error);
        });
    });
  };

  deleteFolderAndPath = ({ idFolder }) => {
    return new Promise((resolve, reject) => {
      let pathUser;
      this.getFolderById(idFolder)
        .then(({ folder: { path_system_folder, path_user_folder } }) => {
          fs.rmdir(normalize(path_system_folder), async error => {
            if (error) {
              if (error.code === "ENOTEMPTY") {
                return reject({
                  message: "La carpeta no se puede eliminar, no esta vacía."
                });
              }
            } else {
              pathUser = normalize(path_user_folder);
              this.deleteFolder(idFolder)
                .then(({ affectedRows }) => {
                  if (affectedRows > 0) {
                    resolve({
                      message: "Carpeta eliminada"
                    });
                  }
                })
                .catch(reject);
            }
          });
        })
        .catch(reject);
    });
  };

  renameFolderAndPath = ({ idFolder, newNameFolder }) => {
    return new Promise(async (resolve, reject) => {
      let oldPathSystem, pathSystem, pathUser;
      this.getFolderById(idFolder)
        .then(({ folder: { path_system_folder, path_user_folder } }) => {
          path_system_folder = normalize(path_system_folder)
          path_user_folder = normalize(path_user_folder)
          pathSystem = normalize(path.join(
            `${path_system_folder.slice(
              0,
              path_system_folder.length -
                path_system_folder.split("/").pop().length
            )}`,
            `${idFolder}-${newNameFolder}`
          ));
          pathUser = path_user_folder;
          oldPathSystem = path_system_folder;
          return this.renameFolder(idFolder, newNameFolder);
        })
        .then(() => {
          fs.rename(normalize(oldPathSystem), normalize(pathSystem), error => {
            if (error) reject(error);
            resolve({
              oldpath: pathUser,
              newpath: this._pathUser
            });
          });
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  };

  getDirectory = () => {
    return new Promise((resolve, reject) => {
      this.rootExist()
        .then(({ exist, folder }) => {
          if (exist) {
            fs.stat(folder.path_system_folder, (error, stat) => {
              if (error) {
                reject({
                  message:
                    "No se obtuvo el directorio, consulte con el administrador"
                });
              } else {
                let dir = dirTree(folder.path_system_folder, {
                  normalizePath: true
                });
                dir = relativePathRecursive(dir);
                resolve({
                  about: "Inventario documental interno por expediente",
                  producingUnit: "Comuna San José de Cocotog",
                  dir: dir
                });
              }
            });
          } else {
            reject({
              cod: "ENOROOT",
              message: "No existe la carpeta root"
            });
          }
        })
        .catch(err => console.log(err));
    });
  };
}

module.exports.FileSystem = FileSystem;

function generateFakePath(path, isDirectory) {
  path = normalize(path)
  let dirCode = path.slice(DIRNAME_LENGTH, path.length);
  let ap = dirCode.split("/");
  dirCode = "";
  ap.forEach(element => {
    if (element.split("-")[1]) {
      dirCode += "/" + element.split("-")[1];
    } else {
      dirCode += "/" + element; //.split('-')[1]
    }
  });
  return dirCode;
}

function relativePathRecursive(dir) {
  dir.path = normalize(dir.path)
  dir.name = dir.path
    .split("/")
    .pop()
    .split("-")[1];
  dir.code = dir.path
    .split("/")
    .pop()
    .split("-")[0];
  dir.path = generateFakePath(dir.path, dir.type === "directory");
  if (dir.children) {
    dir.children.forEach(element => {
      relativePathRecursive(element);
    });
  }
  return dir;
}

// let f = new FileSystem()

// f.getDirectory()
//     .then(resp => console.log(resp))
//     .catch(error => console.log("Error::", error));

// f.createFolderAndPath('test', '1566075783857')
//     .then(resp => console.log(resp))
//     .catch(error => console.log("Error::", error));

// f.deleteFolderAndPath('1566866542095')
//     .then(resp => console.log(resp))
//     .catch(error => console.log("Error::", error));

// f.renameFolderAndPath('1566866542095', 'Solo un test mas')
//     .then(resp => console.log(resp))
//     .catch(error => console.log("Error::", error));
