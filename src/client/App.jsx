import React, { Component } from 'react';
import './App.css';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import i18n from './i18n';

class AppSettings extends Component {
    state = {
        activeTheme: 'light',
        lang: 'US',
    };

    lightThemeRef = React.createRef();
    darkThemeRef = React.createRef();

    changeLanguage = (lang) => {
        this.setState({ lang: lang });
        i18n.changeLanguage(lang);
    };

    componentDidUpdate() {
        const { activeTheme } = this.state;

        if (this.lightThemeRef.current && activeTheme === 'light') {
            this.lightThemeRef.current.classList.add('activeTheme');
        } else {
            this.lightThemeRef.current.classList.remove('activeTheme');
        }

        if (this.darkThemeRef.current && activeTheme === 'dark') {
            this.darkThemeRef.current.classList.add('activeTheme');
        } else {
            this.darkThemeRef.current.classList.remove('activeTheme');
        }
    }

    handleSettingTheme = activeTheme => {
        this.setState({
            activeTheme: activeTheme,
        });
    };

    render() {
        const defaultCountry = this.state.lang.toUpperCase();

        return (
                <div className='settings'>
                    <div className='settings__item'>
                        <ReactFlagsSelect
                            className = 'ReactFlagsSelect'
                            countries = {['US', 'DE', 'AR', 'UA']}
                            customLabels = {{ 'US': 'EN', 'DE': 'DE', 'AR': 'AR', 'UA': 'UA' }}
                            defaultCountry = {defaultCountry}
                            onSelect={this.changeLanguage}
                        />
                    </div>
                    <div className='settings__item'>
                        <button
                            id='light'
                            ref={this.lightThemeRef}
                            className='settings__item_button activeTheme'
                            onClick={() => this.handleSettingTheme('light')} />
                        <button
                            id='dark'
                            ref={this.darkThemeRef}
                            className='settings__item_button '
                            onClick={() => this.handleSettingTheme('dark')} />
                    </div>
                </div>
        );
    }
}

export default AppSettings;