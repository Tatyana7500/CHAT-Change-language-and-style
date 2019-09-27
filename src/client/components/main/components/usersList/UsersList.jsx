import util from '../../../../utils/requestHelper';
import PropTypes from 'prop-types';
import React from 'react';
import './UsersList.css';

const UsersList = props => {
    const { usersList, translate, clients, openPrivateChat } = props;

    return (
        <div className='content'>
            <div className='user'>
                <div className='users__title'>
                    <div className='users__info'>{translate('name')}</div>
                    <div className='users__info'>{translate('eMail')}</div>
                </div>
                {
                    usersList.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`users__card ${util.drawOnline(item._id, clients)}` } >
                                <p className='users__info' id={item._id} onClick={openPrivateChat}>{item.name}</p>
                                <p className='users__info' id={item._id} onClick={openPrivateChat}>{item.email}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

UsersList.propTypes = {
    clients: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired,
    usersList: PropTypes.array.isRequired,
    openPrivateChat: PropTypes.func.isRequired,
};

export default UsersList;