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
                catch: () => mockPromise,
            };
            sandbox.stub(mockClient, 'connect').returns(mockPromise);
            mockUrl = {
                user: 'postgres',
                password: 'qazxsw01',
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
    });
});