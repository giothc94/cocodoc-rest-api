const { FileSystem } = require("../lib/fileSystem");

class FileSystemService {
    constructor() {
        this.FileSystem = new FileSystem();
    }

    createFolder = body => {
        return new Promise((resolve, reject) => {
            this.FileSystem.createFolderAndPath(body)
                .then(resolve)
                .catch(reject);
        });
    };
    getDirectory = () => {
        return new Promise((resolve, reject) => {
            this.FileSystem.getDirectory()
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    };
    removeFolder = params => {
        return new Promise((resolve, reject) => {
            this.FileSystem.deleteFolderAndPath(params)
                .then(response => resolve(response))
                .catch(reject);
        });
    };
    renameFolder = body => {
        return new Promise((resolve, reject) => {
            this.FileSystem.renameFolderAndPath(body)
                .then(resolve)
                .catch(reject);
        });
    };
}

module.exports.FileSystemService = FileSystemService;