const UsersDaoRedisDB = require('../usersDaoRedis');
const sinon = require('sinon');
const assert = require('assert');
const redis = require('async-redis');

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

    describe('initialize', () => {
        let dao;
        let sandbox;
        let mockClient;

        before(() => {
            dao = new UsersDaoRedisDB();
            sandbox = sinon.createSandbox();
            mockClient = {
                on: sandbox.stub(),
            };
            sandbox.stub(redis, 'createClient').returns(mockClient);

            dao.initialize();
        });

        after(() => {
            sandbox.restore();
        });

        it('should called redis.createClient()', () => {
            sinon.assert.calledOnce(redis.createClient);
        });

        it('should called redis.createClient() with args', () => {
            sinon.assert.calledWith(redis.createClient, {
                host: '127.0.0.1',
                port: 6379,
            });
        });
    });

    describe('create', () => {
        let dao;
        let sandbox;
        let mockUser;
        let mockClient;
        let mockObject;

        before(async () => {
            dao = new UsersDaoRedisDB();
            sandbox = sinon.createSandbox();
            mockClient = {
                set: sandbox.stub(),
            };
            mockObject = {
                name: '',
                email: '',
                password: '',
            };
            mockUser = {
                _id: mockObject.email,
                name: mockObject.name,
                email: mockObject.email,
                password: mockObject.password,
            };
            sandbox.stub(dao, 'client').get(() => mockClient);

            await dao.create(mockObject);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once .set()', () => {
            sinon.assert.calledOnce(mockClient.set);
        });

        it('Should called once .set() with args', () => {
            sinon.assert.calledWith(mockClient.set, 'user_' + mockUser.email, JSON.stringify(mockUser));
        });
    });

    describe('readUser', () => {
        let dao;
        let sandbox;
        let mockUser;
        let mockParams;
        let mockClient;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoRedisDB();
            sandbox = sinon.createSandbox();
            mockClient = {
                get: sandbox.stub().returns(JSON.stringify(expectedResult)),
            };
            mockParams = {
                email: 'email',
                password: 'password',
            };
            mockUser = {
                email: 'email',
                password: 'password',
            };
            expectedResult = {};
            sandbox.stub(dao, 'client').get(() => mockClient);
            sandbox.stub(JSON, 'parse').returns(mockUser);

            actualResult = await dao.readUser(mockParams.email, mockParams.password);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once .get()', () => {
            sinon.assert.calledOnce(mockClient.get);
        });

        it('Should called once .get() with args', () => {
            sinon.assert.calledWith(mockClient.get, 'user_' + mockParams.email);
        });

        it('Should called once JSON.parse()', () => {
            sinon.assert.calledOnce(JSON.parse);
        });

        it('Should called once JSON.parse() with args', () => {
            sinon.assert.calledWith(JSON.parse, void 0);
        });

        it('Should be equal', () => {
            assert.deepEqual(actualResult, mockUser);
        });
    });

    describe('readAll', () => {
        let dao;
        let sandbox;
        let mockKeys;
        let mockString;
        let mockClient;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoRedisDB();
            sandbox = sinon.createSandbox();
            mockKeys = [{}, {}];
            mockString = '';
            expectedResult = [];
            mockClient = {
                scan: sandbox.stub().returns(mockKeys),
                mget: sandbox.stub().returns(mockString),
            };
            sandbox.stub(dao, 'client').get(() => mockClient);

            actualResult = await dao.readAll();
        });

        after(() => {
            sandbox.restore();
        });

        it('should called once .scan()', () => {
            sinon.assert.calledOnce(mockClient.scan);
        });

        it('should called once .scan() with args', () => {
            sinon.assert.calledWith(mockClient.scan, '0', 'MATCH', 'user_*', 'COUNT', '1000');
        });

        it('Should called once .mget()', () => {
            sinon.assert.calledOnce(mockClient.mget);
        });

        it('Should called once .mget() with args', () => {
            sinon.assert.calledWith(mockClient.mget, mockKeys[1]);
        });

        it('should be equal', () => {
            assert.deepEqual(actualResult, expectedResult);
        });
    });

    describe('readUserToId', () => {
        let dao;
        let mockId;
        let sandbox;
        let mockUser;
        let mockClient;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoRedisDB();
            sandbox = sinon.createSandbox();
            mockUser = {};
            expectedResult = [void 0];
            mockClient = {
                get: sandbox.stub().returns(mockUser),
            };
            sandbox.stub(dao, 'client').get(() => mockClient);
            sandbox.stub(JSON, 'parse');

            actualResult = await dao.readUserToId(mockId);
        });

        after(() => {
            sandbox.restore();
        });

        it('should called once .get()', () => {
            sinon.assert.calledOnce(mockClient.get);
        });

        it('should called once .get() with args', () => {
            sinon.assert.calledWith(mockClient.get, 'user_' + mockId);
        });

        it('should be equal', () => {
            assert.deepEqual(actualResult, expectedResult);
        });
    });
});