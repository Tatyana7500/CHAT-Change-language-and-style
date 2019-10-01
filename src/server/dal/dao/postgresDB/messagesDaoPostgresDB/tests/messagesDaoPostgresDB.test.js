const assert = require('assert');
const MessagesDaoPostgresDB = require('../messagesDaoPostgresDB');
const sinon = require('sinon');
const util = require('../../../util');

describe('MessagesDaoPostgresDB', () => {
    describe('initialize', () => {
        let dao;
        let mockUrl;
        let sandbox;
        let mockClient;
        let mockPromise;

        before(() => {
            dao = new MessagesDaoPostgresDB();
            sandbox = sinon.createSandbox();
            mockClient = {
                connect: () => {},
            };
            sandbox.stub(MessagesDaoPostgresDB, 'createPgClient').returns(mockClient);
            mockPromise = {
                then: () => mockPromise,
                catch: () => mockPromise, //sandbox.stub().returns(mockPromise),
            };
            sandbox.stub(mockClient, 'connect').returns(mockPromise);
            sandbox.stub(console, 'error');
            mockUrl = {
                user: 'postgres',
                password: 'knopka',
                host: 'localhost',
                port: 5432,
                database: 'chatDB',
            };

            dao.initialize();
        });

        after(() => {
            sandbox.restore();
        });

        it('should called client.connect', () => {
            sinon.assert.calledOnce(mockClient.connect);
        });

        it('should called MessagesDaoPostgresDB.createPgClient', () => {
            sinon.assert.calledOnce(MessagesDaoPostgresDB.createPgClient);
        });

        it('should called MessagesDaoPostgresDB.createPgClient with args', () => {
            sinon.assert.calledWith(MessagesDaoPostgresDB.createPgClient, mockUrl);
        });
    });

    describe('create', () => {
        let dao;
        let sandbox;
        let mockClient;
        let mockObject;

        before(async () => {
            dao = new MessagesDaoPostgresDB();
            sandbox = sinon.createSandbox();
            mockObject = {
                message: 'message',
                sender: 'sender',
                receiver: 'receiver',
                date: 'date',
            };
            mockClient = {
                query: sandbox.stub(),
            };
            sandbox.stub(dao, 'client').get(() => mockClient);

            await dao.create(mockObject);
        });

        after(() => {
            sandbox.restore();
        });

        it('should calledOnce .query()', () => {
            sinon.assert.calledOnce(mockClient.query);
        });

        it('should calledOnce .query() with args', () => {
            sinon.assert.calledWith(mockClient.query, `insert into messages(message, sender, receiver, date) values($1,$2,$3,$4)`, [mockObject.message, mockObject.sender, mockObject.receiver, mockObject.date]);
        });
    });

    describe('readByReceiver', () => {
        let dao;
        let sandbox;
        let mockClient;
        let mockPromise;
        let mockReceiver;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new MessagesDaoPostgresDB();
            sandbox = sinon.createSandbox();
            mockReceiver = void 0;
            expectedResult = {
                mockReceiver: void 0,
            };
            mockPromise = {
                then: sandbox.stub().returns(expectedResult),
            };
            mockClient = {
                query: sandbox.stub().returns(mockPromise),
            };
            sandbox.stub(dao, 'client').get(() => mockClient);

            actualResult = await dao.readByReceiver(mockReceiver);
        });

        after(() => {
            sandbox.restore();
        });

        it('should called once .query()', () => {
            sinon.assert.calledOnce(mockClient.query);
        });

        it('should called once .query() with args', () => {
            sinon.assert.calledWith(mockClient.query, 'select * from messages where receiver = $1', [mockReceiver]);
        });

        it('should be equal', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readBySenderAndReceiver', () => {
        let dao;
        let sandbox;
        let mockParams;
        let mockClient;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new MessagesDaoPostgresDB();
            sandbox = sinon.createSandbox();
            mockClient = {
                query: sandbox.stub(),
            };
            mockParams = {
                sender: 'sender',
                receiver: 'receiver',
            };
            const sentResult = [[{
                _id: '_id-1',
                date: 1,
                sender: 'sender-1',
                message: 'message-1',
                receiver: 'receiver-1',
            }]];
            const receivedResult = [[{
                _id: '_id-2',
                date: 2,
                sender: 'sender-2',
                message: 'message-2',
                receiver: 'receiver-2',
            }]];
            mockClient.query.withArgs(`select * from messages where sender = $1 and receiver = $2`, [mockParams.sender, mockParams.receiver]).returns(sentResult);
            mockClient.query.withArgs(`select * from messages where sender = $1 and receiver = $2`, [mockParams.receiver, mockParams.sender]).returns(receivedResult);
            expectedResult = [{
                _id: '_id-1',
                date: 1,
                sender: 'sender-1',
                message: 'message-1',
                receiver: 'receiver-1',
            }, {
                _id: '_id-2',
                date: 2,
                sender: 'sender-2',
                message: 'message-2',
                receiver: 'receiver-2',
            }];
            sandbox.stub(dao, 'client').get(() => mockClient);

            actualResult = await dao.readBySenderAndReceiver(mockParams.sender, mockParams.receiver);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should be equal', () => {
            assert.deepEqual(actualResult, expectedResult);
        });
    });
});