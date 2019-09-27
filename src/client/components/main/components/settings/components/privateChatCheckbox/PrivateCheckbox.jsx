import './privateCheckbox.css';
import PropTypes from 'prop-types';
import React from 'react';

const SettingPrivateChat = (props) => {
    const { changeActivePrivateChat, privateChat } = props;
    const isChecked = privateChat === true;

    return (
        <input className='radio-privateChat' type='checkbox' onChange={changeActivePrivateChat} checked={isChecked}/>
    );
};

SettingPrivateChat.propTypes = {
    changeActivePrivateChat: PropTypes.func.isRequired,
    privateChat: PropTypes.bool.isRequired,
};

export default SettingPrivateChat;