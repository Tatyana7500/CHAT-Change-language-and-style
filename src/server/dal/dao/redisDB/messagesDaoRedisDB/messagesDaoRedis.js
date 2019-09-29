const DAO = require('../../dao');
const config = require('../../../../config');
const redis = require('async-redis');
const util = require('../../util');
const url = config.settings.redis.connectionRedis;

function MessagesDaoRedisDB() {
    this.client = null;
}

MessagesDaoRedisDB.prototype = Object.create(DAO.prototype);
MessagesDaoRedisDB.prototype.constructor = MessagesDaoRedisDB;

MessagesDaoRedisDB.prototype.initialize = function () {
    this.client = redis.createClient(url);
    this.client.on('connection', function () {
        console.log('Redis client connected');
    });

    this.client.on('error', function (err) {
        console.log(err);
    });
};

MessagesDaoRedisDB.prototype.create = async function (msg) {
    await this.client.zadd('msg_' + msg.receiver, Date.now(), JSON.stringify(msg));
    await this.client.zadd('msg_' + msg.sender + '_' + msg.receiver, Date.now(), JSON.stringify(msg));
};

MessagesDaoRedisDB.prototype.readByReceiver = async function (receiver) {
    const msgs = [];
    const string = await this.client.zrange('msg_' + receiver, 0, -1);

    for (let i = 0; i < string.length; i++) {
        msgs.push(JSON.parse(string[i]));
    }

    return msgs;
};

MessagesDaoRedisDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
    const messages = [];
    const sent = await this.client.zrange('msg_' + sender + '_' + receiver, 0, -1);

    for (let i = 0; i < sent.length; i++) {
        messages.push(JSON.parse(sent[i]));
    }

    let temp = sender;
    sender = receiver;
    receiver = temp;
    const received = await this.client.zrange('msg_' + sender + '_' + receiver, 0, -1);

    for (let i = 0; i < received.length; i++) {
        messages.push(JSON.parse(received[i]));
    }

    messages.sort(util.dynamicSort('date'));
    resolve(messages);
};

module.exports = MessagesDaoRedisDB;