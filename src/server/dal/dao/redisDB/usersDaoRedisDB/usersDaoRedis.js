const DAO = require('../../dao');
const config = require('../../../../config');
const redis = require('async-redis');
const url = config.settings.redis.connectionRedis;

function UsersDaoRedisDB() {
    this.client = null;
}

UsersDaoRedisDB.prototype = Object.create(DAO.prototype);
UsersDaoRedisDB.prototype.constructor = UsersDaoRedisDB;
UsersDaoRedisDB.prototype.initialize = function () {
    this.client = redis.createClient(url);
    this.client.on('connection', function () {
        console.log('Redis client connected');
    });

    this.client.on('error', function (err) {
        console.log(err);
    });
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
    const string = await this.client.get('user_' + email);
    const user = JSON.parse(string);
    if (user.email === email && user.password === password) {
        return user;
    }
};

UsersDaoRedisDB.prototype.readAll = async function () {
    const keys = await this.client.scan('0', 'MATCH', 'user_*', 'COUNT', '1000');
    const string = await this.client.mget(keys[1]);
    const users = [];

    for (let i = 0; i < string.length; i++) {
        users.push(JSON.parse(string[i]));
    }

    return users;
};

UsersDaoRedisDB.prototype.readUserToId = async function (id) {
    const user = await this.client.get('user_' + id);

    return [JSON.parse(user)];
};

module.exports = UsersDaoRedisDB;