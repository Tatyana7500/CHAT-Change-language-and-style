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
            debugger;

            return isAuthorized ? (
                <Component
                    logout={logout}
                    {...this.props}
                />
            ) : null;
        }
    };
}

export default withAuthorization;