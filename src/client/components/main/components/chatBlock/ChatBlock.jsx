import HatCloud from '../chatCloud/ChatCloud.jsx';
import Emoji from '../emoji/Emoji.jsx';
import PropTypes from 'prop-types';
import logic from './logic';
import React from 'react';
import './ChatBlock.css';

const HatBlock = props => {
    const {
        name,
        emoji,
        addEmoji,
        messages,
        translate,
        showEmoji,
        emojiMenu,
        clickButtonSend,
        messageAreaValue,
        updateMessageValue,
    } = props;

    return (
        <div className='content'>
            <div className='massageField' id='massageField'>
                {messages.map((item, index) => {
                    const date = logic.parseDate(item.date);

                    return (
                        <HatCloud key={index} name={item.name} text={item.message} email={item.email} date={date} nameSender={name}/>
                    );
                })
                }
            </div>
            <div className='footer'>
                <textarea
                    id='textMassage'
                    className='textMassage'
                    value={messageAreaValue}
                    onChange={updateMessageValue}
                    placeholder={translate('yourMessage')}>
                </textarea>
                {emoji === true &&
                    <Emoji
                        clickButtonSend={clickButtonSend}
                        emojiMenu={emojiMenu}
                        showEmoji={showEmoji}
                        addEmoji={addEmoji}
                        translate={translate}
                    />
                }
                <button
                    onClick={clickButtonSend}
                    className='btn btn-main footer__send'>{translate('send')}
                </button>
            </div>
        </div>
    );
};

HatBlock.propTypes = {
    emoji: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    addEmoji: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired,
    emojiMenu: PropTypes.bool.isRequired,
    showEmoji: PropTypes.func.isRequired,
    clickButtonSend: PropTypes.func.isRequired,
    messageAreaValue: PropTypes.string.isRequired,
    updateMessageValue: PropTypes.func.isRequired,
};

export default HatBlock;