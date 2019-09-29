const DAO = require('../../dao');
const config = require('../../../../config');
const mysql = require('mysql2');
const util = require('../../util');

const messages = `create table if not exists messages(
  _id INT PRIMARY KEY AUTO_INCREMENT,
  message VARCHAR(255) NOT NULL,
  sender VARCHAR(255) NOT NULL,
  receiver VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL)`;

function MessagesDaoMySqlDB() {
    this.connection = null;
    this.model = null;
}

MessagesDaoMySqlDB.prototype = Object.create(DAO.prototype);
MessagesDaoMySqlDB.prototype.constructor = MessagesDaoMySqlDB;

MessagesDaoMySqlDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = config.settings.mysql;

    this.connection = mysql.createConnection(url).promise();
    this.connection.connect();
    this.connection.query(messages);
};

MessagesDaoMySqlDB.prototype.create = async function (obj) {
    await this.connection.query(`INSERT INTO messages(message, sender, receiver, date) VALUES('${obj.message}', '${obj.sender}', '${obj.receiver}', '${obj.date}')`);
};

MessagesDaoMySqlDB.prototype.readByReceiver = async function (receiver) {
    let messages;

    await this.connection.query(`SELECT * FROM messages WHERE receiver = '${receiver}'`)
        .then(([rows]) => {
            messages = rows;
        });

    messages = util.convertMessages(messages);

    return messages;
};

MessagesDaoMySqlDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
    let sent;
    let received;

    await this.connection.query(`SELECT * FROM messages WHERE sender = '${sender}' AND receiver = '${receiver}'`)
        .then(([rows]) => {
            sent = rows;
        });

    await this.connection.query(`SELECT * FROM messages WHERE sender = '${receiver}' AND receiver = '${sender}'`)
        .then(([rows]) => {
            received = rows;
        });

    let messages = [...sent, ...received];

    messages = util.convertMessages(messages);
    messages.sort(util.dynamicSort('date'));

    return messages;
};

module.exports = MessagesDaoMySqlDB;