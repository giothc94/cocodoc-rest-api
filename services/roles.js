const { Rol } = require("../lib/dao/rolCocodoc");

class RolesServices {
    constructor() {
        this.roles = new Rol();
    }
    getRoles = async() => {
        return new Promise(async(resolve, reject) => {
            this.roles.getRolesUsersCocodoc()
                .then(roles => resolve(roles))
                .catch(err => reject(err));
        });
    };

    getKeyRol = async id => {
        return new Promise((resolve, reject) => {
            this.roles
                .getKeyRol(id)
                .then(response => resolve(response))
                .catch(error => reject({ error: error, status: 400 }));
        });
    };

    getRolAndScopesByKey = async key => {
        return new Promise((resolve, reject) => {
            this.roles
                .getRolAndScopesByKey(key)
                .then(response => resolve(response))
                .catch(error => reject({ error: error, status: 400 }));
        });
    };
}
module.exports.RolesServices = RolesServices