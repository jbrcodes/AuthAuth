import React from 'react';
import { Redirect } from 'react-router-dom';


function LogoutView(props) {
    props.setToken('');

    return <Redirect to="/" />;
}

export default LogoutView;