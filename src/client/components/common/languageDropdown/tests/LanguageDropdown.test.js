import React from 'react';
import LanguageDropdown from '../LanguageDropdown.jsx';

const mockProps = {
    defaultCountry: '',
    changeLanguage: () => {},
};

describe('ErrorWindow snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <LanguageDropdown {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});