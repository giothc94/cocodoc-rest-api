const { config } = require('../config');

const fs = require('fs')

const fse = require('fs-extra')

const path = require('path');

const os = require('os')

const DIR_NAME = `${config.dirRoot}/public/documentos`
    // const DIR_NAME = `${}/public/documentos`
const dirTree = require('directory-tree')

async function createFolder(newPath) {
    // const newPath = path.join(DIR_NAME, newPath)
    return new Promise((resolve, reject) => {
        fs.stat(newPath, (error, stat) => {
            if (error) {
                fs.mkdir(newPath, { recursive: true }, (error) => {
                    if (error) {
                        reject({
                            message: `La ruta ${newPath}, NO se creo`,
                            error: error,
                            created: false
                        })
                    } else {
                        resolve({
                            message: `La ruta ${newPath}, se creo exitosamente`,
                            created: true
                        })
                    }
                });
            } else {
                reject({
                    message: `La ruta ${newPath} ya existe`,
                    created: false
                });
            }
        })
    })
}
module.exports.CreateFolder = createFolder

async function removeFolder(pathToRemove, options) {
    if (options) {
        if (options.recursive === true) {
            return new Promise((resolve, reject) => {
                fs.stat(pathToRemove, (error) => {
                    if (error) {
                        reject({
                            removed: false,
                            path: pathToRemove,
                            error: error
                        })
                    } else {
                        fse.remove(pathToRemove)
                            .then(() => {
                                resolve({
                                    removed: true,
                                    removed_Rf: true,
                                    error: false,
                                    path: pathToRemove
                                })
                            })
                            .catch((error) => {
                                reject({
                                    removed: false,
                                    error: error,
                                    path: pathToRemove
                                })
                            })
                    }
                })
            })
        }
    } else {
        return new Promise((resolve, reject) => {
            fs.rmdir(pathToRemove, (error) => {
                if (error) {
                    reject({
                        removed: false,
                        error: error,
                        path: pathToRemove
                    })
                } else {
                    resolve({
                        removed: true,
                        error: false,
                        path: pathToRemove
                    })
                }
            })
        })
    }
}
module.exports.RemoveFolder = removeFolder

async function rename(oldpath, newpath) {
    const equ = oldpath === newpath
    return new Promise((resolve, reject) => {
        fs.stat(oldpath, (error, statOld) => {
            if (error) {
                reject({
                    rename: false,
                    error: {
                        code: error.code,
                        path: error.path,
                        message: error.message,
                        stack: error.stack
                    }
                })
            } else {
                fs.stat(newpath, (error, statNew) => {
                    if (error) {
                        if (error.code === 'ENOENT') {
                            fs.rename(oldpath, newpath, (error) => {
                                if (error) {
                                    reject({
                                        rename: false,
                                        error: {
                                            code: error.code,
                                            path: error.path,
                                            message: error.message,
                                            stack: error.stack
                                        }
                                    })
                                } else {
                                    resolve({
                                        rename: true,
                                        error: false,
                                        oldpath: oldpath,
                                        newpath: newpath
                                    })
                                }
                            })
                        }
                    } else if (statNew && equ) {
                        resolve({
                            rename: false,
                            error: true,
                            equals: true,
                            oldpath: oldpath,
                            newpath: newpath
                        })
                    } else if (statNew) {
                        let errorExist = new Error(`Ya existe un ${statNew.isDirectory()?'directorio':'archivo'} con el mismo nombre !!`)
                        errorExist.code = 'EEXIST'
                        errorExist.path = newpath
                        errorExist.errno = os.constants.errno.EEXIST
                        reject({
                            rename: false,
                            error: {
                                code: errorExist.code,
                                path: errorExist.path,
                                message: errorExist.message,
                                stack: errorExist.stack
                            }
                        })
                    }
                })
            }
        })
    })
}
module.exports.RenameFolder = rename

function relativePathRecursive(dir) {
    dir.path = path.relative(dir.path, dir.path.split('/').pop())
    if (dir.children) {
        dir.children.forEach(element => {
            relativePathRecursive(element)
        });
    }
}

function resolvePathRecursive(dir) {
    dir.path = path.resolve(dir.path)
    if (dir.children) {
        dir.children.forEach(element => {
            relativePathRecursive(element)
        });
    }
}

async function getDirectory(pathRequest) {
    let directory = path.join(DIR_NAME, pathRequest)
    let rr = path.dirname(directory)

    console.log(rr)
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
                const dir = dirTree(directory)
                resolve({
                    getDir: true,
                    error: false,
                    path: directory,
                    objectDir: dir
                })
            }
        })
    })

}
module.exports.GetDirectory = getDirectory