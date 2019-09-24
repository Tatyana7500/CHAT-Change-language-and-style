const UsersDaoMongoDB = require('../usersDaoMongoDB');

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

});