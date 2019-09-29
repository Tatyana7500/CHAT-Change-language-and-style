const { assert } = require('chai');
const sinon = require('sinon');
const UsersDaoMySqlDB = require('../usersDaoMySql');
const mysql = require('mysql2');
const util = require('../../../util');
const config = require('../../../../../config');

describe('UsersDaoMySql', () => {
    describe('UsersDaoMySql create', () => {
        let dao;
        let sandBox;
        let mockObject;
        let mockConnection;

        before(async () => {
            dao = new UsersDaoMySqlDB();
            sandBox = sinon.createSandbox();
            mockObject = {
                name: 'name',
                email: 'email',
                password: 'password',
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
                `INSERT INTO users(name, email, password) VALUES('${mockObject.name}', '${mockObject.email}', '${mockObject.password}')`,
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
            dao = new UsersDaoMySqlDB();
            sandbox = sinon.createSandbox();
            mockConnection = {
                connect: sandbox.stub(),
                query: sandbox.stub(),
            };
            mockPromise = {
                promise: sandbox.stub(),
            };
            url = config.settings.mysql;
            users = `create table if not exists users(
  _id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL)`;
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

    describe('readUser', () => {
        let dao;
        let sandbox;
        let mockUser;
        let mockParams;
        let mockPromise;
        let actualResult;
        let mockConnection;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoMySqlDB();
            sandbox = sinon.createSandbox();
            mockParams = {
                email: 'email1',
                password: 'password1',
            };
            mockUser = [];
            mockPromise = {
                then: sandbox.stub(),
            };
            mockConnection = {
                execute: sandbox.stub().returns(mockPromise),
            };
            expectedResult = [];
            sandbox.stub(dao, 'connection').get(() => mockConnection);
            sandbox.stub(util, 'convertUser').returns(mockUser);

            actualResult = await dao.readUser(mockParams.email, mockParams.password);
        });

        after(() => {
            sandbox.restore();
        });

        it('should be equal', () => {
            assert.deepEqual(actualResult, expectedResult);
        });

        it('should calls .execute()', () => {
            sinon.assert.calledOnce(mockConnection.execute);
        });

        it('should called util.convertUser', () => {
            sinon.assert.calledOnce(util.convertUser);
        });

        it('should called util.convertUser', () => {
            sinon.assert.calledWith(util.convertUser, mockUser);
        });

        it('should calls .execute() with args', () => {
            sinon.assert.calledWith(mockConnection.execute, `SELECT * FROM users WHERE email='${mockParams.email}' AND password='${mockParams.password}'`);
        });
    });

    describe('readAll', () => {
        let dao;
        let sandbox;
        let mockUsers;
        let mockResult;
        let actualResult;
        let mockConnection;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoMySqlDB();
            sandbox = sinon.createSandbox();
            mockConnection = {
                query: sandbox.stub().returns([{}]),
            };
            sandbox.stub(dao, 'connection').get(() => mockConnection);
            mockResult = {};
            sandbox.stub(util, 'convertUsers').returns(mockResult);
            expectedResult = {};

            actualResult = await dao.readAll();
        });

        after(() => {
            sandbox.restore();
        });

        it('should called util.convertUsers()', () => {
            sinon.assert.calledOnce(util.convertUsers);
        });

        it('should called util.convertUsers() with args', () => {
            sinon.assert.calledWith(util.convertUsers, mockResult);
        });

        it('should called .query()', () => {
            sinon.assert.calledOnce(mockConnection.query);
        });

        it('should called .query() with args', () => {
            sinon.assert.calledWith(mockConnection.query, 'SELECT * FROM users');
        });

        it('Should be equal', () => {
            assert.deepEqual(actualResult, expectedResult);
        });
    });

    // describe('readUserToId', () => {
    //     let dao;
    //     let sandbox;
    //     let expectedResult;
    //     let actualResult;
    //
    //     before(async () => {
    //         dao = new UsersDaoMySqlDB();
    //         sandbox = sinon.createSandbox();
    //         expectedResult = {};
    //     });
    //
    //     after(() => {
    //         sandbox.restore();
    //     });
    //
    //     it();
    // });
});