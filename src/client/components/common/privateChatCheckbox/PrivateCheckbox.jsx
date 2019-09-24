import './styles/privateCheckbox.css';
import PropTypes from 'prop-types';
import React from 'react';

const SettingPrivateChat = (props) => {
    const { changeActivePrivateChat, privateChat } = props;
    const isChecked = privateChat === true ? true : false;

    return (
        <input className='radio-privateChat' type='checkbox' onChange={changeActivePrivateChat} checked={isChecked}/>
    );
};

SettingPrivateChat.propTypes = {
    changeActivePrivateChat: PropTypes.func.isRequired,
    privateChat: PropTypes.bool.isRequired,
};

export default SettingPrivateChat;