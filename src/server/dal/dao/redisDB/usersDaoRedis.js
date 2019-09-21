const DAO = require('../dao');
const config = require('../../../config');

function UsersDaoRedisDB() {
    this.connection = null;
    this.client = null;
}

UsersDaoRedisDB.prototype = Object.create(DAO.prototype);
UsersDaoRedisDB.prototype.constructor = UsersDaoRedisDB;

UsersDaoRedisDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = config.settings.redis.connectionString;
};

UsersDaoRedisDB.prototype.create = async function (obj) {
};

UsersDaoRedisDB.prototype.readUser = async function(email, password) {
};

UsersDaoRedisDB.prototype.readAll = async function () {
};

UsersDaoRedisDB.prototype.readUserToId = async function(id) {
};

module.exports = UsersDaoRedisDB;