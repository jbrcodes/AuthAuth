import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginView from './LoginView';
import RegisterView from './RegisterView';


function Routes() {
    return (
        <Switch>
            <Route path="/" exact>
                <h2>HomeView</h2>
                {/* <HomeView /> */}
            </Route>

            <Route path="/login" exact>
                <LoginView />
            </Route>

            <Route path="/register" exact>
                <RegisterView />
            </Route>
        </Switch>
    )
}

export default Routes;