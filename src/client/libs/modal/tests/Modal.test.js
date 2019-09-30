import React from 'react';
import Modal from '../Modal.jsx';

const mockProps = {
        path: {
            appendChild: () => {},
            removeChild: () => {},
        },
        children: {},
    };

describe('Modal', () => {
    describe('Modal snapshot', () => {
        let sandbox;
        let component;

        before(() => {
            sandbox = sinon.createSandbox();
            sandbox.stub(mockProps.path, 'appendChild');
            component = shallow(
                <Modal {...mockProps} />
            );
            sandbox.stub(mockProps.path, 'removeChild');
        });

        after(() => {
            sandbox.restore();
        });

        it('should render correctly', () => {
            expect(component).matchSnapshot();
        });

        it('Should called once path.appendChild', () => {
            sinon.assert.calledOnce(mockProps.path.appendChild);
        });

        // it('Should called once path.removeChild', () => {
        //     sinon.assert.calledOnce(mockProps.path.removeChild);
        // });
    });
});

