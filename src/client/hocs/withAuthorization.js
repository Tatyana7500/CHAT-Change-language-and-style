import React from 'react';
import PropTypes from 'prop-types';

class WithAuthorizationWrapper extends React.Component {
    static propTypes = {
        isAuthorized: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        redirect: PropTypes.func.isRequired,
        component: PropTypes.func.isRequired,
        componentProps: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.checkAuthorization();
    }

    componentDidUpdate() {
        this.checkAuthorization();
    }

    checkAuthorization = () => {
        if (!this.props.isAuthorized) {
            this.props.redirect();
        }
    };

    render() {
        const {
            component: Component,
            componentProps,
        } = this.props;

        return this.props.isAuthorized ? (
            <Component
                {...componentProps}
                logout={this.props.logout}
            />
        ) : null;
    }
}

export default WithAuthorizationWrapper;