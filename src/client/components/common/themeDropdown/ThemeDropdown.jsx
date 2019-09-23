import constants from '../../../../constants';
import PropTypes from 'prop-types';
import React from 'react';

const SettingTheme = (props) => {
    const { changeTheme, theme } = props;
       const isChecked = theme === constants.LIGHT ? false : true;

    return (
        <input className='radio' type='checkbox' onChange={changeTheme} checked={isChecked}/>
    );
};

SettingTheme.propTypes = {
    changeTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
};

export default SettingTheme;