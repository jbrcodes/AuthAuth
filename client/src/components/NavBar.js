import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar(props) {
    return (
        <nav className="Navbar navbar navbar-expand-md navbar-dark mb-4" style={{ backgroundColor: 'teal' }}>
            <NavLink className="navbar-brand" to="/">Auth2</NavLink>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    {
                        props.token && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/secret">Secret</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/users/2/profile">two's Profile</NavLink>
                                </li>
                            </>
                        )
                    }

                </ul>
            </div>

            {
                props.token
                    ?   
                        (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                </li>
                            </ul>
                        )
                    :
                        (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            </ul>
                        )
            }
        </nav>
    );
}

export default NavBar;