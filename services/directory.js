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
    
    createFolder = body => {
        return new Promise((resolve, reject) => {
            this.FileSystem.createFolderAndPath(body)
                .then(resolve)
                .catch(reject);
        });
    };
    
    createRootFolder = body => {
        return new Promise((resolve, reject) => {
            this.FileSystem.createRootFolderAndPath(body)
                .then(resolve)
                .catch(reject);
        });
    };

    getDirectory = () => {
        return new Promise((resolve, reject) => {
            this.FileSystem.getDirectory()
                .then(resolve)
                .catch(reject);
        });
    };

    removeFolder = params => {
        return new Promise((resolve, reject) => {
            this.FileSystem.deleteFolderAndPath(params)
                .then(resolve)
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