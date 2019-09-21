import React from 'react';
import PropTypes from 'prop-types';

const UsersList = props => {
    const { usersList } = props;

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
                            className='users__card'>
                            <p className='users__info'>{item.name}</p>
                            <p className='users__info'>{item.email}</p>
                        </div>
                    );
                })
            }
        </div>
    );
};

UsersList.propTypes = {
    usersList: PropTypes.array.isRequired,
};

export default UsersList;