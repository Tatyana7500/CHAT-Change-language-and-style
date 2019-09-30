const UsersDaoRedisDB = require('../usersDaoRedis');
const sinon = require('sinon');
const assert = require('assert');

describe('UsersDaoRedisDB', () => {
    describe('UsersDaoRedisDB', () => {
        let expected = null;

        before(() => {
            expected = {
                client: null,
            };
        });

        it('Should past!', () => {
            const actual = new UsersDaoRedisDB();
            assert.deepEqual(actual, expected);
        });
    });
});