import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const MainHeader = (props) => {
    const { name, email, t } = props;
    
    return (
        <div className='header'>
            <div className='wrapper header__wrapper'>
                <div className='info'>
                    <div>
                        <span>{t('name')}:</span>
                        <span className='info__name'>{name}</span>
                    </div>
                    <div>
                        <span>{t('eMail')}:</span>
                        <span className='info__email'>{email}</span>
                    </div>
                </div>
                <a href='/login' className='btn btn-main logout' id='logOut'>{t('logOut')}</a>
            </div>
        </div>
    );
};

MainHeader.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(MainHeader);