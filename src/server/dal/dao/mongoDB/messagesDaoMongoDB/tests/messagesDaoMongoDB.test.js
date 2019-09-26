const MessagesDaoMongoDB = require('../messagesDaoMongoDB');
const mongoose = require('mongoose');
const sinon = require('sinon');
const assert = require('assert');
const util = require('../../../util');

describe('messagesDaoMongoDB', () => {
    describe('MessagesDaoMongoDB', () => {
        let expected;

        before(() => {
            expected = {
                connection: null,
                model: null,
            };
        });

        it('Should past!', () => {
            const actual = new MessagesDaoMongoDB();
            assert.deepEqual(actual, expected);
        });
    });

    describe('Initialize', () => {
        let dao;
        let sandBox;
        let mockError;
        let mockModel;
        let mockPromise;
        let mockConnection;

        before(() => {
            dao = new MessagesDaoMongoDB();
            sandBox = sinon.createSandbox();
            mockError = 'error';
            mockModel = {};
            mockConnection = {
                model: () => mockModel,
            };
            sandBox.spy(mockConnection, 'model');
            mockPromise = {
                then: () => mockPromise,
                catch: () => mockPromise,
            };
            sandBox.spy(mockPromise, 'then');
            sandBox.spy(mockPromise, 'catch');
            sandBox.stub(mongoose, 'createConnection').returns(mockPromise);
            sandBox.stub(console, 'error');

            dao.initialize();
        });

        after(() => {
            sandBox.restore();
        });

        it('should call createConnection', () => {
            sinon.assert.calledOnce(mongoose.createConnection);
            sinon.assert.calledWith(mongoose.createConnection, 'mongodb://localhost:27017/chatDB');
        });

        it('Should initialize dao connection and model', () => {
            const then = mockPromise.then.getCall(0).args[0];
            then(mockConnection);

            assert.strictEqual(dao.connection, mockConnection);
            assert.strictEqual(dao.model, mockModel);
        });

        it('Should call console.error', () => {
            const catchCallback = mockPromise.catch.getCall(0).args[0];
            catchCallback(mockError);

            sinon.assert.calledOnce(console.error);
            sinon.assert.calledWith(console.error, mockError);
        });
    });

    describe('create', () => {
        let dao;
        let sandBox;
        let mockModel;
        let mockObject;
        let mockUserModel;

        before(async () => {
            dao = new MessagesDaoMongoDB();
            sandBox = sinon.createSandbox();
            mockObject = {};
            mockModel = sandBox.stub();
            mockUserModel = {
                save: sandBox.stub(),
            };
            mockModel.returns(mockUserModel);
            sandBox.stub(dao, 'model').get(() => mockModel);

            dao.create(mockObject);
        });

        after(() => {
            sandBox.restore();
        });

        it('Should called once this.model()', () => {
            sinon.assert.calledOnce(dao.model);
            sinon.assert.calledWith(dao.model, mockObject);
        });

        it('Should called once save', () => {
            sinon.assert.calledOnce(mockUserModel.save);
        });
    });

    describe('readByReceiver', () => {
        let dao;
        let mockReceiver;
        let sandBox;
        let actualResult;
        let mockUsersModel;
        let expectedResult;

        before(async () => {
            dao = new MessagesDaoMongoDB();
            sandBox = sinon.createSandbox();
            mockReceiver = 'receiver';
            mockUsersModel = {
                find: sandBox.stub(),
            };
            expectedResult = {
                name: 'name',
                email: 'email',
                password: 'password',
            };
            mockUsersModel.find.returns(expectedResult);
            sandBox.stub(dao, 'model').get(() => mockUsersModel);

            actualResult = await dao.readByReceiver(mockReceiver);
        });

        after(() => {
            sandBox.restore();
        });

        it('Should called once', () => {
            sinon.assert.calledOnce(mockUsersModel.find);
            sinon.assert.calledWith(mockUsersModel.find, { receiver: mockReceiver });
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readBySenderAndReceiver', () => {
        let dao;
        let sandBox;
        let utilCall;
        let mockArgs;
        let mockModel;
        let actualResult;
        let expectedResult;
        let mockSentMessages;
        let mockReceivedMessages;

        before(async () => {
            dao = new MessagesDaoMongoDB();
            sandBox = sinon.createSandbox();
            mockArgs = {
                sender: 'sender',
                receiver: 'receiver',
            };
            mockModel = {
                find: sandBox.stub(),
            };
            expectedResult = ['message1', 'message2'];
            mockSentMessages = ['message1'];
            mockReceivedMessages = ['message2'];
            mockModel.find.withArgs({ sender: mockArgs.sender, receiver: mockArgs.receiver }).returns(mockSentMessages);
            mockModel.find.withArgs({ sender: mockArgs.receiver, receiver: mockArgs.sender }).returns(mockReceivedMessages);
            sandBox.stub(util, 'dynamicSort');
            sandBox.stub(dao, 'model').get(() => mockModel);

            actualResult = await dao.readBySenderAndReceiver(mockArgs.sender, mockArgs.receiver);
        });

        after(() => {
            sandBox.restore();
        });

        it('Should called twice', () => {
            sinon.assert.calledTwice(mockModel.find);
            sinon.assert.calledWith(mockModel.find, { sender: mockArgs.sender, receiver: mockArgs.receiver });
            sinon.assert.calledWith(mockModel.find, { sender: mockArgs.receiver, receiver: mockArgs.sender });
        });

        it('Should run util.dynamicSort', () => {
            sinon.assert.calledOnce(util.dynamicSort);
            sinon.assert.calledWith(util.dynamicSort, 'date');
        });

        it('Should be sorted', () => {
            assert.deepStrictEqual([...mockReceivedMessages, ...mockSentMessages].sort(),  expectedResult);
        });

        it('should return correct messages', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });
});