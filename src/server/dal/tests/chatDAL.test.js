const ChatDAL = require('../chatDAL');
const constants = require('../../../constants');
const config = require('../../config');
const sinon = require('sinon');
const assert = require('assert');

describe('ChatDAL', () => {
    let chatDAL;

    before(() => {
        chatDAL = new ChatDAL();
    });

    describe('createMessagesDAO', () => {
        let sandbox;

        before(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.reset();
        });

        it('should be equal to MessagesDaoMongoDB', () => {
            const expected = 'MessagesDaoMongoDB';
            sandbox.stub(config, 'databaseType').get(() => constants.MONGO);

            const actual = chatDAL.createMessagesDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should be equal to MessagesDaoRedisDB', () => {
            const expected = 'MessagesDaoRedisDB';
            sandbox.stub(config, 'databaseType').get(() => constants.REDIS);

            const actual = chatDAL.createMessagesDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should be equal to MessagesDaoMySqlDB', () => {
            const expected = 'MessagesDaoMySqlDB';
            sandbox.stub(config, 'databaseType').get(() => constants.MYSQL);

            const actual = chatDAL.createMessagesDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should be equal to MessagesDaoPostgresDB', () => {
            const expected = 'MessagesDaoPostgresDB';
            sandbox.stub(config, 'databaseType').get(() => constants.POSTGRES);

            const actual = chatDAL.createMessagesDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should be equal to MessagesDaoMockDB', () => {
            const expected = 'MessagesDaoMockDB';
            sandbox.stub(config, 'databaseType').get(() => constants.MOCK);

            const actual = chatDAL.createMessagesDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should throw Error', () => {
            sandbox.stub(config, 'databaseType').get(() => 'UNKNOWN');

            assert.throws(chatDAL.createMessagesDAO, Error, 'unknown databaseType');
        });
    });

    describe('createUsersDAO', () => {
        let sandbox;

        before(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.reset();
        });

        it('should be equal to UsersDaoMongoDB', () => {
            const expected = 'UsersDaoMongoDB';
            sandbox.stub(config, 'databaseType').get(() => constants.MONGO);

            const actual = chatDAL.createUsersDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should be equal to UsersDaoRedisDB', () => {
            const expected = 'UsersDaoRedisDB';
            sandbox.stub(config, 'databaseType').get(() => constants.REDIS);

            const actual = chatDAL.createUsersDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should be equal to UsersDaoMySqlDB', () => {
            const expected = 'UsersDaoMySqlDB';
            sandbox.stub(config, 'databaseType').get(() => constants.MYSQL);

            const actual = chatDAL.createUsersDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should be equal to UsersDaoPostgresDB', () => {
            const expected = 'UsersDaoPostgresDB';
            sandbox.stub(config, 'databaseType').get(() => constants.POSTGRES);

            const actual = chatDAL.createUsersDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should be equal to UsersDaoMockDB', () => {
            const expected = 'UsersDaoMockDB';
            sandbox.stub(config, 'databaseType').get(() => constants.MOCK);

            const actual = chatDAL.createUsersDAO().constructor.name;

            assert.strictEqual(actual, expected);
        });

        it('should throw Error', () => {
            sandbox.stub(config, 'databaseType').get(() => 'UNKNOWN');

            assert.throws(chatDAL.createUsersDAO, Error, 'unknown databaseType');
        });
    });

    describe('initialize', () => {
        let sandbox;
        let mockUsersDAO;
        let mockMessagesDAO;

        before(() => {
            sandbox = sinon.createSandbox();
            mockUsersDAO = {
                daoType: 'mockUsersDAO',
                initialize: sandbox.stub(),
            };
            mockMessagesDAO = {
                daoType: 'mockMessagesDAO',
                initialize: sandbox.stub(),
            };
            sandbox.stub(chatDAL, 'createUsersDAO').returns(mockUsersDAO);
            sandbox.stub(chatDAL, 'createMessagesDAO').returns(mockMessagesDAO);
        });

        afterEach(() => {
            sandbox.resetHistory();
        });

        after(() => {
            sandbox.reset();
        });

        it('should created DAOs and initialize them', () => {
            chatDAL.initialize();

            assert.deepStrictEqual(chatDAL.messagesDAO, mockMessagesDAO);
            sinon.assert.calledOnce(chatDAL.messagesDAO.initialize);
        });

        it('should created DAOs and initialize them', () => {
            chatDAL.initialize();

            assert.deepStrictEqual(chatDAL.usersDAO, mockUsersDAO);
            sinon.assert.calledOnce(chatDAL.usersDAO.initialize);
        });
    });
});