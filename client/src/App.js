import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';

import Local from './helpers/Local';
import Api from './helpers/Api';

import NavBar from './components/NavBar';
import Routes from './components/Routes';


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
            <NavBar user={user} logoutCb={doLogout} />

            <div className="container">
                <Routes
                    loginCb={(u, p) => doLogin(u, p)}
                    loginError={loginErrorMsg}
                />
            </div>
        </div>
    );
}


export default App;