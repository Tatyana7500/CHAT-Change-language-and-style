import React from 'react';
import Settings from '../Settings.jsx';

const mockProps = {
    emoji: true,
    theme: '',
    translate: () => {},
    handleHide: () => {},
    changeTheme: () => {},
    privateChat: true,
    changeLanguage: () => {},
    defaultCountry: '',
    changeActiveEmoji: () => {},
    setDefaultSettings: () => {},
    changeActivePrivateChat: () => {},
};

describe('Settings snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Settings {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});