import constants from '../../../../constants';
import PropTypes from 'prop-types';
import './ThemeDropdown.css';
import React from 'react';

const SettingTheme = (props) => {
    const { changeTheme, theme } = props;
       const isChecked = theme === constants.LIGHT;

    return (
        <input className='radio' type='checkbox' onChange={changeTheme} checked={isChecked}/>
    );
};

SettingTheme.propTypes = {
    theme: PropTypes.string.isRequired,
    changeTheme: PropTypes.func.isRequired,
};

export default SettingTheme;