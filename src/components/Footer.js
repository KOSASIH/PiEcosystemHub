// src/components/Footer.js

import React from 'react';
import './Footer.css'; // Import CSS for styling

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Pi Ecosystem Integration Hub. All rights reserved.</p>
            <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
