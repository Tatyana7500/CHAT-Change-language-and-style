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
        let mockUserDAO;

        before(async () => {
            sandbox = sinon.createSandbox();
            mockObject = {};
            mockUserDAO = {
                create: sandbox.stub(),
            };
            sandbox.stub(chatDAL, 'usersDAO').get(() => mockUserDAO);

            await chatDAL.createUser(mockObject);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once chatDAL.create', () => {
            sinon.assert.calledOnce(mockUserDAO.create);
            sinon.assert.calledWith(mockUserDAO.create, mockObject);
        });
    });

    describe('createMessage', () => {
        let sandbox;
        let mockObject;
        let mockMessagesDAO;

        before(async () => {
            sandbox = sinon.createSandbox();
            mockObject = {};
            mockMessagesDAO = {
                create: sandbox.stub(),
            };
            sandbox.stub(chatDAL, 'messagesDAO').get(() => mockMessagesDAO);

            await chatDAL.createMessage(mockObject);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once chatDAL.create', () => {
            sinon.assert.calledOnce(mockMessagesDAO.create);
            sinon.assert.calledWith(mockMessagesDAO.create, mockObject);
        });
    });

    describe('read', () => {
        let sandbox;
        let mockObject;
        let mockUserDAO;
        let actualResult;
        let expectedResult;

        before(async () => {
            sandbox = sinon.createSandbox();
            mockObject = {
                email: 'email',
                password: 'password',
            };
            expectedResult = {
                email: 'email',
                password: 'password',
            };
            mockUserDAO = {
                read: sandbox.stub().returns(mockObject),
            };
            sandbox.stub(chatDAL, 'usersDAO').get(() => mockUserDAO);

            actualResult = await chatDAL.read(mockObject);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once chatDAL.read', () => {
            sinon.assert.calledOnce(mockUserDAO.read);
            sinon.assert.calledWith(mockUserDAO.read, mockObject);
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readUser', () => {
        let sandbox;
        let mockEmail;
        let mockPassword;
        let mockUserDAO;
        let actualResult;
        let expectedResult;

        before(async () => {
            sandbox = sinon.createSandbox();
            mockEmail = 'email';
            mockPassword = 'password';
            expectedResult = {
                email: 'email',
                password: 'password',
            };
            mockUserDAO = {
                readUser: sandbox.stub().returns(expectedResult),
            };
            sandbox.stub(chatDAL, 'usersDAO').get(() => mockUserDAO);

            actualResult = await chatDAL.readUser(mockEmail, mockPassword);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once chatDAL.readUser', () => {
            sinon.assert.calledOnce(mockUserDAO.readUser);
            sinon.assert.calledWith(mockUserDAO.readUser, mockEmail, mockPassword);
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readUserToId', () => {
        let sandbox;
        let mockId;
        let mockUserDAO;
        let actualResult;
        let expectedResult;

        before(async () => {
            sandbox = sinon.createSandbox();
            mockId = '1';
            expectedResult = {
                _id: '1',
                name: 'name',
                email: 'email',
                password: 'password',
            };
            mockUserDAO = {
                readUserToId: sandbox.stub().returns(expectedResult),
            };
            sandbox.stub(chatDAL, 'usersDAO').get(() => mockUserDAO);

            actualResult = await chatDAL.readUserToId(mockId);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once chatDAL.readUserToId', () => {
            sinon.assert.calledOnce(mockUserDAO.readUserToId);
            sinon.assert.calledWith(mockUserDAO.readUserToId, mockId);
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readAllUsers', () => {
        let sandbox;
        let mockUserDAO;
        let actualResult;
        let expectedResult;

        before(async () => {
            sandbox = sinon.createSandbox();
            expectedResult = {
                _id: '1',
                name: 'name',
                email: 'email',
                password: 'password',
            };
            mockUserDAO = {
                readAll: sandbox.stub().returns(expectedResult),
            };
            sandbox.stub(chatDAL, 'usersDAO').get(() => mockUserDAO);

            actualResult = await chatDAL.readAllUsers();
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once chatDAL.readUserToId', () => {
            sinon.assert.calledOnce(mockUserDAO.readAll);
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readPublicMessages', () => {
        let sandbox;
        let mockMessagesDAO;
        let actualResult;
        let expectedResult;

        before(async () => {
            sandbox = sinon.createSandbox();
            expectedResult = {
                message: 'message',
                date: 123456,
                sender: '1',
                receiver: 'ALL',
            };
            mockMessagesDAO = {
                readByReceiver: sandbox.stub().returns(expectedResult),
            };
            sandbox.stub(chatDAL, 'messagesDAO').get(() => mockMessagesDAO);

            actualResult = await chatDAL.readPublicMessages();
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once chatDAL.readPublicMessages', () => {
            sinon.assert.calledOnce(mockMessagesDAO.readByReceiver);
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readPublicMessages', () => {
        let sandbox;
        let mockMessagesDAO;
        let actualResult;
        let expectedResult;
        let mockSender;
        let mockReceiver;

        before(async () => {
            sandbox = sinon.createSandbox();
            mockSender = '1';
            mockReceiver = '2';
            expectedResult = {
                message: 'message',
                date: 123456,
                sender: '1',
                receiver: '2',
            };
            mockMessagesDAO = {
                readBySenderAndReceiver: sandbox.stub().returns(expectedResult),
            };
            sandbox.stub(chatDAL, 'messagesDAO').get(() => mockMessagesDAO);

            actualResult = await chatDAL.readPrivateMessages(mockSender, mockReceiver);
        });

        after(() => {
            sandbox.restore();
        });

        it('Should called once chatDAL.readPrivateMessages', () => {
            sinon.assert.calledOnce(mockMessagesDAO.readBySenderAndReceiver);
            sinon.assert.calledWith(mockMessagesDAO.readBySenderAndReceiver, mockSender, mockReceiver);
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readPublicMessages', () => {
        let sandbox;
        let mockMessages;
        let mockUsers;
        let mockChat;
        let actualResult;
        let expectedResult;

        before(async () => {
            sandbox = sinon.createSandbox();
            mockMessages = [{
                message: 'message',
                date: 123456,
                sender: '1',
                receiver: '1',
            }];
            mockUsers = [{
                _id: '1',
                name: 'name',
                email: 'email',
                password: 'password',
            }];
            expectedResult = [{
                message: 'message',
                date: 123456,
                name: 'name',
                email: 'email',
            }];
            mockChat = {
                push: sandbox.stub().returns(expectedResult),
            };

            actualResult = await chatDAL.mergeMessageAndUser(mockMessages, mockUsers);
        });

        after(() => {
            sandbox.restore();
        });

        // it('Should called once chatDAL.mergeMessageAndUser', () => {
        //     sinon.assert.calledOnce(mockChat.push);
        //     sinon.assert.calledWith(mockChat.push, mockMessages, mockUsers);
        // });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });
});