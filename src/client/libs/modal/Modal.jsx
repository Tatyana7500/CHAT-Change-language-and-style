import ModalWrapper from './modalWrapper/ModalWrapper';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends PureComponent {
    static propTypes = {
        showModal: PropTypes.bool.isRequired,
        path: PropTypes.object,
    };

    render() {
        const {
            path,
            children,
            showModal,
        } = this.props;

        return showModal ?
            <ModalWrapper showModal={showModal} path={path}>
                <div className='modal-container'>
                    { children }
                </div>
            </ModalWrapper> : null;
    }
}

export default Modal;