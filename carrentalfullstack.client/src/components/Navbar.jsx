import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import './Navbar.css';
import poqLogo from '../assets/poq.png';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo-img-link">
                <img src={poqLogo} alt="Poq logo" className="logo-img" />
            </Link>

            <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>

                {user ? (
                    <>
                        <Link to="/account">
                            <FaUserAlt /> {user.username}
                        </Link>
                        <Link to="/book">Cars</Link>
                        <Link to="/active-rentals">My rentals</Link>
                        <button onClick={handleLogout} className="btn logout-btn">
                            <FaSignOutAlt /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/cars">
                            Cars
                        </Link>
                        <Link to="/about">
                            About
                        </Link>
                        <Link to="/login" className="btn login-btn">
                            <FaSignInAlt /> Login
                        </Link>
                        <Link to="/register" className="btn register-btn">
                            <FaUserPlus /> Register
                        </Link>
                    </>
                )}
            </div>

            <div className="hamburger" onClick={toggleMenu}>
                {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>
        </nav>
    );
}
