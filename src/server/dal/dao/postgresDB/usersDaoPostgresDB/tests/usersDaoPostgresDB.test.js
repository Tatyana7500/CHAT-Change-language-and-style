const assert = require('assert');
const UsersDaoPostgresDB = require('../usersDaoPostgresDB');
const sinon = require('sinon');

describe('UsersDaoPostgresDB', () => {
    describe('create', () => {
        let dao;
        let sandbox;
        let mockClient;
        let mockObject;

        before(async () => {
            dao = new UsersDaoPostgresDB();
            sandbox = sinon.createSandbox();
            mockObject = {
                name: 'name',
                email: 'email',
                password: 'password',
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
            sinon.assert.calledWith(mockClient.query, `insert into users(name, email, password) values($1,$2,$3)`, [mockObject.name, mockObject.email, mockObject.password]);
        });
    });

    describe('initialize', () => {
        let dao;
        let mockUrl;
        let sandbox;
        let mockClient;
        let mockPromise;

        before(() => {
            dao = new UsersDaoPostgresDB();
            sandbox = sinon.createSandbox();
            mockClient = {
                connect: () => {},
            };
            sandbox.stub(UsersDaoPostgresDB, 'createPgClient').returns(mockClient);
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

        it('should called UsersDaoPostgresDB.createPgClient', () => {
            sinon.assert.calledOnce(UsersDaoPostgresDB.createPgClient);
        });

        it('should called UsersDaoPostgresDB.createPgClient with args', () => {
            sinon.assert.calledWith(UsersDaoPostgresDB.createPgClient, mockUrl);
        });
    });

    describe('readUser', () => {
        let dao;
        let sandbox;
        let mockParams;
        let mockClient;
        let mockPromise;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoPostgresDB();
            sandbox = sinon.createSandbox();
            expectedResult = {};
            mockPromise = {
                then: sandbox.stub().returns(expectedResult),
            };
            mockClient = {
                query: sandbox.stub().returns(mockPromise),
            };
            mockParams = {
                email: '',
                password: '',
            };
            sandbox.stub(dao, 'client').get(() => mockClient);
            actualResult = await dao.readUser(mockParams.email, mockParams.password);
        });

        after(() => {
            sandbox.restore();
        });

        it('should called once .query()', () => {
            sinon.assert.calledOnce(mockClient.query);
        });

        it('should called once .query() with args', () => {
            sinon.assert.calledWith(mockClient.query, `select * from users where email=$1 and password =$2`, [mockParams.email, mockParams.password]);
        });

        it('should be equal', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readAll', () => {
        let dao;
        let sandbox;
        let mockClient;
        let mockPromise;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoPostgresDB();
            sandbox = sinon.createSandbox();
            expectedResult = [];
            mockPromise = {
                then: sandbox.stub().returns(expectedResult),
            };
            mockClient = {
                query: sandbox.stub().returns(mockPromise),
            };
            sandbox.stub(dao, 'client').get(() => mockClient);

            actualResult = await dao.readAll();
        });

        after(() => {
            sandbox.restore();
        });

        it('should called once .query()', () => {
            sinon.assert.calledOnce(mockClient.query);
        });

        it('should called once .query() with args', () => {
            sinon.assert.calledWith(mockClient.query, 'select * from users');
        });

        it('should be equal', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readUserToId', () => {
        let dao;
        let mockId;
        let sandbox;
        let mockClient;
        let mockPromise;
        let actualResult;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoPostgresDB();
            sandbox = sinon.createSandbox();
            mockId = void 0;
            expectedResult = {
                _id: void 0,
            };
            mockPromise = {
                then: sandbox.stub().returns(expectedResult),
            };
            mockClient = {
                query: sandbox.stub().returns(mockPromise),
            };
            sandbox.stub(dao, 'client').get(() => mockClient);

            actualResult = await dao.readUserToId(mockId);
        });

        after(() => {
            sandbox.restore();
        });

        it('should called once .query()', () => {
            sinon.assert.calledOnce(mockClient.query);
        });

        it('should called once .query() with args', () => {
            sinon.assert.calledWith(mockClient.query, `select * from users where _id = $1`, [mockId]);
        });

        it('should be equal', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });
});