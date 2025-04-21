import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCarSide, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import poqLogo from '../assets/poq.png';

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">

            <Link to="/" className="logo-img-link">
                <img src={poqLogo} alt="Poq logo" className="logo-img" />
            </Link>

            <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                    <Link to="/cars">Cars</Link>
                    <Link to="/about">About</Link>
                    <Link to="/login" className="btn login-btn">
                        <FaSignInAlt /> Login
                    </Link>
                    <Link to="/register" className="btn register-btn">
                        <FaUserPlus /> Register
                    </Link>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>
        </nav>
    );
}


