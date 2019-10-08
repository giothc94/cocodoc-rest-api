const { Rol } = require("../lib/dao/rolCocodoc");

class RolesServices {
    constructor() {
        this.roles = new Rol();
    }
    getRoles = async() => {
        return new Promise(async(resolve, reject) => {
            this.roles.getRolesUsersCocodoc()
                .then(resolve)
                .catch(reject);
        });
    };

    getKeyRol = async id => {
        return new Promise((resolve, reject) => {
            this.roles
                .getKeyRol(id)
                .then(resolve)
                .catch(reject);
        });
    };

    getScopes = () => {
        return new Promise(async(resolve, reject) => {
            try {
                let listScopesDetail = [];
                const roles = await this.getRoles();
                for (const rol of roles) {
                    const s = await this.roles.getScopesByIdRol(rol.id_rol);
                    listScopesDetail.push({ Id: rol.key, Rol: rol.type_rol, Scopes: s })
                }
                resolve(listScopesDetail)
            } catch (error) {
                reject(error)
            }
        })
    }

    getRolAndScopesByKey = async key => {
        return new Promise((resolve, reject) => {
            this.roles
                .getRolAndScopesByKey(key)
                .then(resolve)
                .catch(reject);
        });
    };
    createScopeForRol = async({ scope, keyRol }) => {
        return new Promise((resolve, reject) => {
            this.roles
                .createScopeForRol({ scope: scope, keyRol: keyRol })
                .then(resolve)
                .catch(reject)
        })
    }
}
module.exports.RolesServices = RolesServices

// var s = new RolesServices()
// s.getScopes()
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error))