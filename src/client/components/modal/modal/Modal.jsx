import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends PureComponent {
    constructor(props) {
        super(props);
        this.modalContainer = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.modalContainer);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.modalContainer);
    }

    render() {
        const {
            children,
        } = this.props;

        return createPortal(
            children,
            this.modalContainer,
        );
    }
}

export default Modal;