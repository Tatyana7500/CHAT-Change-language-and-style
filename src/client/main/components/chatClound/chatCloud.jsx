import React from 'react';
import PropTypes from 'prop-types';

const ChatCloud = props => {
    const { name, email, text, date } = props;

    return (
            <div className='massage'>
                <p className='massage__name'>{name}</p>
                <p className='massage__email'>{email}</p>
                <span className='massage__text'>{text}</span>
                <p className='massage__time'>{date}</p>
            </div>
    );
};

ChatCloud.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default ChatCloud;