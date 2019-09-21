import React from 'react';
import PropTypes from 'prop-types';
import UsersList from '../usersList/usersList';
import ChatWindow from '../chatWindow/chatWindow';
import constants from '../../../../server/constants';

const ContentWindow = props => {
    const {
        usersList,
        messages,
        addEmoji,
        updateMessageValue,
        messageAreaValue,
        clickButtonSend,
        clickUsers,
        clickChat,
        windowState,
        closeMenu,
        showEmojis,
        emojisMenu,
        userState,
    } = props;

    return (
        <div className='mainWindow'>
            <div className='wrapper mainWindow__wrapper'>
                <div className='buttons-main'>
                    <button
                        onClick={clickUsers}
                        className='btn buttons-main__btn buttons-main__btn_user'
                        id='getUsers'>
                        users
                    </button>
                    <button
                        onClick={clickChat}
                        className='btn buttons-main__btn buttons-main__btn_chat'
                        id='getChat'>
                        chat
                    </button>
                </div>
            </div>

            {windowState === constants.USERS && <UsersList usersList={usersList}
                                                            userState={userState} />}
            {windowState === constants.MESSAGE && <ChatWindow messages={messages}
                                                              addEmoji={addEmoji}
                                                              emojisMenu={emojisMenu}
                                                              closeMenu={closeMenu}
                                                              showEmojis={showEmojis}
                                                              messageAreaValue={messageAreaValue}
                                                              clickButtonSend={clickButtonSend}
                                                              updateMessageValue={updateMessageValue} />}
        </div>
    );
};

ContentWindow.propTypes = {
    usersList: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired,
    addEmoji: PropTypes.func.isRequired,
    updateMessageValue: PropTypes.func.isRequired,
    messageAreaValue: PropTypes.string.isRequired,
    clickButtonSend: PropTypes.func.isRequired,
    clickUsers: PropTypes.func.isRequired,
    clickChat: PropTypes.func.isRequired,
    windowState: PropTypes.string.isRequired,
    showEmojis: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
    emojisMenu: PropTypes.bool.isRequired,
    userState: PropTypes.string.isRequired,
};

export default ContentWindow;