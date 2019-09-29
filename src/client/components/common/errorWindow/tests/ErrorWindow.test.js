import React from 'react';
import ErrorWindow from '../ErrorWindow.jsx';

const mockProps = {
    error: '',
    handleHide: () => {},
};

describe('ErrorWindow snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <ErrorWindow {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});