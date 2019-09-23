import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/signIn/SignIn.jsx';
import Login from './components/login/Login.jsx';
import { withTranslation } from 'react-i18next';
import Main from './components/main/Main.jsx';
import React, { Component } from 'react';
import constants from '../constants';
import i18n from './locale';
import './theme/matrix.css';

class App extends Component {
    constructor(props) {
        super(props);

        const { theme, lang } = this.getSavedSettings();
        i18n.changeLanguage(lang);
        this.applyTheme(theme);
        this.applyRlt(lang);

        this.state = {
            theme,
            lang,
        };
    }

    changeLanguage = lang => {
        const settings = { theme: this.state.theme, lang: lang };
        this.setState(state => ({
            ...state,
            lang: lang,
        }));

        i18n.changeLanguage(lang);
        this.applyRlt(lang);
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
            return { theme: constants.LIGHT, lang: constants.US };
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
        const settings = { theme: theme, lang: this.state.lang };
        this.setState(state => ({
            ...state,
            theme: theme,
        }));

        this.saveSettings(settings);
        this.applyTheme(theme);
    };

    render() {
        const defaultCountry = this.state.lang.toUpperCase();
        const changeLanguage = this.changeLanguage;
        const saveSettings = this.saveSettings;
        const changeTheme = this.changeTheme;
        const { theme } = this.state;
        const { t } = this.props;

        return (
            <Router>
                <Switch>
                    <Route exact path='/main' render={props => (
                        <Main {...props}
                              theme={theme}
                              translate = { t }
                              changeTheme={changeTheme}
                              saveSettings={saveSettings}
                              changeLanguage={changeLanguage}
                              defaultCountry={defaultCountry}
                        />)}
                    />
                    <Route exact path='/login' render={props => (
                        <Login {...props}
                               translate = { t }
                               changeLanguage={changeLanguage}
                               defaultCountry={defaultCountry}
                        />)}
                    />
                    <Route exact path='/signIn' render={props => (
                        <SignIn {...props}
                                translate = { t }
                                changeLanguage={changeLanguage}
                                defaultCountry={defaultCountry}
                        />)}
                    />
                </Switch>
            </Router>
        );
    }
}

export default withTranslation('common')(App);