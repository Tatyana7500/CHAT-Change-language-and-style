const DAO = require('../../dao');
const util = require('../../util');

function MessagesDaoMockDB() {
    this.connection = null;
    this.model = [];
}

MessagesDaoMockDB.prototype = Object.create(DAO.prototype);
MessagesDaoMockDB.prototype.constructor = MessagesDaoMockDB;

MessagesDaoMockDB.prototype.initialize = function () {};

MessagesDaoMockDB.prototype.create = async function (obj) {
    this.model.push(obj);
};

MessagesDaoMockDB.prototype.readByReceiver = async function (receiver) {
    return this.model.filter(message => message.receiver === receiver);
};

MessagesDaoMockDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
    const query = (message, sender, receiver) => {
        return (message.sender == sender && message.receiver == receiver)
        || (message.sender == receiver && message.receiver == sender);
    };

    const messages = this.model.filter(message => query(message, sender, receiver));
    messages.sort(util.dynamicSort('date'));

    return messages;
};

module.exports = MessagesDaoMockDB;