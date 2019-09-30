import React from 'react';
import ChatBlock from '../ChatBlock.jsx';
import logic from '../logic';
import {mock} from "sinon";

const mockProps = {
    translate: () => { },
    emoji: true,
    name: '',
    addEmoji: () => { },
    messages: [],
    emojiMenu: false,
    showEmoji: () => { },
    clickButtonSend: () => { },
    messageAreaValue: '',
    updateMessageValue: () => { },
};

describe('ChatBlock', () => {
    describe('ChatBlock snapshot', () => {
        it('should render correctly', () => {
            const wrapper = shallow(
                <ChatBlock {...mockProps} />
            );

            expect(wrapper).matchSnapshot();
        });
    });

    describe('parseDate', () => {
        let sandbox;
        let component;

        before(() => {
            sandbox = sinon.createSandbox();
            component = shallow(
                <ChatBlock {...mockProps} />
            );
            sandbox.stub(logic, 'parseDate');
        });

        after(() => {
            sandbox.restore();
            sandbox.reset();
        });

        // it('should called once parseDate', () => {
        //     sinon.assert.calledOnce(logic.parseDate);
        // });
    });
});