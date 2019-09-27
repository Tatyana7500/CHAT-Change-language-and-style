import PropTypes from 'prop-types';
import './MainHeader.css';
import React from 'react';

const MainHeader = (props) => {
    const { name, email, translate, clickButtonLogOut } = props;
    
    return (
        <div className='header'>
            <div className='wrapper header__wrapper'>
                <div className='info'>
                    <div>
                        <span>{translate('name')}:</span>
                        <span className='info__name'>{name}</span>
                    </div>
                    <div>
                        <span>{translate('eMail')}:</span>
                        <span className='info__email'>{email}</span>
                    </div>
                </div>
                <a href='/login' onClick={clickButtonLogOut} className='btn_logout btn-main logout' id='logOut'>{translate('logOut')}</a>
            </div>
        </div>
    );
};

MainHeader.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
    clickButtonLogOut: PropTypes.func.isRequired,
};

export default MainHeader;