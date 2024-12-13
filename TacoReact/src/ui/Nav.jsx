import React from "react";
import './nav.css';
import { Link } from 'react-router-dom';

function NavBar({isLoggedIn}) {

    return (
        <nav className="navbar sticky-top">
            <div className="container">
            <a className="navbar-brand" href="/">Yota's Tacos: Offroading and Overland Equipment</a>
                <ul>
                    <li><Link to="/"><i class="bi bi-house"/> Home</Link></li>
                    <li><Link to="/cart"><i class="bi bi-cart"/>
                    {/*<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light">{}</span>*/} Cart</Link></li>
                    <li><Link to="/login"><i class="bi bi-box-arrow-in-right"/> Login</Link></li>           
                    <li><Link to="/logout"><i class="bi bi-box-arrow-right"/> Logout</Link></li>
                    <li><Link to="/signup"><i class="bi bi-box-arrow-in-down"/> Sign-Up</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
