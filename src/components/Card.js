// src/components/Card.js

import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'; // Import CSS for styling

const Card = ({ dApp }) => {
    return (
        <div className="card">
            <h2>{dApp.name}</h2>
            <p>{dApp.description}</p>
            <a href={dApp.url} target="_blank" rel="noopener noreferrer" className="card-button">Visit dApp</a>
        </div>
    );
};

Card.propTypes = {
    dApp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
};

export default Card;
