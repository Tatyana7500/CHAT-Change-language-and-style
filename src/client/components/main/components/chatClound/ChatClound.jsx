import PropTypes from 'prop-types';
import React from 'react';

const HatClound = props => {
    const { name, email, text, date, nameSender } = props;
    const float = name === nameSender ? 'massage messageSender' : 'massage messageReceiver';

    return (
            <div className={ float }>
                <p className='massage__name'>{name}</p>
                <p className='massage__email'>{email}</p>
                <span className='massage__text'>{text}</span>
                <p className='massage__time'>{date}</p>
            </div>
    );
};

HatClound.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    nameSender: PropTypes.string.isRequired,
};

export default HatClound;