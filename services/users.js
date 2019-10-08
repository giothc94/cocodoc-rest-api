// const MongoLib = require('../lib/mongo')
const { UsersCocodoc } = require("../lib/dao/userCocodocDao");
const { VerifyUser } = require("../utils/schemas/verifyUser");

class UsersServices {
    constructor() {}

    createUser = user => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.createUserCocodoc(user)
                .then(resolve)
                .catch(reject);
        });
    };

    getUsers = async() => {
        return new Promise(async(resolve, reject) => {
            let us = new UsersCocodoc();
            us.getUsersCocodoc()
                .then(resolve)
                .catch(reject);
        });
    };
    getUser = id => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.getUserCocodoc(id)
                .then(user => resolve(user[0]))
                .catch(reject);
        });
    };
    deleteUser = id => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.deleteUserCocodoc(id)
                .then(resolve)
                .catch(reject);
        });
    };
    updateUser = user => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.updateUserCocodoc(user)
                .then(resolve)
                .catch(reject);
        });
    };
    updatePasswordUser = ({ idKey, newPassword }) => {
        return new Promise((resolve, reject) => {
            let us = new UsersCocodoc();
            us.updatePasswordUser({ idKey: idKey, newPassword: newPassword })
                .then(resolve)
                .catch(reject)
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