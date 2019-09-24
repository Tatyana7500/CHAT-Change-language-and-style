import HatCloud from '../chatClound/ChatClound.jsx';
import Emoji from '../emoji/Emoji.jsx';
import '../../../../theme/index.css';
import PropTypes from 'prop-types';
import React from 'react';

const HatBlock = props => {
    const {
        name,
        emoji,
        addEmoji,
        messages,
        translate,
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
                    const date = new Date(parseInt(item.date)).toTimeString().slice(0, 8);

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
                        emojisMenu={emojisMenu}
                        showEmojis={showEmojis}
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
    emojisMenu: PropTypes.bool.isRequired,
    showEmojis: PropTypes.func.isRequired,
    clickButtonSend: PropTypes.func.isRequired,
    messageAreaValue: PropTypes.string.isRequired,
    updateMessageValue: PropTypes.func.isRequired,
};

export default HatBlock;