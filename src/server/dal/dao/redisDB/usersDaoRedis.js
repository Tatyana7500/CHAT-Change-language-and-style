const DAO = require('../dao');
const config = require('../../../config');
const redis = require('redis');
const url = config.settings.redis.connectionRedis;

function UsersDaoRedisDB() {
    this.client = redis.createClient(url);
    this.client.on('connection', function () {
        console.log('Redis client connected');
    });

    this.client.on('error', function (err) {
        console.log(err);
    });
}

UsersDaoRedisDB.prototype = Object.create(DAO.prototype);
UsersDaoRedisDB.prototype.constructor = UsersDaoRedisDB;
UsersDaoRedisDB.prototype.initialize = function () {
};

UsersDaoRedisDB.prototype.create = async function (object) {
    const user = {
        _id: object.email,
        name: object.name,
        email: object.email,
        password: object.password,
    };
    await this.client.set('user_' + user.email, JSON.stringify(user));
};

UsersDaoRedisDB.prototype.readUser = async function (email, password) {
    return new Promise((resolve, reject) => {
        const key = 'user_' + email;
        this.client.get(key, function (err, string) {
            if (err) {
                reject(err);
            }
            let user = JSON.parse(string);
            if (user.email === email && user.password === password) {
                resolve(user);
            }
        });
    });
};

UsersDaoRedisDB.prototype.readAll = async function () {
    const th = this;
    return new Promise((resolve, reject) => {
        this.client.scan('0', 'MATCH', 'user_*', 'COUNT', '1000', function (err, keys) {
            if (err) {
                reject(err);
            }
            th.client.mget(keys[1], function (err, string) {
                const users = [];
                for (let i = 0; i < string.length; i++) {
                    users.push(JSON.parse(string[i]));
                }
                resolve(users);
            });
        });
    });
};

UsersDaoRedisDB.prototype.readUserToId = async function (id) {
    const key = 'user_' + id;
    return new Promise((resolve, reject) => {
        this.client.get(key, function (err, string) {
            if (err) {
                reject(err);
            }
            let user = JSON.parse(string);
            resolve([user]);
        });
    });
};

module.exports = UsersDaoRedisDB;