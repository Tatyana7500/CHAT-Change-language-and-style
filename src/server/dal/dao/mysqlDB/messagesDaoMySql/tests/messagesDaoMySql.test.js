const { assert } = require('chai');
const sinon = require('sinon');
const MessagesDaoMySqlDB = require('../messagesDaoMySql');
const mysql = require('mysql2');
const util = require('../../../util');

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
});