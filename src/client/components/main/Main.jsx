import SettingLanguage from '../common/languageDropdown/LanguageDropdown.jsx';
import SettingTheme from '../common/themeDropdown/ThemeDropdown.jsx';
import ContentBlock from './components/contentBlock/ContentBlock.jsx';
import MainHeader from './components/mainHeader/MainHeader.jsx';
import util from '../../utils/requestHelper';
import constants from '../../../constants';
import openSocket from 'socket.io-client';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logic from './logic';

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
            emojisMenu: false,
            messagesList: [],
            usersList: [],
            clients: [],
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
    }

    static propTypes = {
        translate: PropTypes.func.isRequired,
    };

    addEmoji = (e) => {
        const { native: emoji } = e;
        this.setState({
            messageAreaValue: `${this.state.messageAreaValue} ${emoji}`,
        });
    };

    showEmojis = () => {
        this.setState({
                emojisMenu: true,
            },
            () => document.addEventListener('click', this.closeMenu)
        );
    };

    closeMenu = () => {
        this.setState({
                emojisMenu: false,
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
        const data = await util.sendGetRequest(`${constants.LOCALHOST}/messages?chat=${this.state.chat}&sender=${this.state.idUserSender}&receiver=${this.state.idUserReceiver}`);
        await this.setState({
            mainWindowState: constants.MESSAGE,
        });
        await this.setState({
            messagesList: data,
        });
    };

    updateMessageValue = (e) => {
        this.setState({ messageAreaValue: e.target.value });
    };

    clickButtonLogOut = async () => {
        logic.removeLocalStorage();
    };

    clickButtonSend = async () => {
        await this.setState({
            messageBody: {
                sender: this.state.idUserSender,
                receiver: constants.ALL,
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

        await this.socket.on(constants.MESSAGE, (message) => {
            if (message.name !== this.state.name) {
                this.setState({
                    messagesList: [...this.state.messagesList, message],
                });
            }
        });
        this.socket.emit(constants.ONLINE, this.state.idUserSender);

        this.socket.on(constants.ONLINE, (res) => {
            this.setState({
                clients: res,
            });
        });
    }

    render() {
        const { translate, defaultCountry, changeTheme, changeLanguage, theme } = this.props;

        return (
            <div>
                <div className='header__settings'>
                    <SettingTheme
                        theme={theme}
                        changeTheme={changeTheme}
                    />
                    <SettingLanguage
                        defaultCountry={defaultCountry}
                        changeLanguage={changeLanguage}
                    />
                </div>
                <div className='main'>
                    <MainHeader
                        name={this.state.name}
                        translate = {translate}
                        email={this.state.email}
                        clickButtonLogOut={this.clickButtonLogOut}
                    />
                    <ContentBlock
                        name={this.state.name}
                        translate = {translate}
                        addEmoji={this.addEmoji}
                        closeMenu={this.closeMenu}
                        chat={this.state.clickChat}
                        showEmojis={this.showEmojis}
                        clients={this.state.clients}
                        userState={this.state.userState}
                        clickChat={this.clickButtonChat}
                        usersList={this.state.usersList}
                        clickUsers={this.clickButtonUser}
                        emojisMenu={this.state.emojisMenu}
                        messages={this.state.messagesList}
                        clickButtonSend={this.clickButtonSend}
                        windowState={this.state.mainWindowState}
                        updateMessageValue={this.updateMessageValue}
                        messageAreaValue={this.state.messageAreaValue}
                    />
                </div>
            </div>
        );
    }
}

export default Main;