import React from 'react';
import { NavLink, Link } from 'react-router-dom';


function NavBar(props) {
    return (
        <nav className="Navbar navbar navbar-expand-md navbar-dark mb-4" style={{ backgroundColor: 'teal' }}>
            <span className="navbar-brand font-weight-bold">AuthAuth</span>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Left-aligned menu items */}
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    {
                        props.userId && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/secret">Secret</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={`/users/${props.userId}/profile`}>Profile</NavLink>
                                </li>
                            </>
                        )
                    }

                </ul>
            </div>

            {/* Right-aligned menu items */}
            {
                props.userId
                    ?   
                        (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <span
                                        className="nav-link" 
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => props.logout()}
                                    >Logout</span>
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