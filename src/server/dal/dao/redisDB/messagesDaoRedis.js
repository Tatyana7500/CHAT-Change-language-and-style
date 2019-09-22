const DAO = require('../dao');
const config = require('../../../config');
const redis = require('redis');
const util = require('../util');
const url = config.settings.redis.connectionRedis;

function MessagesDaoRedisDB() {
    this.client = redis.createClient(url);
    this.client.on('connection', function () {
        console.log('Redis client connected');
    });

    this.client.on('error', function (err) {
        console.log(err);
    });
}

MessagesDaoRedisDB.prototype = Object.create(DAO.prototype);
MessagesDaoRedisDB.prototype.constructor = MessagesDaoRedisDB;

MessagesDaoRedisDB.prototype.initialize = function () {
};

MessagesDaoRedisDB.prototype.create = async function (msg) {
    await this.client.zadd('msg_' + msg.receiver, Date.now(), JSON.stringify(msg));
    await this.client.zadd('msg_' + msg.sender + '_' + msg.receiver, Date.now(), JSON.stringify(msg));
};

MessagesDaoRedisDB.prototype.readByReceiver = async function (receiver) {
    return new Promise((resolve, reject) => {
        const msgs = [];
        this.client.zrange('msg_' + receiver, 0, -1, function (err, string) {
            if (err) {
                reject(err);
            }
            for (let i = 0; i < string.length; i++) {
                msgs.push(JSON.parse(string[i]));
            }
            resolve(msgs);
        });
    });
};

MessagesDaoRedisDB.prototype.readBySenderAndReceiver = async function (sender, receiver) {
    return new Promise((resolve, reject) => {
        const messages = [];
        const th = this;
        this.client.zrange('msg_' + sender + receiver, 0, -1, function (err, string) {
            if (err) {
                reject(err);
            }
            for (let i = 0; i < string.length; i++) {
                messages.push(JSON.parse(string[i]));
            }
            let temp = sender;
            sender = receiver;
            receiver = temp;
            th.client.zrange('msg_' + receiver + sender, 0, -1, function (err, string) {
                if (err) {
                    reject(err);
                }
                for (let i = 0; i < string.length; i++) {
                    messages.push(JSON.parse(string[i]));
                }
                messages.sort(util.dynamicSort('date'));
                resolve(messages);
            });
        });
    });
};

module.exports = MessagesDaoRedisDB;

