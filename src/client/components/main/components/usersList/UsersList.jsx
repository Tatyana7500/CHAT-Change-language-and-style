import PropTypes from 'prop-types';
import React from 'react';
import './UsersList.css';

class UsersList extends React.Component {
    static propTypes = {
        usersOnline: PropTypes.array.isRequired,
        translate: PropTypes.func.isRequired,
        usersList: PropTypes.array.isRequired,
        openPrivateChat: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { usersList, translate, usersOnline, openPrivateChat } = this.props;

        return (
            <div className='content'>
                <div className='user'>
                    <div className='users__title'>
                        <div className='users__info'>{translate('name')}</div>
                        <div className='users__info'>{translate('eMail')}</div>
                    </div>
                    {
                        usersList.map((item, index) => {

                            const isOnline = usersOnline.includes(item._id);
                            return (
                                <div
                                    key={index}
                                    id={item._id}
                                    className={`users__card ${isOnline ? 'online' : ''}`}>
                                    <p className='users__info' id={item._id} onClick={openPrivateChat}>{item.name}</p>
                                    <p className='users__info' id={item._id} onClick={openPrivateChat}>{item.email}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default UsersList;