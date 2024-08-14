import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Learn.css';

const Learn = () => {
    const learnModes = [
        { name: 'Triads', description: 'Learn how to build basic three-note chords.', path: '/learn/triads' },
        { name: '7th Chords', description: 'Learn how to build four-note seventh chords.', path: '/learn/seventh-chords' },
        // Add more learning modes as needed
    ];

    return (
        <div className="learn-page">
            <h1 className="learn-title">Learn Chord Building</h1>
            <p className="learn-subtitle">Choose a topic to learn about chord construction</p>
            <div className="learn-card-container">
                {learnModes.map((mode) => (
                    <Link to={mode.path} key={mode.name} className="learn-card">
                        <h2 className="learn-card-title">{mode.name}</h2>
                        <p className="learn-card-description">{mode.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Learn;