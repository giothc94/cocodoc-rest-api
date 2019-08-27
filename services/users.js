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
            let vs = new VerifyUser();
            let us = new UsersCocodoc();
            vs.verifyUserForCreate(user)
                .then(({ user }) => {
                    us.createUserCocodoc(user)
                        .then(resp => resolve(resp))
                        .catch(error => reject(error));
                })
                .catch(error => reject({ error: error.error[0].message, status: 400 }));
        });
    };

    getRoles = async() => {
        return new Promise(async(resolve, reject) => {
            let us = new UsersCocodoc();
            us.getRolesUsersCocodoc()
                .then(roles => resolve(roles))
                .catch(err => reject(err));
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
                .then(user => { resolve(user[0]) })
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
            let vs = new VerifyUser();
            vs.verifyUserForUpdate(user)
                .then(({ user }) => {
                    us.updateUserCocodoc(user)
                        .then(resp => resolve(resp))
                        .catch(error => reject(error));
                })
                .catch(error => reject({ error: error.error[0].message, status: 400 }));
        });
    };
}

module.exports.UsersServices = UsersServices;