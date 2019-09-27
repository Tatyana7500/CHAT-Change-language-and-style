import './EmojisCheckbox.css';
import PropTypes from 'prop-types';
import React from 'react';

const SettingEmoji = (props) => {
    const { changeActiveEmoji, emoji } = props;
    const isChecked = emoji === true;

    return (
        <input className='radio-emoji' type='checkbox' onChange={changeActiveEmoji} checked={isChecked}/>
    );
};

SettingEmoji.propTypes = {
    changeActiveEmoji: PropTypes.func.isRequired,
    emoji: PropTypes.bool.isRequired,
};

export default SettingEmoji;