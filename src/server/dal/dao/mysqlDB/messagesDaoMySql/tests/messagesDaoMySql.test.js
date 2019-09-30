const { assert } = require('chai');
const sinon = require('sinon');
const MessagesDaoMySqlDB = require('../messagesDaoMySql');
const mysql = require('mysql2');
const util = require('../../../util');
const config = require('../../../../../config');

describe('MessagesDaoMySqlDB', () => {
    describe('create', () => {
        let dao;
        let sandBox;
        let mockObject;
        let mockConnection;

        before(async () => {
            dao = new MessagesDaoMySqlDB();
            sandBox = sinon.createSandbox();
            mockObject = {
                message: 'message',
                sender: 'sender',
                receiver: 'receiver',
                date: 'date',
            };
            mockConnection = {
                query: sandBox.stub(),
            };
            sandBox.stub(dao, 'connection').get(() => mockConnection);

            await dao.create(mockObject);
        });

        after(() => {
            sandBox.restore();
        });

        it('should be create user', () => {
            sinon.assert.calledOnce(dao.connection.query);
            sinon.assert.calledWith(
                dao.connection.query,
                `INSERT INTO messages(message, sender, receiver, date) VALUES('${mockObject.message}', '${mockObject.sender}', '${mockObject.receiver}', '${mockObject.date}')`,
            );
        });
    });

    describe('Initialization', () => {
        let dao;
        let url;
        let users;
        let sandbox;
        let mockPromise;
        let mockConnection;

        before(() => {
            dao = new MessagesDaoMySqlDB();
            sandbox = sinon.createSandbox();
            mockConnection = {
                connect: sandbox.stub(),
                query: sandbox.stub(),
            };
            mockPromise = {
                promise: sandbox.stub(),
            };
            url = config.settings.mysql;
            users = `create table if not exists messages(
  _id INT PRIMARY KEY AUTO_INCREMENT,
  message VARCHAR(255) NOT NULL,
  sender VARCHAR(255) NOT NULL,
  receiver VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL)`;
            mockPromise.promise.returns(mockConnection);
            sandbox.stub(mysql, 'createConnection').returns(mockPromise);

            dao.initialize();
        });

        after(() => {
            sandbox.restore();
        });

        it('should called mysql.createConnection', () => {
            sinon.assert.calledOnce(mysql.createConnection);
        });

        it('should called mysql.createConnection with args', () => {
            sinon.assert.calledWith(mysql.createConnection, url);
        });

        it('should called .connect()', () => {
            sinon.assert.calledOnce(mockConnection.connect);
        });

        it('should called .query()', () => {
            sinon.assert.calledOnce(mockConnection.query);
        });

        it('should called .query() with args', () => {
            sinon.assert.calledWith(mockConnection.query, users);
        });
    });

    describe('readByReceiver', () => {
        let dao;
        let sandbox;
        let expectedResult;
        let mockConnection;
        let actualResult;
        let mockReceiver;

        before(async () => {
            dao = new MessagesDaoMySqlDB();
            sandbox = sinon.createSandbox();
            mockConnection = {
                query: sandbox.stub().returns([{}]),
            };
            mockReceiver = '';
            expectedResult = {};
            sandbox.stub(dao, 'connection').get(() => mockConnection);
            sandbox.stub(util, 'convertMessages').returns({});

            actualResult = await dao.readByReceiver(mockReceiver);
        });

        after(() => {
            sandbox.restore();
        });

        it('should called util.convertMessages()', () => {
            sinon.assert.calledOnce(util.convertMessages);
        });

        it('should called util.convertMessages() with args', () => {
            sinon.assert.calledWith(util.convertMessages, {});
        });

        it('should called .query()', () => {
            sinon.assert.calledOnce(mockConnection.query);
        });

        it('should called .query() with args', () => {
            sinon.assert.calledWith(mockConnection.query, `SELECT * FROM messages WHERE receiver = '${mockReceiver}'`);
        });

        it('Should be equal', () => {
            assert.deepEqual(actualResult, expectedResult);
        });
    });

    describe('readBySenderAndReceiver', () => {
        let dao;
        let sandbox;
        let mockParams;
        let actualResult;
        let expectedResult;
        let mockConnection;

        before(async () => {
            dao = new MessagesDaoMySqlDB();
            sandbox = sinon.createSandbox();
            mockConnection = {
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
                textRow: 'textRow-1',
                message: 'message-1',
                receiver: 'receiver-1',
            }]];
            const receivedResult = [[{
                _id: '_id-2',
                date: 2,
                sender: 'sender-2',
                message: 'message-2',
                textRow: 'textRow-2',
                receiver: 'receiver-2',
            }]];
            mockConnection.query.withArgs(`SELECT * FROM messages WHERE sender = '${mockParams.sender}' AND receiver = '${mockParams.receiver}'`).returns(sentResult);
            mockConnection.query.withArgs(`SELECT * FROM messages WHERE sender = '${mockParams.receiver}' AND receiver = '${mockParams.sender}'`).returns(receivedResult);
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
            sandbox.stub(dao, 'connection').get(() => mockConnection);

            actualResult = await dao.readBySenderAndReceiver(mockParams.sender, mockParams.receiver);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once util.convertMessages()', () => {
            assert.deepEqual(actualResult, expectedResult);
        });
    });
});