const MessagesDaoRedisDB = require('../messagesDaoRedis');
const sinon = require('sinon');
const assert = require('assert');
const redis = require('async-redis');
const util = require('../../../util');

describe('MessagesDaoRedisDB', () => {
    describe('MessagesDaoRedisDB', () => {
        let expected = null;

        before(() => {
            expected = {
                client: null,
            };
        });

        it('Should past!', () => {
            const actual = new MessagesDaoRedisDB();
            assert.deepEqual(actual, expected);
        });
    });

    describe('initialize', () => {
        let dao;
        let sandbox;
        let mockClient;

        before(() => {
            dao = new MessagesDaoRedisDB();
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
        let mockMsg;
        let sandbox;
        let mockClient;

        before(async () => {
            dao = new MessagesDaoRedisDB();
            sandbox = sinon.createSandbox();
            mockMsg = {
                sender: 'sender',
                receiver: 'receiver',
            };
            mockClient = {
                zadd: sandbox.stub(),
            };
            sandbox.stub(Date, 'now');
            sandbox.stub(JSON, 'stringify');
            mockClient.zadd.withArgs('msg_' + mockMsg.receiver, Date.now(), JSON.stringify(mockMsg));
            mockClient.zadd.withArgs('msg_' + mockMsg.sender + '_' + mockMsg.receiver, Date.now(), JSON.stringify(mockMsg));
            sandbox.stub(dao, 'client').get(() => mockClient);

            await dao.create(mockMsg);
        });

        after(() => {
            sandbox.restore();
        });

        it('should called twice .zadd()', () => {
            assert.equal(mockClient.zadd.callCount, 2);
        });

        it('should called .zadd() with args', () => {
            sinon.assert.calledWith(mockClient.zadd, 'msg_' + mockMsg.receiver, Date.now(), JSON.stringify(mockMsg));
        });

        it('should called .zadd() with args', () => {
            sinon.assert.calledWith(mockClient.zadd, 'msg_' + mockMsg.sender + '_' + mockMsg.receiver, Date.now(), JSON.stringify(mockMsg));
        });
    });

    describe('readByReceiver', () => {
        let dao;
        let sandbox;
        let mockClient;
        let mockString;
        let mockReceiver;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new MessagesDaoRedisDB();
            sandbox = sinon.createSandbox();
            mockReceiver = '';
            mockString = [{}];
            mockClient = {
                zrange: sandbox.stub().returns(mockString),
            };
            sandbox.stub(JSON, 'parse');
            expectedResult = [void 0];
            sandbox.stub(dao, 'client').get(() => mockClient);

            actualResult = await dao.readByReceiver(mockReceiver);
        });

        after(() => {
            sandbox.restore();
        });

        it('should called once .zrange()', () => {
            sinon.assert.calledOnce(mockClient.zrange);
        });

        it('should called once .zrange() with args', () => {
            sinon.assert.calledWith(mockClient.zrange, 'msg_' + mockReceiver, 0, -1);
        });

        it('should called once JSON.parse()', () => {
            sinon.assert.calledOnce(JSON.parse);
        });

        it('should be equal', () => {
            assert.deepEqual(actualResult, expectedResult);
        });
    });

    describe('readBySenderAndReceiver', () => {
        let dao;
        let sandbox;
        let mockSent;
        let mockParams;
        let mockClient;
        let mockReceived;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new MessagesDaoRedisDB();
            sandbox = sinon.createSandbox();
            mockParams = {
                sender: 'sender',
                receiver: 'receiver',
            };
            mockSent = [{}];
            mockClient = {
                zrange: sandbox.stub(),
            };
            mockSent = [{}];
            mockReceived = [{}];
            mockClient.zrange.withArgs('msg_' + mockParams.sender + '_' + mockParams.receiver, 0, -1).returns(mockSent);
            mockClient.zrange.withArgs('msg_' + mockParams.receiver + '_' + mockParams.sender, 0, -1).returns(mockReceived);
            sandbox.stub(util, 'dynamicSort');
            expectedResult = [void 0, void 0];
            sandbox.stub(JSON, 'parse');
            sandbox.stub(dao, 'client').get(() => mockClient);

            actualResult = await dao.readBySenderAndReceiver(mockParams.sender, mockParams.receiver);
        });

        after(() => {
            sandbox.restore();
        });

        it('should called 2 times .zrange()', () => {
            assert.equal(mockClient.zrange.callCount, 2);
        });

        it('should called 2 times JSON.parse()', () => {
            assert.equal(JSON.parse.callCount, 2);
        });

        it('should called once util.dynamicSort()', () => {
            sinon.assert.calledOnce(util.dynamicSort);
        });

        it('should called once util.dynamicSort() with args', () => {
            sinon.assert.calledWith(util.dynamicSort, 'date');
        });

        it('should be equal', () => {
            assert.deepEqual(actualResult, expectedResult);
        });
    });
});