import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Auth from './helpers/Auth';
import Api from './helpers/Api';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

import LoginView from './components/LoginView';
import ErrorView from './components/ErrorView';
import SecretView from './components/SecretView';
import ProfileView from './components/ProfileView';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: Auth.getUserId(),  // is userId in localStorage?
            loginError: ''
        }
    }

    async doLogin(username, password) {
        let body = { username, password };
        let response = await Api.request('POST', '/users/login', body);
        if (response.ok) {
            Auth.loginUser(response.data.token, response.data.userId);
            this.setState({ userId: response.data.userId, loginError: '' });
            this.props.history.push('/');
        } else {
            this.setState({ loginError: response.error });
        }
    }

    doLogout() {
        Auth.logoutUser();  // remove token/userId from localStorage
        this.setState({ userId: '' });
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <NavBar userId={this.state.userId} logout={() => this.doLogout()} />
                <div className="container">
                    <Switch>
                        <Route path="/" exact>
                            <h2>Home View</h2>
                        </Route>
    
                        <PrivateRoute path="/secret" exact>
                            <SecretView />
                        </PrivateRoute>
    
                        <PrivateRoute 
                            path="/users/:userId/profile" 
                            exact 
                            component={ProfileView} 
                        />
    
                        <Route path="/login" exact>
                            <LoginView 
                                login={(u, p) => this.doLogin(u, p)} 
                                error={this.state.loginError} 
                            />
                        </Route>

                        <ErrorView code="404" text="Not Found" />
                    </Switch>
                </div>
            </div>
        );
    }

}

export default withRouter(App);