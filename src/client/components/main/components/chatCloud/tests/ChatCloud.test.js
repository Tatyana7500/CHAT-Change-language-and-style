import React from 'react';
import ChatCloud from '../ChatCloud.jsx';

const mockProps = {
    name: '',
    email: '',
    text: '',
    date: '',
    nameSender: '',
};

describe('ChatCloud snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <ChatCloud {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});