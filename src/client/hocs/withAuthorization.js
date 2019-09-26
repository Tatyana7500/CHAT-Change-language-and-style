import React from 'react';

function withAuthorization(Component, isAuthorized, redirect, logout) {
    return class WithAuthorizationWrapper extends React.Component {
        componentDidMount() {
            this.checkAuthorization();
        }

        componentDidUpdate() {
            this.checkAuthorization();
        }

        checkAuthorization = () => {
            if (!isAuthorized) {
                redirect();
            }
        };

        render() {
            return isAuthorized ? (
                <Component
                    {...this.props}
                    logout={logout}
                />
            ) : null;
        }
    };
}

export default withAuthorization;