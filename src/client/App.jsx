import React, { Component } from 'react';
import './App.css';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

class AppSettings extends Component {
    state = {
        activeTheme: 'light',
    };

    lightThemeRef = React.createRef();
    darkThemeRef = React.createRef();

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
        return (
            <div className='settings'>
                <div className='settings__item'>
                    <ReactFlagsSelect
                        className = 'ReactFlagsSelect'
                        countries = {['GB', 'DE', 'AR', 'UA']}
                        customLabels = {{ 'GB': 'EN', 'DE': 'DE', 'AR': 'AR', 'UA': 'UA' }}
                        defaultCountry = 'GB'
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