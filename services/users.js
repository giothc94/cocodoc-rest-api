// const MongoLib = require('../lib/mongo')
const { UsersCocodoc } = require("../lib/dao/userCocodocDao");
const { VerifyUser } = require("../utils/schemas/verifyUser");

class UsersServices {
    constructor() {
        // this.collection = 'users'
        // this.mongodb = new MongoLib()
    }

    createUser = user => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.createUserCocodoc(user)
                .then(resp => resolve(resp))
                .catch(error => reject({...error }));
        });
    };

    getUsers = async() => {
        return new Promise(async(resolve, reject) => {
            let us = new UsersCocodoc();
            us.getUsersCocodoc()
                .then(users => resolve(users))
                .catch(err => reject(err));
        });
    };
    getUser = id => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.getUserCocodoc(id)
                .then(user => resolve(user[0]))
                .catch(err => reject(err));
        });
    };
    deleteUser = id => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.deleteUserCocodoc(id)
                .then(message => resolve(message))
                .catch(err => reject(err));
        });
    };
    updateUser = user => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.updateUserCocodoc(user)
                .then(resp => resolve(resp))
                .catch(error => reject({...error }));
        });
    };
    updatePasswordUser = ({ idKey, newPassword }) => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.updatePasswordUser({ idKey: idKey, newPassword: newPassword })
                .then(resp => resolve(resp))
                .catch(error => reject(error))
        })
    }
    searchUser = (dataUser) => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.searchUser(dataUser)
                .then(resolve)
                .catch(reject)
        })
    }
}

module.exports.UsersServices = UsersServices;