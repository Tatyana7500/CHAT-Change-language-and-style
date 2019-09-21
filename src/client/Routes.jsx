import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppSettings from './App.jsx';
import Index from './main';
import Login from './login/Login.jsx';
import SignIn from './signIn/SignIn.jsx';

class Routes extends Component {
    render() {
        return (
            <div>
                <AppSettings />
                <Router>
                    <Switch>
                        <Route exact path='/main' component={Index} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/signIn' component={SignIn} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Routes;