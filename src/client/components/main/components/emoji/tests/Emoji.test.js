import React from 'react';
import Emoji from '../Emoji.jsx';

const mockProps = {
    handleShow: () => {},
};

describe('Emoji snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <Emoji {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});