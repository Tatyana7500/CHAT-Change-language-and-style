import React from 'react';
import { PropTypes } from 'prop-types';

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        static propTypes = {
            isAuthenticated: PropTypes.boolean,
            redirect: PropTypes.func.isRequired,
        };

        mapStateToProps = () => {
            const userValidate = JSON.parse(window.localStorage.getItem('chat'));

            if (userValidate) {
                return {
                    isAuthenticated: true,
                };
            }
        };

        mapDispatchToProps = dispatch => bindActionCreators({
            redirect: () => {
                window.location.href = '/login';
            },
        }, dispatch);

        componentDidMount() {
            this._checkAndRedirect();
        }

        componentDidUpdate() {
            this._checkAndRedirect();
        }

        _checkAndRedirect() {
            const { isAuthenticated, redirect } = this.props;

            if (!isAuthenticated) {
                redirect();
            }
        }

        render() {
                return (
                    <div>
                        {this.props.isAuthenticated ? <ComposedComponent {...this.props} /> : null}
                    </div>
                );
        }
    }

    Authenticate.propTypes = propTypes;

    return Authenticate;
}

// function withAuthorization(Component) {
//     return class extends React.Component {
//         componentWillCheckLS() {
//             const userValidate = JSON.parse(window.localStorage.getItem('chat'));
//
//             return userValidate !== null;
//         }
//
//         render() {
//             if (this.componentWillCheckLS()) {
//                 return <Component {...this.props} />;
//             } else {
//                 window.location.href = '/login';
//             }
//         }
//     };
// }
//
// export default withAuthorization;