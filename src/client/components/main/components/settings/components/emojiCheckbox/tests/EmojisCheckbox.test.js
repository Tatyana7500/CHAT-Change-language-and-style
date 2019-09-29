import React from 'react';
import EmojiCheckbox from '../EmojisCheckbox.jsx';

const mockProps = {
    changeActiveEmoji: () => {},
    emoji: true,
};

describe('EmojiCheckbox snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <EmojiCheckbox {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});