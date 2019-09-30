import React from 'react';
import Main from '../Main.jsx';
import util from '../../../utils/requestHelper';
import logic from '../logic';

const mockProps = {
    emoji: true,
    logout: () => { },
    theme: 'light',
    translate: () => { },
    privateChat: true,
    changeTheme: () => { },
    changeLanguage: () => { },
    defaultCountry: 'US',
    changeActiveEmoji: () => { },
    setDefaultSettings: () => { },
    changeActivePrivateChat: () => { },
};
let mockSocket;
let mockId;
let mockJSON;

mockSocket = {
    on: () => { },
    emit: () => { },
};
mockId = {
    _id: 'id',
};

describe('Main snapshot', () => {
    let sandbox;
    let component;
    let mockSocket;
    before(() => {
        sandbox = sinon.createSandbox();
        mockSocket = {
            on: () => { },
        };
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });
    it('Main render corectly', () => {
        expect(component).matchSnapshot();
    });
});

describe('handleShow()', () => {
    let sandbox;
    let component;
    let mockSocket;
    before(() => {
        sandbox = sinon.createSandbox();
        mockSocket = {
            on: () => { },
        };
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );

        sandbox.stub(component.instance(), 'setState');

        component.instance().handleShow();
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });

    it('should called once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });
});

describe('handleHide()', () => {
    let sandbox;
    let component;
    let mockSocket;
    before(() => {
        sandbox = sinon.createSandbox();
        mockSocket = {
            on: () => { },
        };
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );
        sandbox.stub(component.instance(), 'setState');
        component.instance().handleHide();
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });

    it('should called once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });
});

describe('clickButtonUser()', () => {
    let sandbox;
    let component;
    let mockUrl;
    let mockSocket;
    before(() => {
        sandbox = sinon.createSandbox();
        mockSocket = {
            on: () => { },
        };
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );
        mockUrl = 'http://localhost:8080/users';
        sandbox.stub(util, 'sendGet');

        sandbox.stub(component.instance(), 'setState');
        component.instance().clickButtonUser();
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });

    it('should called once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });

    it('should called once sendGet', () => {
        sinon.assert.calledOnce(util.sendGet);
    });

    it('should called once sendGet', () => {
        sinon.assert.calledWith(util.sendGet, mockUrl);
    });
});

describe('clickButtonChat()', () => {
    let sandbox;
    let component;
    let mockState;
    let mockResult;
    let mockSocket;
    before(() => {
        sandbox = sinon.createSandbox();
        mockSocket = {
            on: () => { },
        };
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );

        mockState = {
            chat: 'PUBLIC',
            idUserSender: null,
            idUserReceiver: 'ALL',
        };
        mockResult = `http://localhost:8080/messages?chat=${mockState.chat}&sender=${mockState.idUserSender}&receiver=${mockState.idUserReceiver}`;

        sandbox.stub(util, 'sendGet');
        sandbox.stub(logic, 'generateUrl').returns(mockResult);
        sandbox.stub(component.instance(), 'setState');
        component.instance().clickButtonChat();
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });

    it('should called once setState', () => {
        sinon.assert.calledTwice(component.instance().setState);
    });

    it('should called once sendGet', () => {
        sinon.assert.calledOnce(util.sendGet);
    });

    it('should called once generateUrl with arg', () => {
        sinon.assert.calledWith(logic.generateUrl, mockState.chat, mockState.idUserSender, mockState.idUserReceiver);
    });

    it('should called once sendGet with arg', () => {
        sinon.assert.calledWith(util.sendGet, mockResult);
    });
});

describe('showEmoji()', () => {
    let sandbox;
    let component;
    let event;
    let mockSocket;
    before(() => {
        sandbox = sinon.createSandbox();
        mockSocket = {
            on: () => { },
        };
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );

        event = 'click';
        sandbox.stub(component.instance(), 'setState');
        sandbox.stub(document, 'addEventListener');
        component.instance().showEmoji();
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });

    it('should called once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });

    it('should called once addEventListener', () => {
        sinon.assert.calledOnce(document.addEventListener);
    });

    it('should called once addEventListener', () => {
        sinon.assert.calledWith(document.addEventListener, event, component.instance().closeMenu);
    });
});

describe('closeMenu()', () => {
    let sandbox;
    let component;
    let event;
    let mockSocket;
    before(() => {
        sandbox = sinon.createSandbox();
        mockSocket = {
            on: () => { },
        };
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );

        event = 'click';
        sandbox.stub(component.instance(), 'setState');
        sandbox.stub(document, 'removeEventListener');
        component.instance().closeMenu();
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });

    it('should called once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });

    it('should called once addEventListener', () => {
        sinon.assert.calledOnce(document.removeEventListener);
    });

    it('should called once addEventListener', () => {
        sinon.assert.calledWith(document.removeEventListener, event, component.instance().closeMenu);
    });
});

describe('updateMessageValue()', () => {
    let sandbox;
    let component;
    let mockEvent;
    let mockSocket;
    before(() => {
        sandbox = sinon.createSandbox();
        mockSocket = {
            on: () => { },
        };
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );
        mockEvent = {
            target: {
                value: 'test',
            },
        };
        sandbox.stub(component.instance(), 'setState');
        component.instance().updateMessageValue(mockEvent);
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });

    it('should called once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });
});

describe('clickButtonSend', () => {
    let component;
    let sandbox;
    let mockUrl;
    let mockSocket;
    before(() => {
        sandbox = sinon.createSandbox();
        mockSocket = {
            on: () => { },
        };
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );
        component.state();
        mockUrl = 'http://localhost:8080/message';
        sandbox.stub(component.instance(), 'setState');
        sandbox.stub(util, 'sendPost');
        component.instance().clickButtonSend();
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });

    it('should called twice setState', () => {
        sinon.assert.calledTwice(component.instance().setState);
    });

    it('should called once sendPost', () => {
        sinon.assert.calledOnce(util.sendPost);
    });

    it('should called once sendPost with arg http://localhost:8080/messag and messageBody', () => {
        sinon.assert.calledWith(util.sendPost, mockUrl, component.state().messageBody);
    });
});

describe('getItemFromLocalStorage()', () => {
    let component;
    let sandbox;
    let mockObj;
    let parseObj;
    let JSONstub;
    before(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Main, 'createSocket').returns(mockSocket);

        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );
        mockObj = {
            'name': 'test',
            'email': 'test',
            '_id': 'test',
        };
        parseObj = {
            name: 'test',
            email: 'test',
            _id: 'test',
        };

        component.state();
        sandbox.stub(component.instance(), 'setState');
        sandbox.stub(logic, 'getLocalStorage').returns(mockObj);
        sandbox.stub(JSON, 'parse').returns(parseObj);
        component.instance().getItemFromLocalStorage();
    });

    after(() => {
        sandbox.reset();
        sandbox.restore();
    });

    it('should called Once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });

    it('should called Once getLocalStorage', () => {
        sinon.assert.calledOnce(logic.getLocalStorage);
    });

    it('should called Once JSON.parse', () => {
        sinon.assert.calledThrice(JSON.parse);
    });
});

describe('OpenPrivatChat()', () => {
    let component;
    let sandbox;
    let mockEvent;
    let mockState;
    let mockResult;

    before(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(JSON, 'parse').returns(mockId);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );
        mockEvent = {
            target: {
                id: 'id',
            },
        };
        mockState = {
            chat: 'PUBLIC',
            idUserSender: null,
            idUserReceiver: 'ALL',
        };
        mockResult = `http://localhost:8080/messages?chat=${mockState.chat}&sender=${mockState.idUserSender}&receiver=${mockState.idUserReceiver}`;
        component.state();
        sandbox.stub(util, 'sendGet');
        sandbox.stub(component.instance(), 'setState');
        sandbox.stub(logic, 'generateUrl').returns(mockResult);
        component.instance().openPrivateChat(mockEvent);
    });

    after(() => {
        sandbox.reset();
        sandbox.restore();
    });
    it('should called Once setState', () => {
        sinon.assert.calledThrice(component.instance().setState);
    });

    it('should called once sendGet', () => {
        sinon.assert.calledOnce(util.sendGet);
    });

    it('should called once generateUrl with arg', () => {
        sinon.assert.calledWith(logic.generateUrl, mockState.chat, mockState.idUserSender, mockState.idUserReceiver);
    });

    it('should called once sendGet with arg', () => {
        sinon.assert.calledWith(util.sendGet, mockResult);
    });
});

describe('addEmoji()', () => {
    let component;
    let sandbox;
    let mockEvent;

    before(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(JSON, 'parse').returns(mockId);
        sandbox.stub(Main.prototype, 'componentDidMount');
        component = shallow(
            <Main {...mockProps} />
        );

        mockEvent = {
            native: 'smile',
        };

        sandbox.stub(component.instance(), 'setState');
        component.instance().addEmoji(mockEvent);
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });
    it('should called Once setState', () => {
        sinon.assert.calledOnce(component.instance().setState);
    });
});

describe('Soket', () => {
    let main;
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(JSON, 'parse').returns(mockId);
        sandbox.stub(Main.prototype, 'componentDidMount');
        main = new Main();
    });

    after(() => {
        sandbox.reset();
        sandbox.restore();

    });

    it('should create socket', () => {
        sinon.assert.calledOnce(Main.createSocket);
    });
});

describe('ComponentDidMount', () => {
    let component;
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Main, 'createSocket').returns(mockSocket);
        sandbox.stub(JSON, 'parse').returns(mockId);
        component = new Main();
        sandbox.stub(component, 'getItemFromLocalStorage');
        component.componentDidMount();
    });

    after(() => {
        sandbox.restore();
        sandbox.reset();
    });

    it('should called once getItemFromLocalStorage', () => {
        sinon.assert.calledOnce(component.getItemFromLocalStorage);
    });
});