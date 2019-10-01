const DAO = require('../../dao');
const config = require('../../../../config');
const { Client } = require('pg');
const util = require('../../util');

function MessagesDaoPostgresDB() {
    this.connection = null;
    this.client = null;
}

MessagesDaoPostgresDB.prototype = Object.create(DAO.prototype);
MessagesDaoPostgresDB.prototype.constructor = MessagesDaoPostgresDB;

MessagesDaoPostgresDB.prototype.initialize = function () {
    if (this.connection) {
        return;
    }

    const url = config.settings.postgres.connectionPostgres;

    this.client = MessagesDaoPostgresDB.createPgClient(url);
    this.client.connect()
        .then(() => {
            this.connection = true;
        })
        .catch((error) => {
            console.log(error);
        });
};

MessagesDaoPostgresDB.createPgClient = url => {
    return new Client(url);
};

MessagesDaoPostgresDB.prototype.create = async function (obj) {
    await this.client.query(`insert into messages(message, sender, receiver, date) values($1,$2,$3,$4)`, [obj.message, obj.sender, obj.receiver, obj.date]);
};

MessagesDaoPostgresDB.prototype.readByReceiver = async function (receiver) {
    return await this.client.query('select * from messages where receiver = $1', [receiver])
        .then(res => res.rows);
};

MessagesDaoPostgresDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
    const sent = await this.client.query('select * from messages where sender = $1 and receiver = $2', [sender, receiver]);

    const received = await this.client.query('select * from messages where sender = $1 and receiver = $2', [receiver, sender]);

    const messages = [...sent[0], ...received[0]];

    return messages.sort(util.dynamicSort('date'));
};

module.exports = MessagesDaoPostgresDB;