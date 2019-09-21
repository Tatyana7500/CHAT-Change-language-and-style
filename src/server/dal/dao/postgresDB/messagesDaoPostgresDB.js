const DAO = require('../dao');
const config = require('../../../config');
const { Client } = require('pg');
const util = require('../util');

function MessagesDaoPostgresDB() {
    this.connection = null;
}

MessagesDaoPostgresDB.prototype = Object.create(DAO.prototype);
MessagesDaoPostgresDB.prototype.constructor = MessagesDaoPostgresDB;

MessagesDaoPostgresDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = config.settings.postgres.connectionPostgres;

    this.client = new Client(url);
    this.client.connect()
        .then(() => {
            this.connection = true;
        })
        .catch((error) => {
            console.log(error);
        });
};

MessagesDaoPostgresDB.prototype.create = async function (obj) {
    await this.client.query(`insert into messages(message, sender, receiver, date) values($1,$2,$3,$4)`, [obj.message, obj.sender, obj.receiver, obj.date]);
};

MessagesDaoPostgresDB.prototype.readByReceiver = async function (receiver) {
    let messages;
    await this.client.query('select * from messages where receiver = $1', [receiver])
        .then((res) => messages = res.rows);

    return messages;
};

MessagesDaoPostgresDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
    let sent;
    let received;
    await this.client.query('select * from messages where sender = $1 and receiver = $2', [sender, receiver])
        .then((result) => {
            sent = result.rows;
        });

    await this.client.query('select * from messages where sender = $1 and receiver = $2', [receiver, sender])
        .then((result) => {
            received = result.rows;
        });

    const messages = [...sent, ...received];
    messages.sort(util.dynamicSort('date'));

    return messages;
};

module.exports = MessagesDaoPostgresDB;