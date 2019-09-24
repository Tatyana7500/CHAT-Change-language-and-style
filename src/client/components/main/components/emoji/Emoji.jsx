import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import React from 'react';

const Emoji = (props) => {
    const {
        addEmoji,
        emojisMenu,
        showEmojis,
    } = props;

    return (
        <div>
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
            }
        </div>
    );
};

Emoji.propTypes = {
    addEmoji: PropTypes.func.isRequired,
    emojisMenu: PropTypes.bool.isRequired,
    showEmojis: PropTypes.func.isRequired,
};

export default Emoji;