import React from 'react';
import ThemeDropdown from '../ThemeDropdown.jsx';

const mockProps = {
    theme: '',
    changeTheme: () => {},
};

describe('ErrorWindow snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <ThemeDropdown {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});