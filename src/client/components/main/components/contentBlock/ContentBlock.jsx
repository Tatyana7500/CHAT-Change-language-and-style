import UsersList from '../usersList/UsersList.jsx';
import HatBlock from '../chatBlock/ChatBlock.jsx';
import constants from '../../../../../constants';
import PropTypes from 'prop-types';
import './ContentBlock.css';
import React from 'react';

const ContentBlock = props => {
    const {
        name,
        emoji,
        usersOnline,
        messages,
        addEmoji,
        clickChat,
        usersList,
        closeMenu,
        userState,
        translate,
        clickUsers,
        emojiMenu,
        showEmoji,
        windowState,
        privateChat,
        clickButtonSend,
        messageAreaValue,
        updateMessageValue,
        openPrivateChat,
    } = props;

    return (
        <div className='mainWindow'>
            <div className='wrapper mainWindow__wrapper'>
                <div className='nav-main'>
                    <button
                        onClick={clickUsers}
                        className='buttons-main__btn buttons-main__btn_user'
                        id='getUsers'>
                        {translate('users')}
                    </button>
                    <button
                        onClick={clickChat}
                        className='buttons-main__btn buttons-main__btn_chat'
                        id='getChat'>
                        {translate('chat')}
                    </button>
                </div>
            </div>

            {windowState === constants.USERS &&
                <UsersList
                    usersOnline={usersOnline}
                    usersList={usersList}
                    userState={userState}
                    translate={translate}
                    openPrivateChat={openPrivateChat}
                />
            }
            {windowState === constants.MESSAGE &&
                <HatBlock
                    name={name}
                    emoji={emoji}
                    messages={messages}
                    addEmoji={addEmoji}
                    closeMenu={closeMenu}
                    translate={translate}
                    emojiMenu={emojiMenu}
                    showEmoji={showEmoji}
                    privateChat = {privateChat}
                    clickButtonSend={clickButtonSend}
                    messageAreaValue={messageAreaValue}
                    updateMessageValue={updateMessageValue}
                />
            }
        </div>
    );
};

ContentBlock.propTypes = {
    emoji: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    usersOnline: PropTypes.array.isRequired,
    addEmoji: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    clickChat: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
    usersList: PropTypes.array.isRequired,
    clickUsers: PropTypes.func.isRequired,
    showEmoji: PropTypes.func.isRequired,
    emojiMenu: PropTypes.bool.isRequired,
    userState: PropTypes.string.isRequired,
    windowState: PropTypes.string.isRequired,
    clickButtonSend: PropTypes.func.isRequired,
    updateMessageValue: PropTypes.func.isRequired,
    messageAreaValue: PropTypes.string.isRequired,
    privateChat: PropTypes.bool.isRequired,
    openPrivateChat: PropTypes.func.isRequired,
};

export default ContentBlock;