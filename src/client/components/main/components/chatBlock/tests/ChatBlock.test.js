import React from 'react';
import ChatBlock from '../ChatBlock.jsx';

const mockProps = {
    translate: () => { },
    emoji: true,
    name: '',
    addEmoji: () => { },
    messages: [],
    emojiMenu: false,
    showEmoji: () => { },
    clickButtonSend: () => { },
    messageAreaValue: '',
    updateMessageValue: () => { },
};

describe('ChatBlock snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <ChatBlock {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});