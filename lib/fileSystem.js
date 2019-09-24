const fs = require('fs')
const path = require('path');
const dirTree = require('directory-tree')
const { config } = require('../config');
const { FolderCocodoc } = require('./dao/folderCocodocDao')

const DIR_NAME = `${config.dirRoot}`
const DIRNAME_LENGTH = DIR_NAME.length
class FileSystem extends FolderCocodoc {

    constructor() {
        super()
    }

    createFolderAndPath = ({ nameFolder, destinationFolderCode }) => {
        return new Promise(async(resolve, reject) => {
            this.createFolder(nameFolder, destinationFolderCode)
                .then(resp => {
                    fs.mkdir(this._pathSystem, (error) => {
                        if (error) {
                            this.deleteFolder(this._id)
                                .then(reject({ status: 400, message: `La carpeta '${this._nameFolder}', NO pudo ser creada` }))
                                .catch(reject)
                        } else {
                            resolve({ message: `La carpeta '${this._nameFolder}', se creo exitosamente` })
                        }
                    });
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    }

    deleteFolderAndPath = ({ idFolder }) => {
        return new Promise((resolve, reject) => {
            this.getFolderById(idFolder)
                .then(({ folder: { path_system_folder, path_user_folder } }) => {
                    fs.rmdir(path_system_folder, async(error) => {
                        if (error) {
                            if (error.code === 'ENOTEMPTY') reject({ message: 'La carpeta no se puede eliminar, no esta vacía.' })
                        } else {
                            this.deleteFolder(idFolder)
                                .then(() => {
                                    resolve({
                                        removed: true,
                                        pathRemoved: path_user_folder
                                    })
                                })
                                .catch(reject)
                        }
                    })
                })
                .catch(reject)
        })

    }

    renameFolderAndPath = ({ idFolder, newNameFolder }) => {
        return new Promise(async(resolve, reject) => {
            this.getFolderById(idFolder)
                .then(({ folder: { path_system_folder, path_user_folder } }) => {
                    let newPathSystem = path.join(
                        `${path_system_folder.slice(0, path_system_folder.length - path_system_folder.split("/").pop().length)}`,
                        `${idFolder}-${newNameFolder}`
                    );
                    this.renameFolder(idFolder, newNameFolder)
                        .then(() => {
                            fs.rename(path_system_folder, newPathSystem, (error) => {
                                if (error) reject(error);
                            })
                        })
                        .then(() => {
                            resolve({
                                rename: true,
                                oldpath: path_user_folder,
                                newpath: this._pathUser
                            })
                        })
                        .catch(reject)
                })
                .catch(reject)
        })
    }

    getDirectory = () => {
        let directory = path.join(DIR_NAME, '1566075783857-cocodoc')
        return new Promise((resolve, reject) => {
            fs.stat(directory, (error, stat) => {
                if (error) {
                    reject({
                        getDir: false,
                        error: {
                            code: error.code,
                            path: error.path,
                            message: error.message,
                            stack: error.stack
                        }
                    })
                } else {
                    let dir = dirTree(directory)
                    dir = relativePathRecursive(dir)
                    resolve({
                        getDir: true,
                        error: false,
                        about: 'Inventario documental interno por expediente',
                        producingUnit: 'Comuna San José de Cocotog',
                        objectDir: dir
                    })
                }
            })
        })

    }
}

module.exports.FileSystem = FileSystem

function generateFakePath(path, isDirectory) {
    let dirCode = path.slice(DIRNAME_LENGTH, path.length)
    let ap = dirCode.split('/')
    dirCode = ''
    ap.forEach((element) => {
        if (element.split('-')[1]) {
            dirCode += '/' + element.split('-')[1]
        } else {
            dirCode += '/' + element //.split('-')[1]
        }
    })
    return dirCode
}

function relativePathRecursive(dir) {
    dir.name = dir.path.split('/').pop().split('-')[1]
    dir.code = dir.path.split('/').pop().split('-')[0]
    dir.path = generateFakePath(dir.path, dir.type === 'directory')
    if (dir.children) {
        dir.children.forEach(element => {
            relativePathRecursive(element)
        });
    }
    return dir
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