import React from "react";
import '../index.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <h1>Yota's Tacos: Offroading and Overland Equipment</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
