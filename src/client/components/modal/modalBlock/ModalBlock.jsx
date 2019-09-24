import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SettingTheme from '../../common/themeDropdown/ThemeDropdown';
import SettingLanguage from '../../common/languageDropdown/LanguageDropdown';
import ModalWrapper from '../modalWrapper/ModalWrapper.jsx';

const ModalBlock = (props) => {
    const { translate, defaultCountry, changeTheme, changeLanguage, theme, handleHide } = props;

    return (
        <Fragment>
            <ModalWrapper/>
            <div className='model'>
                <button className='settings close' onClick={handleHide}>
                    <img src='src/client/assets/icons/close.png' width='20' height='20' />
                </button>
                <div className='model__settings_1'>
                    <SettingTheme
                        theme={theme}
                        changeTheme={changeTheme}
                    />
                    <SettingLanguage
                        defaultCountry={defaultCountry}
                        changeLanguage={changeLanguage}
                    />
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