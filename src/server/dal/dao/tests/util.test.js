const assert = require('assert');
const util = require('../util');

describe('Util', () => {
    describe('convertMessages', () => {
        let mockMessages;
        let mockObj;
        let actual;
        let expected;
        let result;
        before(() => {

            mockObj = {
                _id: 'id',
                message: 'message',
                sender: 'sender',
                receiver: 'receiver',
                date: 'date',
            };
            result = {
                _id: 'id',
                message: 'message',
                sender: 'sender',
                receiver: 'receiver',
                date: 'date',
            };
            mockMessages = [mockObj, mockObj, mockObj];
            expected = [result, result, result];
            actual = util.convertMessages(mockMessages);
        });

        it('should called once push', () => {
            assert.deepEqual(actual, expected);
        });
    });

    describe('convertUser', () => {
        let mockObj;
        let actual;
        let expected;
        let result;
        before(() => {

            mockObj = {
                _id: 2,
                name: 'name',
                email: 'email',
                password: 'password',

            };
            result = {
                _id: '2',
                name: 'name',
                email: 'email',
                password: 'password',
            };

            expected = result;
            actual = util.convertUser(mockObj);
        });

        it('should called once push', () => {
            assert.deepEqual(actual, expected);
        });
    });

    describe('convertUsers', () => {
        let mockObj;
        let actual;
        let list;
        let expected;
        let result;
        before(() => {

            mockObj = {
                _id: 2,
                name: 'name',
                email: 'email',
                password: 'password',

            };
            result = {
                _id: '2',
                name: 'name',
                email: 'email',
                password: 'password',
            };

            list = [mockObj, mockObj, mockObj];
            expected = [result, result, result];
            actual = util.convertUsers(list);
        });

        it('should actual equal expected', () => {
            assert.deepEqual(actual, expected);
        });
    });
});