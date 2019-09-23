const constants = require('../constants');

module.exports = {
    databaseType: constants.MONGO,
    settings: {
        redis: {
            connectionRedis: {
                host: '127.0.0.1',
                port: 6379,
            },
        },
        mysql: {
            host: '127.0.0.1',
            user: 'root',
            database: 'chatdb',
            password: 'password',
        },
        mongo: {
            connectionString: 'mongodb://localhost:27017',
        },
        postgres: {
            connectionPostgres: {
                user: 'postgres',
                password: 'qazxsw01',
                host: 'localhost',
                port: 5432,
                database: 'chatDB',
            },
        },
    },
};