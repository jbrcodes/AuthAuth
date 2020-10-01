import React from 'react';
import { Redirect } from 'react-router-dom';


function LogoutView(props) {
    props.logout();

    return <Redirect to="/" />;
}

export default LogoutView;