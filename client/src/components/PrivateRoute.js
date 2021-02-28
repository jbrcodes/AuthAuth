import React from "react";
import { Route, Redirect } from "react-router-dom";
import Local from '../helpers/Local';


function PrivateRoute({ exact, path, component, children }) {
    let userId = Local.getUserId();
    if (!userId) {
        return <Redirect to="/login" />;
    }

    return (
        <Route exact={exact} path={path} component={component}>
            {children}
        </Route>
    );
}

export default PrivateRoute;