import React, { Component } from 'react';
import MainHeader from './components/mainHeader/mainHeader';
import ContentWindow from './components/contentWindow/contentWindow';
import constants from '../../server/constants';
import util from '../util';
import openSocket from 'socket.io-client';

class Main extends Component {
    constructor(props) {
        super(props);
        this.socket = openSocket(constants.LOCALHOST);
        this.state = {
            name: '',
            email: '',
            mainWindowState: constants.USERS,
            usersList: [],
            messagesList: [],
            idUserSender: null,
            idUserReceiver: constants.ALL,
            chat: constants.PUBLIC,
            messageAreaValue: '',
            emojisMenu: false,
            userState: constants.OFFLINE,
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
        };
    }

    addEmoji = (e) => {
        const emoji = e.native;
        this.setState({
            messageAreaValue: this.state.messageAreaValue + emoji,
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
        const userObj = localStorage.getItem('chat');
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

            this.socket.on(constants.ONLINE, (resp) => {
                resp.map((item)=>{

                });
            });
       
       
    }

    render() {
        return (
            <div className='main'>
                <MainHeader
                    name={this.state.name}
                    email={this.state.email}
                />
                <ContentWindow
                    chat={this.state.clickChat}
                    usersList={this.state.usersList}
                    userState={this.state.userState}
                    windowState={this.state.mainWindowState}
                    messages={this.state.messagesList}
                    addEmoji={this.addEmoji}
                    clickChat={this.clickButtonChat}
                    closeMenu={this.closeMenu}
                    showEmojis={this.showEmojis}
                    emojisMenu={this.state.emojisMenu}
                    clickUsers={this.clickButtonUser}
                    clickButtonSend={this.clickButtonSend}
                    messageAreaValue={this.state.messageAreaValue}
                    updateMessageValue={this.updateMessageValue}
                />
            </div>
        );
    }
}

export default Main;