const UsersDaoMySqlDB = require('../usersDaoMySql');
const mysql = require('mysql2');
const assert = require('assert');
const sinon = require('sinon');

describe('UsersDaoMySqlDB', () => {
    describe('UsersDaoMySqlDB', () => {
        let expected;

        before(() => {
            expected = {
                connection: null,
                model: null,
            };
        });

        it('Should past!', () => {
            const actual = new UsersDaoMySqlDB();
            assert.deepEqual(actual, expected);
        });
    });

    // describe('Initialization', () => {
    //     let dao;
    //     let sandBox;
    //     let mockPromise;
    //     let mockConnection;
    //
    //     before(() => {
    //         dao = new UsersDaoMySqlDB();
    //         sandBox = sinon.createSandbox();
    //         mockPromise = {
    //             promise: () => mockPromise,
    //         };
    //         mockConnection = {
    //             connect: sandBox.stub(),
    //             query: sandBox.stub(),
    //         };
    //         sandBox.spy(mockPromise, 'promise');
    //         sandBox.stub(mysql, 'createConnection').returns(mockPromise);
    //         sandBox.stub(dao, 'connection').get(() => mockConnection.connect);
    //         sandBox.stub(dao, 'connection').get(() => mockConnection.query);
    //
    //         dao.initialize();
    //     });
    //
    //     after(() => {
    //         sandBox.restore();
    //     });
    //
    //     // it('Should called once create connections', () => {
    //     //     sinon.assert.calledOnce(mysql.createConnection);
    //     //     sinon.assert.calledWith(mysql.createConnection, '');
    //     // });
    //
    //     it('Should called once connect', () => {
    //         sinon.assert.calledOnce(mockConnection.connect);
    //         // sinon.assert.calledWith(mysql.createConnection, '');
    //     });
    // });

    // describe('create', () => {
    //     let dao;
    //     let sandBox;
    //     let mockObject;
    //     let mockConnection;
    //
    //     before(async () => {
    //         dao = UsersDaoMySqlDB();
    //         sandBox = sinon.createSandbox();
    //         mockObject = {
    //             name: 'name',
    //             email: 'email',
    //             password: 'password',
    //         };
    //         mockConnection = {
    //             query: sandBox.stub(),
    //         };
    //         sandBox.stub(dao, 'connection').returns(mockConnection);
    //
    //         await dao.create(mockObject);
    //     });
    //
    //     after(() => {
    //         sandBox.restore();
    //     });
    //
    //     it('Should called once query', () => {
    //         sinon.assert.calledOnce(mockConnection.query);
    //     });
    // });
});