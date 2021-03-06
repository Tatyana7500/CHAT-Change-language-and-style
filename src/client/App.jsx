import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WithAuthorizationWrapper from '../client/hocs/withAuthorization';
import withLocalization from '../client/hocs/withLocalization';
import SignIn from './components/signIn/SignIn.jsx';
import Login from './components/login/Login.jsx';
import Main from './components/main/Main.jsx';
import logic from './components/main/logic';
import React, { Component } from 'react';
import constants from '../constants';
import PropTypes from 'prop-types';
import resources from './locale';
import './theme/matrix.css';

class App extends Component {
    static propTypes = {
        setLanguage: PropTypes.func.isRequired,
        translate: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        const { privateChat, theme, lang, emoji } = this.getSavedSettings();
        props.setLanguage(lang);
        this.applyTheme(theme);

        this.state = {
            privateChat,
            emoji,
            theme,
            lang,
        };
    }

    changeLanguage = lang => {
        const { setLanguage } = this.props;

        const settings = {
            lang: lang,
            emoji: this.state.emoji,
            theme: this.state.theme,
            privateChat: this.state.privateChat,
        };

        this.setState(state => ({
            ...state,
            lang: lang,
        }));

        setLanguage(lang);
        this.applyRlt(lang);
        this.saveSettings(settings);
    };

    changeActiveEmoji = () => {
        const emoji = !this.state.emoji;
        const settings = {
            emoji: emoji,
            lang: this.state.lang,
            theme: this.state.theme,
            privateChat: this.state.privateChat,
        };

        this.setState(state => ({
            ...state,
            emoji: emoji,
        }));

        this.saveSettings(settings);
    };

    changeActivePrivateChat = () => {
        const privateChat = !this.state.privateChat;
        const settings = {
            lang: this.state.lang,
            emoji: this.state.emoji,
            theme: this.state.theme,
            privateChat: privateChat,
        };

        this.setState(state => ({
            ...state,
            privateChat: privateChat,
        }));

        this.saveSettings(settings);
    };

    applyRlt = (lang) => {
        if (lang === 'AE') {
            document.body.setAttribute('style', 'direction:rtl');
        } else {
            document.body.setAttribute('style', 'direction:ltr');
        }
    };

    getSavedSettings = () => {
        const item = localStorage.getItem(constants.SETTINGS);

        if (!item) {
            return {
                emoji: true,
                privateChat: true,
                lang: constants.US,
                theme: constants.LIGHT,
            };
        }

        return JSON.parse(item);
    };

    applyTheme = theme => {
        document.body.setAttribute('data-theme', theme);
    };

    saveSettings = (settings) => {
        localStorage.setItem(constants.SETTINGS, JSON.stringify(settings));
    };

    changeTheme = () => {
        const theme = this.state.theme === constants.LIGHT ? constants.DARK : constants.LIGHT;
        const settings = {
            theme: theme,
            lang: this.state.lang,
            emoji: this.state.emoji,
            privateChat: this.state.privateChat,
        };

        this.setState(state => ({
            ...state,
            theme: theme,
        }));

        this.saveSettings(settings);
        this.applyTheme(theme);
    };

    setDefaultSettings = () => {
        const settings = {
            emoji: true,
            privateChat: true,
            lang: constants.US,
            theme: constants.LIGHT,
        };

        this.setState(state => ({
            ...state,
            emoji: true,
            privateChat: true,
            lang: constants.US,
            theme: constants.LIGHT,
        }));

        this.applyRlt(settings.lang);
        this.applyTheme(settings.theme);
        this.props.setLanguage(settings.lang);

        this.saveSettings(settings);
    };

    isAuthorization = () => {
        const userValidate = JSON.parse(window.localStorage.getItem('chat'));

        return userValidate !== null;
    };

    render() {
        const changeActivePrivateChat = this.changeActivePrivateChat;
        const defaultCountry = this.state.lang.toUpperCase();
        const setDefaultSettings = this.setDefaultSettings;
        const { theme, emoji, privateChat } = this.state;
        const changeActiveEmoji = this.changeActiveEmoji;
        const changeLanguage = this.changeLanguage;
        const saveSettings = this.saveSettings;
        const changeTheme = this.changeTheme;
        const { translate } = this.props;

        const isAuthorized = this.isAuthorization();
        const redirect = () => {
            window.location.href = '/login';
        };
        const logout = () => {
            logic.removeLocalStorage();
        };

        const componentProps = {
            emoji,
            theme,
            translate,
            changeTheme,
            privateChat,
            saveSettings,
            changeLanguage,
            defaultCountry,
            changeActiveEmoji,
            setDefaultSettings,
            changeActivePrivateChat,
        };

        return (
            <Router>
                <Switch>
                    <Route exact path='/main' render={props => (
                        <WithAuthorizationWrapper
                            logout={logout}
                            component={Main}
                            redirect={redirect}
                            isAuthorized={isAuthorized}
                            componentProps = {componentProps}
                        />
                        )}
                    />
                    <Route exact path='/login' render={props =>
                        <Login {...props}
                               translate={translate}
                               changeLanguage={changeLanguage}
                               defaultCountry={defaultCountry}
                        />}
                    />
                    <Route exact path='/signIn' render={props =>
                        <SignIn {...props}
                                translate = {translate}
                                changeLanguage={changeLanguage}
                                defaultCountry={defaultCountry}
                        />}
                    />
                </Switch>
            </Router>
        );
    }
}

export default withLocalization(App, resources);