const { CreateFolder, GetDirectory, RemoveFolder, RenameFolder } = require('../lib/fileSystem')

class FileSystemService {

    constructor() {}
    async createFolder(path) {
        return await CreateFolder(path)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }

    async getDirectory(path) {
        return await GetDirectory(path)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }
    async removeFolder(path, options) {
        return await RemoveFolder(path, options)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }
    async renameFolder(oldPath, newPath) {
        return await RenameFolder(oldPath, newPath)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }
}

module.exports = FileSystemService