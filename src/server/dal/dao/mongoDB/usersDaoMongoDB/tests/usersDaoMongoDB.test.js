const UsersDaoMongoDB = require('../usersDaoMongoDB');
const mongoose = require('mongoose');
const sinon = require('sinon');
const assert = require('assert');

describe('usersDaoMongoDB', () => {
    describe('UsersDaoMongoDB', () => {
        let expected = null;

        before(() => {
            expected = {
                connection: null,
                model: null,
            };
        });

        it('Should past!', () => {
            const actual = new UsersDaoMongoDB();
            assert.deepEqual(actual, expected);
        });
    });

    describe('Initialize', () => {
        let dao;
        let sandbox;
        let mockError;
        let mockModel;
        let mockPromise;
        let mockConnection;

        before(() => {
            dao = new UsersDaoMongoDB();
            sandbox = sinon.createSandbox();
            mockError = 'error';
            mockModel = {};
            mockConnection = {
                model: () => mockModel,
            };
            sandbox.spy(mockConnection, 'model');
            mockPromise = {
                then: () => mockPromise,
                catch: () => mockPromise,
            };
            sandbox.spy(mockPromise, 'then');
            sandbox.spy(mockPromise, 'catch');
            sandbox.stub(mongoose, 'createConnection').returns(mockPromise);
            sandbox.stub(console, 'error');

            dao.initialize();
        });

        after(() => {
            sandbox.restore();
        });

        it('should call createConnection', () => {
            sinon.assert.calledOnce(mongoose.createConnection);
            sinon.assert.calledWith(mongoose.createConnection, 'mongodb://localhost:27017/chatDB');
        });

        it('should initialize dao connection and model', () => {
            const thenCallback = mockPromise.then.getCall(0).args[0];
            thenCallback(mockConnection);

            assert.strictEqual(dao.connection, mockConnection);
            assert.strictEqual(dao.model, mockModel);
        });

        it('should call console.error', () => {
            const errorCallback = mockPromise.catch.getCall(0).args[0];
            errorCallback(mockError);

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
            dao = new UsersDaoMongoDB();
            mockObject = {};
            sandBox = sinon.createSandbox();
            mockModel = sandBox.stub();
            mockUserModel = {
                save: sandBox.stub(),
            };
            mockModel.returns(mockUserModel);
            sandBox.stub(dao, 'model').get(() => mockModel);

            await dao.create(mockObject);
        });

        after(() => {
            sandBox.restore();
        });

        it('should call this.model()', () => {
            sinon.assert.calledOnce(dao.model);
            sinon.assert.calledWith(dao.model, mockObject);
        });

        it('should call save', () => {
            sinon.assert.calledOnce(mockUserModel.save);
        });
    });

    describe('readAll', () => {
        let dao;
        let sandBox;
        let actualResult;
        let mockUsersModel;
        let expectedResult = ['user1', 'user2', 'user3'];

        before(async () => {
            dao = new UsersDaoMongoDB();
            sandBox = sinon.createSandbox();
            mockUsersModel = {
                find: sandBox.stub(),
            };
            mockUsersModel.find.returns(expectedResult);
            sandBox.stub(dao, 'model').get(() => mockUsersModel);

            actualResult = await dao.readAll();
        });

        after(() => {
            sandBox.restore();
        });

        after(() => {
            sandBox.restore();
        });

        it('should call dao.model.find() once', () => {
            sinon.assert.calledOnce(mockUsersModel.find);
            sinon.assert.calledWith(mockUsersModel.find, {});
        });

        it('should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readUser', () => {
        let dao;
        let sandBox;
        let mockObject;
        let actualResult;
        let mockUsersModel;
        let expectedResult = {
            name: 'name',
            email: 'email',
            password: 'password',
        };

        before(async () => {
            dao = new UsersDaoMongoDB();
            sandBox = sinon.createSandbox();
            mockObject = {
                email: 'email',
                password: 'password',
            };
            mockUsersModel = {
                findOne: sandBox.stub(),
            };
            mockUsersModel.findOne.returns(expectedResult);
            sandBox.stub(dao, 'model').get(() => mockUsersModel);

            actualResult = await dao.readUser(mockObject.email, mockObject.password);
        });

        after(() => {
            sandBox.restore();
        });

        it('Should called once findOne()', () => {
            const { email, password } = mockObject;

            sinon.assert.calledOnce(mockUsersModel.findOne);
            sinon.assert.calledWith(mockUsersModel.findOne, { email, password });
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readUsersToId', () => {
        let dao;
        let mockId;
        let sandBox;
        let actualResult;
        let mockUsersModel;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoMongoDB();
            sandBox = sinon.createSandbox();
            mockId = '';
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

            actualResult = await dao.readUserToId(mockId);
        });

        after(() => {
            sandBox.restore();
        });

        it('Should called once', () => {
            sinon.assert.calledOnce(mockUsersModel.find);
            sinon.assert.calledWith(mockUsersModel.find, { _id: mockId });
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });
});