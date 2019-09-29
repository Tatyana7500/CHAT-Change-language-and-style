const DAO = require('../../dao');

function UsersDaoMockDB() {
    this.connection = null;
    this.model = [];
    this.count = 1;
}

UsersDaoMockDB.prototype = Object.create(DAO.prototype);
UsersDaoMockDB.prototype.constructor = UsersDaoMockDB;

UsersDaoMockDB.prototype.initialize = function () {};

UsersDaoMockDB.prototype.create = async function (object) {
    object._id = (this.count++).toString();
    const user = this.model.filter(user => user.email === object.email)[0];

    if (!user) {
        this.model.push(object);
    } else {
        throw new Error();
    }
};

UsersDaoMockDB.prototype.readAll = async function () {
    return [...this.model];
};

UsersDaoMockDB.prototype.readUser = async function (email, password) {
    const user = this.model.filter(user => user.email === email && user.password === password)[0];

    if (user) {
        return user;
    } else {
        throw new Error();
    }
};

UsersDaoMockDB.prototype.readUserToId = async function (id) {
    return this.model.filter(user => user._id == id);
};

module.exports = UsersDaoMockDB;