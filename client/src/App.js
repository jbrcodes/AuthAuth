import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Local from './helpers/Local';
import Api from './helpers/Api';

import NavBar from './components/NavBar';

import PrivateRoute from './components/PrivateRoute';
import LoginView from './views/LoginView';
import ErrorView from './views/ErrorView';
import MembersOnlyView from './views/MembersOnlyView';
import ProfileView from './views/ProfileView';
import UsersView from './views/UsersView';


function App() {
    const [user, setUser] = useState(Local.getUser());
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const navigate = useNavigate();

    async function doLogin(username, password) {
        let response = await Api.loginUser(username, password);
        if (response.ok) {
            Local.saveUserInfo(response.data.token, response.data.user);
            setUser(response.data.user);
            setLoginErrorMsg('');
            navigate('/');
        } else {
            setLoginErrorMsg('Login failed');
        }
    }

    function doLogout() {
        Local.removeUserInfo();
        setUser(null);
        navigate('/');
    }

    return (
        <div className="App">
            <NavBar user={user} logoutCb={doLogout} />

            <div className="container">
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/users" element={<UsersView />} />
                    <Route path="/users/:userId" element={
                        <PrivateRoute>
                            <ProfileView />
                        </PrivateRoute>
                    } />
                    <Route path="/members-only" element={
                        <PrivateRoute>
                            <MembersOnlyView />
                        </PrivateRoute>
                    } />
                    <Route path="/login" element={
                        <LoginView 
                            loginCb={(u, p) => doLogin(u, p)} 
                            loginError={loginErrorMsg} 
                        />
                    } />
                    <Route path="*" element={<ErrorView code="404" text="Page not found" />} />
                </Routes>
            </div>
        </div>
    );
}


export default App;