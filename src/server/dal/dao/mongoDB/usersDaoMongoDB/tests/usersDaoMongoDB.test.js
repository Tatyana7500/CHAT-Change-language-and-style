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
        let user;
        let sandBox;
        let mockModel;
        let mockUserModel;
        let mockObject;

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

            dao.create(mockObject);
        });

        after(() => {
            sandBox.restore();
        });

        it('should call this.model()', async () => {
            await sinon.assert.calledOnce(dao.model);
            await sinon.assert.calledWith(dao.model, mockObject);
        });

        it('should call save', async () => {
            await sinon.assert.calledOnce(mockUserModel.save);
        });
    });
});