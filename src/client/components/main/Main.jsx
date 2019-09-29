import ButtonSettings from './components/buttonSettings/ButtonSettings.jsx';
import ContentBlock from './components/contentBlock/ContentBlock.jsx';
import MainHeader from './components/mainHeader/MainHeader.jsx';
import Settings from './components/settings/Settings.jsx';
import Modal from '../../libs/modal/Modal.jsx';
import util from '../../utils/requestHelper';
import constants from '../../../constants';
import openSocket from 'socket.io-client';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logic from './logic';
import './Main.css';

class Main extends Component {
    constructor(props) {
        super(props);
        this.socket = openSocket(constants.LOCALHOST);
        this.state = {
            mainWindowState: constants.USERS,
            idUserReceiver: constants.ALL,
            userState: constants.OFFLINE,
            chat: constants.PUBLIC,
            messageAreaValue: '',
            idUserSender: null,
            emojiMenu: false,
            isOpenModal: false,
            messagesList: [],
            usersOnline: [],
            usersList: [],
            messageBody: {
                sender: '',
                receiver: '',
                message: '',
                date: '',
            },
            myMessage: {
                name: '',
                email: '',
                message: '',
                date: '',
            },
            email: '',
            name: '',
        };

        this.socket.on(constants.MESSAGE, (message) => {
             if (message.name !== this.state.name && this.state.chat === constants.PUBLIC) {
                this.setState({
                    messagesList: [...this.state.messagesList, message],
                });
             }
        });

        this.socket.on(constants.MESSAGEPRIVATE, (message) => {
            if (message.name !== this.state.name && this.state.chat === constants.PRIVATE && message.id === this.state.idUserReceiver) {
                this.setState({
                    messagesList: [...this.state.messagesList, message],
                });
            }
        });

        this.socket.emit(constants.ONLINE, JSON.parse(logic.getLocalStorage())._id);
        this.socket.on(constants.ONLINE, online => {
            this.setState(state => ({
                ...state,
                usersOnline: online,
            }));
        });
    }

    static propTypes = {
        emoji: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        theme: PropTypes.string.isRequired,
        translate: PropTypes.func.isRequired,
        privateChat: PropTypes.bool.isRequired,
        changeTheme: PropTypes.func.isRequired,
        changeLanguage: PropTypes.func.isRequired,
        defaultCountry: PropTypes.string.isRequired,
        changeActiveEmoji: PropTypes.func.isRequired,
        setDefaultSettings: PropTypes.func.isRequired,
        changeActivePrivateChat: PropTypes.func.isRequired,
    };

    handleShow = () => {
        this.setState({ isOpenModal: true });
    };

    handleHide = () => {
        this.setState({ isOpenModal: false });
    };

    addEmoji = (e) => {
        const { native: emoji } = e;
        this.setState({
            messageAreaValue: `${this.state.messageAreaValue} ${emoji}`,
        });
    };

    showEmoji = () => {
        this.setState({
                emojiMenu: true,
            },
            () => document.addEventListener('click', this.closeMenu)
        );
    };

    closeMenu = () => {
        this.setState({
                emojiMenu: false,
            },
            () => document.removeEventListener('click', this.closeMenu)
        );
    };

    clickButtonUser = async () => {
        const response = await util.sendGetRequest(`${constants.LOCALHOST}/users`);
        await this.setState({
            mainWindowState: constants.USERS,
        });
        await this.setState({
            usersList: response,
        });
    };

    clickButtonChat = async () => {
        await this.setState(state => ({
            ...state,
            idUserReceiver: constants.ALL,
            chat: constants.PUBLIC,
            mainWindowState: constants.MESSAGE,
        }));

        const data = await util.sendGetRequest(logic.generateUrl(this.state.chat, this.state.idUserSender, this.state.idUserReceiver));

        await this.setState({
            messagesList: data,
        });
    };

    updateMessageValue = (e) => {
        this.setState({ messageAreaValue: e.target.value });
    };

    clickButtonSend = async () => {
        await this.setState({
            messageBody: {
                sender: this.state.idUserSender,
                receiver: this.state.idUserReceiver,
                message: this.state.messageAreaValue,
                date: new Date().getTime(),
            },
            myMessage: {
                name: this.state.name,
                email: this.state.email,
                message: this.state.messageAreaValue,
                date: new Date().getTime(),
            },
        });

        await util.sendPostRequest(`${constants.LOCALHOST}/message`, this.state.messageBody);

        await this.setState({
            messageAreaValue: '',
            messagesList: [...this.state.messagesList, this.state.myMessage],
        });
    };

    getItemFromLocalStorage = () => {
        const userObj = logic.getLocalStorage();
        this.setState({
            name: JSON.parse(userObj).name,
            email: JSON.parse(userObj).email,
            idUserSender: JSON.parse(userObj)._id,
        });
    };

    async componentDidMount() {
        await this.getItemFromLocalStorage();
    }

    openPrivateChat = async (e) => {
        if (!this.props.privateChat) {
            return;
        }

        const target = e.target;

        await this.setState(state => ({
            ...state,
            idUserReceiver: target.id,
            chat: constants.PRIVATE,
        }));

        const data = await util.sendGetRequest(logic.generateUrl(this.state.chat, this.state.idUserSender, this.state.idUserReceiver));
        await this.setState({
            mainWindowState: constants.MESSAGE,
            messagesList: data,
        });
    };

    render() {
        const {
            emoji,
            theme,
            logout,
            translate,
            privateChat,
            changeTheme,
            changeLanguage,
            defaultCountry,
            changeActiveEmoji,
            setDefaultSettings,
            changeActivePrivateChat,
        } = this.props;

        const { isOpenModal } = this.state;

        return (
            <div>
                <div className='header__settings'>
                    <ButtonSettings
                        handleShow={this.handleShow}
                    />
                </div>
                <div className='main'>
                    <MainHeader
                        name={this.state.name}
                        translate={translate}
                        email={this.state.email}
                        clickButtonLogOut={logout}
                    />
                    <ContentBlock
                        name={this.state.name}
                        translate={translate}
                        emoji={this.props.emoji}
                        addEmoji={this.addEmoji}
                        closeMenu={this.closeMenu}
                        chat={this.state.clickChat}
                        showEmoji={this.showEmoji}
                        usersOnline={this.state.usersOnline}
                        userState={this.state.userState}
                        clickChat={this.clickButtonChat}
                        usersList={this.state.usersList}
                        clickUsers={this.clickButtonUser}
                        emojiMenu={this.state.emojiMenu}
                        messages={this.state.messagesList}
                        privateChat={this.props.privateChat}
                        openPrivateChat={this.openPrivateChat}
                        clickButtonSend={this.clickButtonSend}
                        windowState={this.state.mainWindowState}
                        updateMessageValue={this.updateMessageValue}
                        messageAreaValue={this.state.messageAreaValue}
                    />
                </div>
                {isOpenModal ?
                    <Modal>
                        <div className='modal'>
                            <Settings
                                emoji={emoji}
                                theme={theme}
                                translate={translate}
                                changeTheme={changeTheme}
                                privateChat={privateChat}
                                handleHide={this.handleHide}
                                defaultCountry={defaultCountry}
                                changeLanguage={changeLanguage}
                                emojiActive={this.state.emojiActive}
                                setDefaultSettings={setDefaultSettings}
                                changeActiveEmoji={changeActiveEmoji}
                                changeActivePrivateChat={changeActivePrivateChat}
                            />
                        </div>
                    </Modal> : null
                }
            </div>
        );
    }
}

export default Main;