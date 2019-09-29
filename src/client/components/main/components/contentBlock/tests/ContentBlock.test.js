import React from 'react';
import ContentBlock from '../ContentBlock.jsx';

const mockProps = {
    emoji: true,
    name: '',
    usersOnline: [],
    addEmoji: () => {},
    messages: [],
    clickChat: () => {},
    translate: () => {},
    closeMenu: () => {},
    usersList: [],
    clickUsers: () => {},
    showEmoji: () => {},
    emojiMenu: false,
    userState: '',
    windowState: '',
    clickButtonSend: () => {},
    updateMessageValue: () => {},
    messageAreaValue: '',
    privateChat: true,
    openPrivateChat: () => {},
};

describe('ContentBlock snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <ContentBlock {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});