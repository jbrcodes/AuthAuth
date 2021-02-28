import React from "react";
import { Route, Redirect } from "react-router-dom";
import Local from '../helpers/Local';


function PrivateRoute(props) {
    let userId = Local.getUserId();
    if (!userId) {
        return <Redirect to="/login" />;
    }

    return (
        <Route exact path={props.path}>
            {props.children}
        </Route>
    );
}

export default PrivateRoute;