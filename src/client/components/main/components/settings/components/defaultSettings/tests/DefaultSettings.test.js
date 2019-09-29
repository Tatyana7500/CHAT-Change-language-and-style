import React from 'react';
import DefaultSettings from '../DefaultSettings.jsx';

const mockProps = {
    setDefaultSettings: () => {},
    translate: () => {},
};

describe('DefaultSettings snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <DefaultSettings {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});