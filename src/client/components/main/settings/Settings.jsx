import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Settings.css';
import SettingTheme from '../../common/themeDropdown/ThemeDropdown';
import SettingLanguage from '../../common/languageDropdown/LanguageDropdown';
import SettingEmoji from '../../common/emojiCheckbox/EmojisCheckbox';
import SettingPrivateChat from '../../common/privateChatCheckbox/PrivateCheckbox';
import SettingDefault from '../../common/defaultSettings/DefaultSettings';

const Settings = (props) => {
    const {
        translate,
        defaultCountry,
        changeTheme,
        changeLanguage,
        theme,
        handleHide,
        changeActiveEmoji,
        emoji,
        changeActivePrivateChat,
        privateChat,
        setDefaultSettings,
    } = props;

    return (
        <Fragment>
                <button className='settings close' onClick={handleHide}>
                    <img src='src/client/assets/icons/close.png' width='20' height='20' />
                </button>
                <div className='modal__settings'>
                    <div className='modal__settings-theme'>
                        <p>{translate('theme')}</p>
                        <SettingTheme
                            theme={theme}
                            changeTheme={changeTheme}
                        />
                    </div>
                    <div className='modal__settings-language'>
                        <p>{translate('language')}</p>
                        <SettingLanguage
                            defaultCountry={defaultCountry}
                            changeLanguage={changeLanguage}
                        />
                    </div>
                </div>
                <div className='modal__settings'>
                    <div className='modal__settings-emoji'>
                        <p>{translate('emoji')}</p>
                        <SettingEmoji
                            emoji={emoji}
                            changeActiveEmoji={changeActiveEmoji}
                        />
                    </div>
                    <div className='modal__settings-private'>
                        <p>{translate('chat')}</p>
                        <SettingPrivateChat
                            privateChat={privateChat}
                            changeActivePrivateChat={changeActivePrivateChat}
                        />
                    </div>
                </div>
                <div className='modal__settings'>
                    <p>{translate('default')}</p>
                    <SettingDefault
                        translate={translate}
                        setDefaultSettings={setDefaultSettings}
                    />
                </div>
        </Fragment>
    );
};

Settings.propTypes = {
    theme: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    handleHide: PropTypes.func.isRequired,
    changeActiveEmoji: PropTypes.func.isRequired,
    changeActivePrivateChat: PropTypes.func.isRequired,
    emoji: PropTypes.bool.isRequired,
    privateChat: PropTypes.bool.isRequired,
    changeTheme: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    defaultCountry: PropTypes.string.isRequired,
    setDefaultSettings: PropTypes.func.isRequired,
};

export default Settings;