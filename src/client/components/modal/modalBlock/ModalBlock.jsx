import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SettingTheme from '../../common/themeDropdown/ThemeDropdown';
import SettingLanguage from '../../common/languageDropdown/LanguageDropdown';

const ModalBlock = (props) => {
    const { translate, defaultCountry, changeTheme, changeLanguage, theme, handleHide } = props;

    return (
        <Fragment>
            <div className='model-wrapper'>
            </div>
            <div className='model'>
                <button className='settings close' onClick={handleHide}>
                    <img src='src/client/assets/icons/close.png' width='20' height='20' />
                </button>
                <div className='model__settings'>
                    <div className='model__settings-theme'>
                        <p>{translate('theme')}</p>
                        <SettingTheme
                            theme={theme}
                            changeTheme={changeTheme}
                        />
                    </div>
                    <div className='model__settings-language'>
                        <p>{translate('language')}</p>
                        <SettingLanguage
                            defaultCountry={defaultCountry}
                            changeLanguage={changeLanguage}
                        />
                    </div>
                </div>
                <div className='model__settings'>
                    <div className='model__settings-emoji'>
                        <p>{translate('emoji')}</p>
                    </div>
                    <div className='model__settings-private'>
                        <p>{translate('chat')}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ModalBlock.propTypes = {
    theme: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    handleHide: PropTypes.func.isRequired,
    changeTheme: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    defaultCountry: PropTypes.string.isRequired,
};

export default ModalBlock;