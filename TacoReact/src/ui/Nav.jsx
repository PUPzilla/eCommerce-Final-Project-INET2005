import React from "react";
import './nav.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar sticky-top">
            <div className="container">
            <a className="navbar-brand" href="/">Yota's Tacos: Offroading and Overland Equipment</a>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                    <li><Link to="/signup">Sign-Up</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
