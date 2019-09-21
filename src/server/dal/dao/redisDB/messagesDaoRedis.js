const DAO = require('../dao');
const config = require('../../../config');
const util = require('../util');

function MessagesDaoRedisDB() {
    this.connection = null;
    this.model = null;
}

MessagesDaoRedisDB.prototype = Object.create(DAO.prototype);
MessagesDaoRedisDB.prototype.constructor = MessagesDaoRedisDB;

MessagesDaoRedisDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = config.settings.redis.connectionString;
};

MessagesDaoRedisDB.prototype.create = async function (obj) {
};

MessagesDaoRedisDB.prototype.readByReceiver = async function (receiver) {
};

MessagesDaoRedisDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
};

module.exports = MessagesDaoRedisDB;