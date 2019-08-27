const { FileSystem } = require("../lib/fileSystem");
const { VerifyFolder } = require("../utils/schemas/verifyFolder");

class FileSystemService {
    constructor() {
        this.FileSystem = new FileSystem();
        this.VerifyFolder = new VerifyFolder();
    }

    createFolder = body => {
        return new Promise((resolve, reject) => {
            this.VerifyFolder.verifyFolderForCreate(body)
                .then(({ data }) => {
                    this.FileSystem.createFolderAndPath(data)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                })
                .catch(error => reject({ error: error.error[0].message, status: 400 }));
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
            this.VerifyFolder.verifyIdFolderSchema(body)
                .then(({ data }) => {
                    this.FileSystem.deleteFolderAndPath(data)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                })
                .catch(error => reject({ error: error.error[0].message, status: 400 }));
        });
    };
    renameFolder = body => {
        return new Promise((resolve, reject) => {
            this.VerifyFolder.verifyFolderForUpdate(body)
                .then(({ data }) => {
                    this.FileSystem.renameFolderAndPath(data)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                })
                .catch(error => reject({ error: error.error[0].message, status: 400 }));
        });
    };
}

module.exports.FileSystemService = FileSystemService;