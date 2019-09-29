import React from 'react';
import SignIn from '../SignIn.jsx';
import util from '../../../utils/requestHelper';

const mockProps = {
    translate: () => { },
    defaultCountry: 'US',
    changeLanguage: () => { },
};

describe("SignIn snapshot", () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <SignIn {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});

describe('test submitSignInForm()', () => {
    let sandbox;
    let component;
    let mockUrl;
    let mockState;
    let mockLocation;
    let mockResponce;
    before(async () => {

        component = shallow(
            <SignIn {...mockProps} />
        );
        sandbox = sinon.sandbox.create();
        component.instance().nameInputRef = {
            current: {
                value: '',
            },
        };

        component.instance().emailInputRef = {
            current: {
                value: '',
            },
        };

        component.instance().passwordInputRef = {
            current: {
                value: '',
            },
        };

        component.instance().confirmPasswordInputRef = {
            current: {
                value: '',
            },
        };
        mockUrl = 'http://localhost:8080/signin';
        mockState = {
            name: '',
            email: '',
            password: '',
        };
        mockResponce = {
            status: 200,
        };
        mockLocation = {
            href: '',
        };

        sandbox.stub(component.instance(), 'setState');
        sandbox.stub(util, 'sendPost').returns(mockResponce);
        sandbox.stub(window, 'location').get(() => mockLocation);

        await component.instance().submitSignInForm();
    });

    after(() => {
        sandbox.restore();
    });

    it('should called once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });

    it('should called once sendPost', () => {
        sinon.assert.calledOnce(util.sendPost);
    });

    it('should window.location.href = /main', () => {
        assert.strictEqual(mockLocation.href, '/login');
    });

    it('should called once sendPost with arguments http://localhost:8080/signin and state', () => {
        sinon.assert.calledWith(util.sendPost, mockUrl, mockState);
    });
});

describe('test submitSignInForm() status !200', () => {
    let sandbox;
    let component;
    let mockUrl;
    let mockState;
    let mockLocation;
    let mockResponce;
    before(async () => {

        component = shallow(
            <SignIn {...mockProps} />
        );
        sandbox = sinon.sandbox.create();
        component.instance().nameInputRef = {
            current: {
                value: '',
            },
        };

        component.instance().emailInputRef = {
            current: {
                value: '',
            },
        };

        component.instance().passwordInputRef = {
            current: {
                value: '',
            },
        };

        component.instance().confirmPasswordInputRef = {
            current: {
                value: '',
            },
        };
        mockUrl = 'http://localhost:8080/signin';
        mockState = {
            name: '',
            email: '',
            password: '',
        };
        mockResponce = {
            status: 100,
            text: sandbox.stub(),
        };
        mockLocation = {
            href: '',
        };
        sandbox.stub(component.instance(), 'setState');
        sandbox.stub(util, 'sendPost').returns(mockResponce);
        sandbox.stub(window, 'location').get(() => mockLocation);
        await component.instance().submitSignInForm();
    });

    after(() => {
        sandbox.reset();
    });

    it('should called once setState', () => {
        sinon.assert.calledTwice(component.instance().setState);
    });

    it('should called once sendPost', () => {
        sinon.assert.calledOnce(util.sendPost);
    });

    it('should window.location.href = /main', () => {
        assert.strictEqual(mockLocation.href, '');
    });

    it('should called once sendPost with arguments http://localhost:8080/signin and state', () => {
        sinon.assert.calledWith(util.sendPost, mockUrl, mockState);
    });
});

describe('test submitSignInForm() password !== confirmPassword', () => {
    let sandbox;
    let component;
    let mockUrl;
    let mockState;
    let mockLocation;
    let mockResponce;
    before(async () => {

        component = shallow(
            <SignIn {...mockProps} />
        );
        sandbox = sinon.sandbox.create();
        component.instance().nameInputRef = {
            current: {
                value: '',
            },
        };

        component.instance().emailInputRef = {
            current: {
                value: '',
            },
        };

        component.instance().passwordInputRef = {
            current: {
                value: '',
            },
        };

        component.instance().confirmPasswordInputRef = {
            current: {
                value: 'test',
            },
        };
        mockUrl = 'http://localhost:8080/signin';
        mockState = {
            name: '',
            email: '',
            password: '',
        };
        mockResponce = {
            status: 100,
            text: sandbox.stub(),
        };
        mockLocation = {
            href: '',
        };
        sandbox.stub(component.instance(), 'setState');

        await component.instance().submitSignInForm();
    });

    after(() => {
        sandbox.reset();
    });

    it('should called once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });
});