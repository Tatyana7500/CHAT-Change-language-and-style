import PropTypes from 'prop-types';
import util from '../../../util';
import React from 'react';

const UsersList = props => {
    const { usersList, translate, clients } = props;

    return (
        <div className='content'>
            <div className='users__title'>
                <div className='users__info'>{translate('name')}</div>
                <div className='users__info'>{translate('eMail')}</div>
            </div>
            {   
                usersList.map((item) => {
                    return ( 
                        <div 
                            key={item._id}
                            className={`users__card ${util.drawOnline(item._id, clients )}` } >
                            <p className='users__info' id={item._id}>{item.name}</p>
                            <p className='users__info' id={item._id}>{item.email}</p>
                        </div>
                    );
                })
            }
        </div>
    );
};

UsersList.propTypes = {
    clients: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired,
    usersList: PropTypes.array.isRequired,
};

export default UsersList;