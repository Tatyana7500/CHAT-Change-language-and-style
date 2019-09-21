import React from 'react';
import PropTypes from 'prop-types';
import constants from '../../../../server/constants';

const UsersList = props => {
    const { usersList, userState } = props;

    return (
        <div className='content'>
            <div className='users__title'>
                <div className='users__info'>name</div>
                <div className='users__info'>e-mail</div>
            </div>
            {   
                usersList.map((item, id) => {
                    return ( 
                        <div 
                            key={id}
                            className={`users__card ${constants.OFFLINE}`} >
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
    usersList: PropTypes.array.isRequired,
    userState: PropTypes.isRequired,
};

export default UsersList;