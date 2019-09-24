import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import React from 'react';

const Emoji = (props) => {
    const {
        addEmoji,
        translate,
        emojisMenu,
        showEmojis,
        clickButtonSend,
    } = props;

    return (
        <div>
            <button
                onClick={clickButtonSend}
                className='btn btn-main footer__send'>{translate('send')}
            </button>
            {emojisMenu ?
                <span className='emojiPicker'>
                                <Picker
                                    title='weChat'
                                    onSelect={addEmoji}
                                    emojiTooltip={true}
                                />
                            </span>
                :
                <p
                    onClick={showEmojis}
                    className='getEmojiButton' >
                    {String.fromCodePoint(0x1f60a)}
                </p>
            };
        </div>
    );
};

Emoji.propTypes = {
    addEmoji: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    emojisMenu: PropTypes.bool.isRequired,
    showEmojis: PropTypes.func.isRequired,
    clickButtonSend: PropTypes.func.isRequired,
};

export default Emoji;