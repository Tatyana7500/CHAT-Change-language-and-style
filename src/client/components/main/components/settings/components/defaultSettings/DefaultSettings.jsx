import './defaultSettings.css';
import PropTypes from 'prop-types';
import React from 'react';

const SettingDefault = (props) => {
    const { setDefaultSettings, translate } = props;

    return (
        <button className='button' onClick={setDefaultSettings}>{translate('yes')}</button>
    );
};

SettingDefault.propTypes = {
    setDefaultSettings: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
};

export default SettingDefault;