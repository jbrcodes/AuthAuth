import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import MyApi from './services/MyApi';
import LoginView from './components/LoginView';
import LogoutView from './components/LogoutView';
import ErrorView from './components/ErrorView';
import SecretView from './components/SecretView';
import ProfileView from './components/ProfileView';


function App() {
    let [token, setToken] = useState( localStorage['token'] );

    function mySetToken(token) {
        localStorage['token'] = token;
        setToken(token);
    }

    async function doLogin(username, password) {
        let body = { username, password };
        let response = await MyApi.request('POST', '/users/login', body);
        if (response.ok) {
            console.log('data:', response.data);
            mySetToken(response.data.token);
            // localStorage['token'] = response.data.token;
        } else {
            console.log('error', response.error);
        }
    }

    return (
        <div className="App">
            <NavBar token={token} />
            <div className="container">
                <Switch>
                    <Route path="/" exact>
                        <h2>HomeView</h2>
                    </Route>

                    <Route path="/login" exact>
                        <LoginView onSubmit={(u, p) => doLogin(u, p)} />
                    </Route>

                    <Route path="/logout" exact>
                        <LogoutView setToken={mySetToken} />
                    </Route>

                    <Route path="/secret" exact>
                        <SecretView token={token} />
                    </Route>

                    <Route path="/users/:userId/profile" exact component={ProfileView} />

                    <ErrorView code="404" message="Not Found" />
                </Switch>
            </div>
        </div>
    );
}

export default App;