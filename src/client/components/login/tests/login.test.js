import React from 'react';
import Login from '../Login.jsx';
import util from '../../../utils/requestHelper';
import logic from '../logic';

const mockProps = {
    translate: () => {},
    defaultCountry: 'US',
    changeLanguage: () => {},
};

describe('Login snapshot', () => {
    let component;
    before(() => {
        component = shallow(
            <Login {...mockProps} />
        );
    });

    it('should render correctly', () => {
        expect(component).matchSnapshot();
    });
});

describe('Login submitLoginForm() status 200', () => {

    let sandbox;
    let component;
    let mockResponse;
    let mockLocation;
    let mockUrl;
    let mockState;

    before (async () => {
        component = shallow(
            <Login {...mockProps} />
        );
        sandbox = sinon.createSandbox();
        mockResponse = {
            json: sandbox.stub(),
            text: sandbox.stub(),
            status: 200,
        };
        mockLocation = {
            href: '',
        };

        component.instance().emailInputRef = {
            current: {
                value: 'emailValue',
            },
        };
        component.instance().passwordInputRef = {
            current: {
                value: 'passwordValue',
            },
        };
        mockUrl = `http://localhost:8080/auth`;
        mockState = {
            emailInput: component.instance().emailInputRef.current.value,
            passwordInput: component.instance().passwordInputRef.current.value,
        };

        sandbox.stub(window, 'location').get(() => mockLocation);
        sandbox.stub(component.instance(), 'setState');
        sandbox.stub(util, 'sendPost').returns(mockResponse);
        sandbox.stub(logic, 'setToLocalStorage');
        await component.instance().submitLoginForm();
    });

    after(() => {
        sandbox.restore();
    });

    it('should called setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });

    it('should called sendPost', () => {
        sinon.assert.calledOnce(util.sendPost);
    });

    it('should called sendPost', () => {
        sinon.assert.calledWith(util.sendPost, mockUrl, mockState);
    });

    it('should called setToLocalStorage', () => {
        sinon.assert.calledOnce(logic.setToLocalStorage);
    });

    it('should run to location', () => {
        assert.strictEqual(mockLocation.href, '/main');
    });
});

describe('Login submitLoginForm() satus !200', () => {

    let sandbox;
    let component;
    let mockResponse;
    let mockLocation;
    let mockUrl;
    let mockState;

    before(async () => {
        component = shallow(
            <Login {...mockProps} />
        );
        sandbox = sinon.createSandbox();
        mockResponse = {
            json: sandbox.stub(),
            text: sandbox.stub(),
            status: 100,
        };
        mockLocation = {
            href: '',
        };

        component.instance().emailInputRef = {
            current: {
                value: 'emailValue',
            },
        };
        component.instance().passwordInputRef = {
            current: {
                value: 'passwordValue',
            },
        };
        mockUrl = `http://localhost:8080/auth`;
        mockState = {
            emailInput: component.instance().emailInputRef.current.value,
            passwordInput: component.instance().passwordInputRef.current.value,
        };

        sandbox.stub(window, 'location').get(() => mockLocation);
        sandbox.stub(component.instance(), 'setState');
        sandbox.stub(util, 'sendPost').returns(mockResponse);
        sandbox.stub(logic, 'setToLocalStorage');
        await component.instance().submitLoginForm();
    });

    after(() => {
        sandbox.restore();
    });

    it('should called setState', () => {
        sinon.assert.calledTwice(component.instance().setState);
    });

    it('should called sendPost', () => {
        sinon.assert.calledOnce(util.sendPost);
    });

    it('should called sendPost', () => {
        sinon.assert.calledWith(util.sendPost, mockUrl, mockState);
    });

    it('should run to location', () => {
        assert.strictEqual(mockLocation.href, '');
    });
});

describe('Login submitLoginForm() email and pass eql null', () => {

    let sandbox;
    let component;
    let mockLocation;

    before(async () => {
        component = shallow(
            <Login {...mockProps} />
        );
        sandbox = sinon.createSandbox();
        mockLocation = {
            href: '',
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

        sandbox.stub(window, 'location').get(() => mockLocation);
        sandbox.stub(component.instance(), 'setState');
        await component.instance().submitLoginForm();
    });

    after(() => {
        sandbox.restore();
    });

    it('should called setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });

    it('should run to location', () => {
        assert.strictEqual(mockLocation.href, '');
    });
});

describe('Send form', () => {
    let sandbox;
    let component;

    before(() => {

        component = shallow(
            <Login {...mockProps} />
        );

        sandbox = sinon.sandbox.create();
        sandbox.stub(component.instance(), 'submitLoginForm');
    });

    it('should call submitLoginForm', () => {
        component.find('#enterAccount').simulate('click');
        sinon.assert.calledOnce(component.instance().submitLoginForm);
    });
});