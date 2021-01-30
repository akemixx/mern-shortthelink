import React, {useContext} from 'react';
import {NavLink, useHistory } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        authContext.logout();
        history.push('/');
    };

    return (
        <nav>
            <div className="nav-wrapper teal paddingSide">
                <span className="brand-logo">Short the link</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Create</NavLink></li>
                    <li><NavLink to='/links'>Links</NavLink></li>
                    <li><a href='/' onClick={ logoutHandler }>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
}