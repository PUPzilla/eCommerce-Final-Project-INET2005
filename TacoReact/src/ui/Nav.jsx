import React from "react";
import { Link } from 'react-router-dom';
import './index.css';


const NavBar = () => {
    return(
        <nav style={styles.nav}>
            <div style={styles.logo}>LOGO</div>
            <ul style ={styles.navLinks}>
                <li>
                    <a  href="/" style={styles.link}>Home</a>
                </li>
            </ul>
            
        </nav>
    )
}