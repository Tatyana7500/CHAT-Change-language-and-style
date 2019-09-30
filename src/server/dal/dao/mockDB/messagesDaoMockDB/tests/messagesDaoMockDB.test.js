const MessagesDaoMockDB = require('../messagesDaoMockDB');
const sinon = require('sinon');
const assert = require('assert');
const util = require('../../../util');

describe('MessagesDaoMockDB', () => {
    describe('MessagesDaoMockDB', () => {
        let expected = null;

        before(() => {
            expected = {
                connection: null,
                model: [],
            };
        });

        it('Should past!', () => {
            const actual = new MessagesDaoMockDB();
            assert.deepEqual(actual, expected);
        });
    });

    describe('readByReceiver', () => {
        let dao;
        let sandBox;
        let mockReceiver;
        let actualResult;
        let mockMessagesModel;
        let expectedResult;

        before(async () => {
            dao = new MessagesDaoMockDB();
            expectedResult = [{
                _id: '1',
                name: 'name',
                email: 'email',
                password: 'password',
            }];
            mockReceiver = '1';
            sandBox = sinon.createSandbox();
            mockMessagesModel = {
                filter: sandBox.stub(),
            };

            mockMessagesModel.filter.returns(expectedResult);
            sandBox.stub(dao, 'model').get(() => mockMessagesModel);

            actualResult = await dao.readByReceiver(mockReceiver);
        });

        after(() => {
            sandBox.restore();
        });

        it('Should called once', () => {
            sinon.assert.calledOnce(mockMessagesModel.filter);
        });

        it('Should return result', () => {
            assert.deepStrictEqual(actualResult, expectedResult);
        });
    });

    describe('create', () => {
        let dao;
        let sandBox;
        let mockMessagesModel;
        let expectedResult;

        before(async () => {
            dao = new MessagesDaoMockDB();
            expectedResult = {
                date: '1',
                message: 'message',
                sender: '1',
                receiver: '2',
            };
            sandBox = sinon.createSandbox();
            mockMessagesModel = {
                push: sandBox.stub(),
            };

            sandBox.stub(dao, 'model').get(() => mockMessagesModel);

            await dao.create(expectedResult);
        });

        after(() => {
            sandBox.restore();
        });

        it('Should called once', () => {
            sinon.assert.calledOnce(mockMessagesModel.push);
        });
    });

    describe('readBySenderAndReceiver', () => {
        let dao;
        let sandBox;
        let mockSender;
        let messages;
        let mockReceiver;
        let mockMessagesModel;
        let expectedResult;

        before(async () => {
            dao = new MessagesDaoMockDB();
            expectedResult = {
                date: '1',
                message: 'message',
                sender: '1',
                receiver: '2',
            };
            mockSender = '1';
            mockReceiver = '2';
            sandBox = sinon.createSandbox();
            mockMessagesModel = {
                filter: sandBox.stub(),
            };
            sandBox.stub(util, 'dynamicSort').returns(expectedResult);
            sandBox.stub(messages, 'sort');
            sandBox.stub(dao, 'model').get(() => mockMessagesModel);

            await dao.readBySenderAndReceiver(mockSender, mockReceiver);
        });

        after(() => {
            sandBox.restore();
        });
        //
        // it('Should called once', () => {
        //     sinon.assert.calledOnce(mockMessagesModel.filter);
        // });
    });
});