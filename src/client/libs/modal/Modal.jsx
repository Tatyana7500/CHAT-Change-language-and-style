import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { createPortal } from 'react-dom';

class Modal extends PureComponent {
    constructor(props) {
        super(props);
        this.modalContainer = document.createElement('div');
        this.modalContainer.className = 'modal-container';
    }

    static propTypes = {
        path: PropTypes.object,
    };

    static defaultProps = {
        path: document.body,
    };

    componentDidMount() {
        const { path } = this.props;

        path.appendChild(this.modalContainer);
    }

    componentWillUnmount() {
        const { path } = this.props;

        path.removeChild(this.modalContainer);
    }

    render() {
        const {
            children,
        } = this.props;

        return createPortal(children, this.modalContainer);
    }
}

export default Modal;