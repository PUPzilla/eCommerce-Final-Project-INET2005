import React from "react";
import './Nav.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <div>Yota's Tacos: Offroading and Overland Equipment</div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
