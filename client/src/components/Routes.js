import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthenticatedRoute from './AuthenticatedRoute';
import LoginView from '../views/LoginView';
import ErrorView from '../views/ErrorView';
import MembersOnlyView from '../views/MembersOnlyView';
import ProfileView from '../views/ProfileView';
import UsersView from '../views/UsersView';


function Routes(props) {
    return (
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
                    loginCb={(u, p) => props.loginCb(u, p)} 
                    loginError={props.loginError} 
                />
            </Route>

            <ErrorView code="404" text="Page not found" />
        </Switch>
    )
}

export default Routes;