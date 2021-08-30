import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.css';

import Local from './helpers/Local';
import Api from './helpers/Api';

import NavBar from './components/NavBar';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import LoginView from './views/LoginView';
import ErrorView from './views/ErrorView';
import MembersOnlyView from './views/MembersOnlyView';
import ProfileView from './views/ProfileView';
import UsersView from './views/UsersView';


function App() {
    const [user, setUser] = useState(Local.getUser());
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const history = useHistory();

    async function doLogin(username, password) {
        let response = await Api.loginUser(username, password);
        if (response.ok) {
            Local.saveUserInfo(response.data.token, response.data.user);
            setUser(response.data.user);
            setLoginErrorMsg('');
            history.push('/');
        } else {
            setLoginErrorMsg('Login failed');
        }
    }

    function doLogout() {
        Local.removeUserInfo();
        setUser(null);
        history.push('/');
    }

    return (
        <div className="App">
            <NavBar user={user} onLogout={doLogout} />

            <div className="container">
                <Switch>
                    <Route path="/" exact>
                        <h1>Home</h1>
                    </Route>

                    <Route path="/users" exact>
                        <UsersView />
                    </Route>

                    <AuthenticatedRoute path="/users/:userId" exact>
                        <ProfileView />
                    </AuthenticatedRoute>

                    <AuthenticatedRoute path="/members-only" exact>
                        <MembersOnlyView />
                    </AuthenticatedRoute>

                    <Route path="/login" exact>
                        <LoginView 
                            onSubmit={(u, p) => doLogin(u, p)} 
                            error={loginErrorMsg} 
                        />
                    </Route>

                    <ErrorView code="404" text="Page not found" />
                </Switch>
            </div>
        </div>
    );
}


export default App;