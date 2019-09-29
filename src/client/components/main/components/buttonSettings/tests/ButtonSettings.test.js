import React from 'react';
import ButtonSettings from '../ButtonSettings';

const mockProps = {
    handleShow: () => {},
};

describe('ButtonSettings snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <ButtonSettings {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});