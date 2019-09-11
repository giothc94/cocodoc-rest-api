const { Session } = require('../lib/session')
class SessionService {
    constructor() {
        this.session = new Session();
    }

    changeSessionState = ({ idKeyUser, state }) => {
        return new Promise((resolve, reject) => {
            this.session
                .changeSessionState({ idKeyUser: idKeyUser, state: state })
                .then(resp => resolve(resp))
                .catch(error => reject(error));
        })
    };
}

module.exports.SessionService = SessionService;

// var l = new SessionService();
// l.changeSessionState({ idKeyUser: 2, state: false })
//     .then(resp => console.log(resp))
//     .catch(error => console.log(error))