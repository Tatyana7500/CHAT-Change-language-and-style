const DAO = require('../../dao/dao');

function UsersDaoMockDB() {
    this.connection = null;
    this.model = [];
}

UsersDaoMockDB.prototype = Object.create(DAO.prototype);
UsersDaoMockDB.prototype.constructor = UsersDaoMockDB;

UsersDaoMockDB.prototype.initialize = function () {};

UsersDaoMockDB.prototype.create = async function (object) {
    this.model.push(object);
};

UsersDaoMockDB.prototype.readAll = async function () {
    return [...this.model];
};

UsersDaoMockDB.prototype.readUser = async function (email, password) {
    return this.model.filter(user => user.email === email && user.password === password)[0];
};

UsersDaoMockDB.prototype.readUserToId = async function (id) {
    return this.model.filter(user => user.id === id);
};

module.exports = UsersDaoMockDB;