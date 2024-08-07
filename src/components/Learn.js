import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';  // Reuse the same styles as LandingPage

const Learn = () => {
    const learnModes = [
        { name: 'Triads', description: 'Learn how to build basic three-note chords.', path: '/play/learn/triad' },
        { name: '7th Chords', description: 'Learn how to build four-note seventh chords.', path: '/play/learn/seventh' },
        // Add more learning modes as needed
    ];

    return (
        <div className="landing-content">
            <h1 className="title">Learn Chord Building</h1>
            <p className="subtitle">Choose a topic to learn about chord construction</p>
            <div className="card-container">
                {learnModes.map((mode) => (
                    <Link to={mode.path} key={mode.name} className="card">
                        <h2>{mode.name}</h2>
                        <p>{mode.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Learn;