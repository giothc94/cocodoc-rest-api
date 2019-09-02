const { FileSystem } = require("../lib/fileSystem");

class FileSystemService {
    constructor() {
        this.FileSystem = new FileSystem();
    }

    createFolder = body => {
        return new Promise((resolve, reject) => {
            this.FileSystem.createFolderAndPath(body)
                .then(response => resolve(response))
                .catch(error => reject({ error: error, status: 400 }));
        });
    };
    getDirectory = () => {
        return new Promise((resolve, reject) => {
            this.FileSystem.getDirectory()
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    };
    removeFolder = body => {
        return new Promise((resolve, reject) => {
            this.FileSystem.deleteFolderAndPath(body)
                .then(response => resolve(response))
                .catch(error => reject({ error: error, status: 400 }));
        });
    };
    renameFolder = body => {
        return new Promise((resolve, reject) => {
            this.FileSystem.renameFolderAndPath(body)
                .then(response => resolve(response))
                .catch(error => reject({ error: error, status: 400 }));
        });
    };
}

module.exports.FileSystemService = FileSystemService;