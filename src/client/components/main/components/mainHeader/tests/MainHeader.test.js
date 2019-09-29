import React from 'react';
import MainHeader from '../MainHeader.jsx';

const mockProps = {
    name: '',
    email: '',
    translate: () => {},
    clickButtonLogOut: () => {},
};

describe('MainHeader snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <MainHeader {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});