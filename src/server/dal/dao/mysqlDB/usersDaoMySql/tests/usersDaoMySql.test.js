const mysql = require('mysql2');
const UsersDaoMySqlDB = require('../usersDaoMySql');
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
    //
    //     before(() => {
    //         dao = new UsersDaoMySqlDB();
    //         sandBox = sinon.createSandbox();
    //
    //         sandBox.stub(mysql, 'createConnection');
    //
    //         dao.initialize();
    //     });
    //
    //     after();
    //
    //     it();
    // });
});