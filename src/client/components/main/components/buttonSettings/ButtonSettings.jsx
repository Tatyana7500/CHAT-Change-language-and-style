import PropTypes from 'prop-types';
import './ButtonSettings.css';
import React from 'react';

const ButtonSettings = (props) => {
    const { handleShow } = props;

    return (
        <button className='settings' onClick={handleShow}>
            <img src='src/client/assets/icons/settings.png' width='50' height='50'/>
        </button>
    );
};

ButtonSettings.propTypes = {
    handleShow: PropTypes.func.isRequired,
};

export default ButtonSettings;