import React from 'react';

function withAuthorization(Component) {
    return class extends React.Component {
        componentWillCheckLS() {
            const userValidate = JSON.parse(window.localStorage.getItem('chat'));

            return userValidate !== null;
        }

        render() {
            if (this.componentWillCheckLS()) {
                return <Component {...this.props} />;
            } else {
                window.location.href = '/login';
            }
        }
    };
}

export default withAuthorization;