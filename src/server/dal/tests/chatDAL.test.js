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
            sandbox.restore();
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

    describe('createMessagesDAO', () => {
        let sandbox;

        before(() => {
            sandbox = sinon.createSandbox();
            sandbox.stub(chatDAL, 'initialize');
        });

        afterEach(() => {
            sandbox.resetHistory();
        });

        after(() => {
            sandbox.restore();
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
            sandbox.stub(chatDAL, 'initialize');
        });

        afterEach(() => {
            sandbox.resetHistory();
        });

        afterEach(() => {
            sandbox.restore();
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

    describe('createUser', () => {
        let sandbox;
        let mockObject;
        let mockModel;
        let mockUserModel;

        before(async () => {
            sandbox = sinon.createSandbox();
            mockObject = {};
            mockModel = sandbox.stub();
            mockUserModel = {
                create: sandbox.stub(),
            };
            mockModel.returns(mockUserModel);
            sandbox.stub(chatDAL, 'usersDAO').get(() => mockModel);

            chatDAL.createUser(mockObject);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('Should called once this.createUser', () => {
            sinon.assert.calledOnce(chatDAL.usersDAO);
            sinon.assert.calledWith(chatDAL.usersDAO, mockObject);
        });

        it('Should called once create', () => {
            sinon.assert.calledOnce(mockUserModel.create);
        });
    });
});