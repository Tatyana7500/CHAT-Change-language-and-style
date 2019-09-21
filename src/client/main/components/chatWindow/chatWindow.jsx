import React from 'react';
import ChatCloud from '../chatClound/chatCloud';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import '../../../login/style.css';
import PropTypes from 'prop-types';

const ChatWindow = props => {
    const {
        addEmoji,
        messages,
        showEmojis,
        emojisMenu,
        clickButtonSend,
        messageAreaValue,
        updateMessageValue,
    } = props;

    return (
        <div className='content'>
            <div className='massageField' id='massageField'>
                {messages.map((item, index) => {
                    return (
                        <ChatCloud key={index} name={item.name} text={item.message} email={item.email} date={item.date}/>
                    );
                })
                }
            </div>
            <div className='footer'>
                <textarea
                    id='textMassage'
                    value={messageAreaValue}
                    onInput={updateMessageValue}
                    className='textMassage'
                    placeholder='Your massage'> </textarea>
                <button
                    onClick={clickButtonSend}
                    className='btn btn-main footer__send'>Send</button>
                {emojisMenu ?
                    <span className='emojiPicker'>
                        <Picker
                            onSelect={addEmoji}
                            emojiTooltip={true}
                            title='weChat'
                        />
                    </span>
                    :
                    <p
                        onClick={showEmojis}
                        className='getEmojiButton' >
                        {String.fromCodePoint(0x1f60a)}
                    </p>
                }
            </div>
        </div>
    );
};

ChatWindow.propTypes = {
    messages: PropTypes.array.isRequired,
    addEmoji: PropTypes.func.isRequired,
    showEmojis: PropTypes.func.isRequired,
    emojisMenu: PropTypes.bool.isRequired,
    clickButtonSend: PropTypes.func.isRequired,
    messageAreaValue: PropTypes.string.isRequired,
    updateMessageValue: PropTypes.func.isRequired,
};

export default ChatWindow;