import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.css';

import Local from './helpers/Local';
import Api from './helpers/Api';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

import LoginView from './components/LoginView';
import ErrorView from './components/ErrorView';
import MembersOnlyView from './components/MembersOnlyView';
import ProfileView from './components/ProfileView';
import UsersView from './components/UsersView';


function App() {
    const [user, setUser] = useState(Local.getUser());
    const [flashError, setFlashError] = useState('');
    const history = useHistory();

    async function doLogin(username, password) {
        let response = await Api.loginUser(username, password);
        if (response.ok) {
            Local.saveUserInfo(response.data.token, response.data.user);
            setUser(response.data.user);
            setFlashError('');
            history.push('/');
        } else {
            setFlashError('Login failed');
        }
    }

    function doLogout() {
        Local.removeUserInfo();  // remove token/userId from localStorage
        setUser(null);
        history.push('/');
    }

    return (
        <div className="App">
            <NavBar user={user} logout={doLogout} />

            <div className="container">
                <Switch>
                    <Route path="/" exact>
                        <h1>Home</h1>
                    </Route>

                    <Route path="/users" exact>
                        <UsersView />
                    </Route>

                    <PrivateRoute path="/users/:userId" exact>
                        <ProfileView />
                    </PrivateRoute>

                    <PrivateRoute path="/members-only" exact>
                        <MembersOnlyView />
                    </PrivateRoute>

                    <Route path="/login" exact>
                        <LoginView 
                            onSubmit={(u, p) => doLogin(u, p)} 
                            error={flashError} 
                        />
                    </Route>

                    <ErrorView code="404" text="Not Found" />
                </Switch>
            </div>
        </div>
    );
}


export default App;