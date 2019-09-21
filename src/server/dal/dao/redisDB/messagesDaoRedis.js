const DAO = require('../dao');
const config = require('../../../config');

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

function dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

        return result * sortOrder;
    }
}

module.exports = MessagesDaoRedisDB;