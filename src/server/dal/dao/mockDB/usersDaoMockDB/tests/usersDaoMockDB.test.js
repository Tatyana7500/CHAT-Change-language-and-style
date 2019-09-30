const UsersDaoMockDB = require('../usersDaoMockDB');
const sinon = require('sinon');
const assert = require('assert');

describe('UsersDaoMockDB', () => {
    describe('UsersDaoMockDB', () => {
        let expected = null;

        before(() => {
            expected = {
                connection: null,
                model: [],
                count: 1,
            };
        });

        it('Should past!', () => {
            const actual = new UsersDaoMockDB();
            assert.deepEqual(actual, expected);
        });
    });

    describe('readAll', () => {
        let dao;
        let sandBox;
        let mockId;
        let actualResult;
        let mockUsersModel;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoMockDB();
            expectedResult = [{
                _id: '1',
                name: 'name',
                email: 'email',
                password: 'password',
            }];
            mockId = '';
            sandBox = sinon.createSandbox();
            mockUsersModel = {
                filter: sandBox.stub(),
            };

            mockUsersModel.filter.returns(expectedResult);
            sandBox.stub(dao, 'model').get(() => mockUsersModel);

            actualResult = await dao.readUserToId(mockId);
        });

        after(() => {
            sandBox.restore();
        });

        it('Should called once', () => {
            sinon.assert.calledOnce(mockUsersModel.filter);
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('readUser', () => {
        let dao;
        let sandBox;
        let mockEmail;
        let mockPassword;
        let actualResult;
        let mockUsersModel;
        let expectedResult;

        before(async () => {
            dao = new UsersDaoMockDB();
            expectedResult = {
                _id: '1',
                name: 'name',
                email: 'email',
                password: 'password',
            };
            mockEmail = 'email';
            mockPassword = 'password';
            sandBox = sinon.createSandbox();
            sandBox.stub(dao, 'model').get(() => mockUsersModel);
            mockUsersModel = {
                filter: sandBox.stub().returns(expectedResult),
            };

            actualResult = await dao.readUser(mockEmail, mockPassword);
        });

        after(() => {
            sandBox.restore();
        });

        // it('Should called once', () => {
        //     sinon.assert.calledOnce(mockUsersModel.filter);
        // });

        // it('Should return result', () => {
        //     assert.deepStrictEqual(actualResult, expectedResult);
        // });
    });
});