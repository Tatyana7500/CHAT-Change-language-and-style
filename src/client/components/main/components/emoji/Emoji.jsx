import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import React from 'react';
import './Emoji.css';

const Emoji = (props) => {
    const {
        addEmoji,
        emojiMenu,
        showEmoji,
    } = props;

    return (
        <div>
            {emojiMenu ?
                <span className='emojiPicker'>
                                <Picker
                                    title='weChat'
                                    onSelect={addEmoji}
                                    emojiTooltip={true}
                                />
                            </span>
                :
                <p
                    onClick={showEmoji}
                    className='getEmojiButton' >
                    {String.fromCodePoint(0x1f60a)}
                </p>
            }
        </div>
    );
};

Emoji.propTypes = {
    addEmoji: PropTypes.func.isRequired,
    emojiMenu: PropTypes.bool.isRequired,
    showEmoji: PropTypes.func.isRequired,
};

export default Emoji;