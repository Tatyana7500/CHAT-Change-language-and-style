import React from 'react';
import Login from '../Login.jsx';

const mockProps = {
    translate: () => {},
    defaultCountry: 'US',
    changeLanguage: () => {},
};

describe('Login snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Login {...mockProps}/>
        );

        expect(wrapper).matchSnapshot();
    });
});