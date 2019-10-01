import React from 'react';
import Main from '../Main.jsx';
import util from '../../../utils/requestHelper';
import logic from '../logic';
import sockets from '../../../utils/socketsHelper';

describe('Main', () => {
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
    let globalSandbox;
    let component;

    globalSandbox = sinon.createSandbox();
    globalSandbox.stub(Main, 'createSocket');
    globalSandbox.stub(sockets, 'subscribeSocket');
    globalSandbox.stub(Main.prototype, 'componentDidMount');
    component = shallow(
        <Main {...mockProps} />
    );

    describe('Main snapshot', () => {
        it('Main render corectly', () => {
            expect(component).matchSnapshot();
        });
    });
    describe('handleShow()', () => {
        let sandbox;

        before(() => {
            sandbox = sinon.createSandbox();
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

        before(() => {
            sandbox = sinon.createSandbox();
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
        let mockUrl;

        before(() => {
            sandbox = sinon.createSandbox();
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
        let mockState;
        let mockResult;

        before(() => {
            sandbox = sinon.createSandbox();
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
        let event;
        before(() => {
            sandbox = sinon.createSandbox();
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
        let event;

        before(() => {
            sandbox = sinon.createSandbox();
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
        let mockEvent;

        before(() => {
            sandbox = sinon.createSandbox();
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
        let sandbox;
        let mockUrl;

        before(() => {
            sandbox = sinon.createSandbox();
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
        let sandbox;
        let mockObj;
        let parseObj;

        before(() => {
            sandbox = sinon.createSandbox();
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
        let sandbox;
        let mockEvent;
        let mockState;
        let mockResult;

        before(() => {
            sandbox = sinon.createSandbox();
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
        let sandbox;
        let mockEvent;

        before(() => {
            sandbox = sinon.createSandbox();
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

    describe('subscribeSocket() calls', () => {
        let sandbox;

        before(() => {
            sandbox = sinon.createSandbox();
         });

        after(() => {
            sandbox.restore();
            sandbox.reset();
        });
        
        it('should called Once subscribeSocket', () => {
            sinon.assert.calledOnce(sockets.subscribeSocket);
        });
    });
});




