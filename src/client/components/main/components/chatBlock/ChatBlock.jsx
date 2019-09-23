import HatClound from '../chatClound/ChatClound.jsx';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import '../../../../theme/index.css';
import React from 'react';

const HatBlock = props => {
    const {
        name,
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
                        <HatClound key={index} name={item.name} text={item.message} email={item.email} date={date} nameSender={name}/>
                    );
                })
                }
            </div>
            <div className='footer'>
                <textarea
                    id='textMassage'
                    className='textMassage'
                    value={messageAreaValue}
                    onInput={updateMessageValue}
                    placeholder={translate('yourMessage')}>
                </textarea>
                <button
                    onClick={clickButtonSend}
                    className='btn btn-main footer__send'>{translate('send')}</button>
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
        </div>
    );
};

HatBlock.propTypes = {
    name: PropTypes.string.isRequired,
    addEmoji: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired,
    showEmojis: PropTypes.func.isRequired,
    emojisMenu: PropTypes.bool.isRequired,
    clickButtonSend: PropTypes.func.isRequired,
    messageAreaValue: PropTypes.string.isRequired,
    updateMessageValue: PropTypes.func.isRequired,
};

export default HatBlock;