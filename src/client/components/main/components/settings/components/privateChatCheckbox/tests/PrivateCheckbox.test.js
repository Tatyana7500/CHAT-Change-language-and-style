import React from 'react';
import PrivateCheckbox from '../PrivateCheckbox.jsx';

const mockProps = {
    changeActivePrivateChat: () => {},
    privateChat: true,
};

describe('PrivateCheckbox snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <PrivateCheckbox {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});