import React from 'react';
import PropTypes from 'prop-types';

const MainHeader = props => {
    const { name, email } = props;
    
    return (
        <div className='header'>
            <div className='wrapper header__wrapper'>
                <div className='info'>
                    <div>
                        <span>Name:</span>
                        <span className='info__name'>{name}</span>
                    </div>
                    <div>
                        <span>E-mail:</span>
                        <span className='info__email'>{email}</span>
                    </div>
                </div>
                <a href='/login' className='btn btn-main logout' id='logOut'>log out</a>
            </div>
        </div>
    );
};

MainHeader.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default MainHeader;

