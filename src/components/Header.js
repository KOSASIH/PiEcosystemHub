// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css'; // Import CSS for styling

const Header = ({ title }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dapps">dApps</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
