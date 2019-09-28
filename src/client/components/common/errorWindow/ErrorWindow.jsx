import './ErrorWindow.css';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const ErrorWindow = (props) => {
    const {
        error,
        handleHide,
    } = props;

    return (
        <Fragment>
            <button className='settings close' onClick={handleHide}>
                <img src='src/client/assets/icons/close.png' width='20' height='20' />
            </button>
            <div className='error'>
                <h3>{error}</h3>
            </div>
        </Fragment>
    );
};

ErrorWindow.protoTypes = {
    error: PropTypes.string.isRequired,
    handleHide: PropTypes.func.isRequired,
};

export default ErrorWindow;