import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Learn.css';

const Learn = () => {
    const learnModes = [
        { name: 'Constructing Major Scales', description: 'Learn how to construct major scales using the circle of fifths.', path: '/learn/MajorScales' },
        { name: 'Constructing Triads', description: 'Learn how to construvt basic three-note chords.', path: '/learn/Triads' },
        { name: 'Constructing 7th Chords', description: 'Learn how to build four-note seventh chords.', path: '/learn/SeventhChord' },
        { name: 'How to Add Tensions to Chords', description: 'Learn how to add tensions to create more complex and colorful harmonies.', path: '/learn/Tensions' },
        // Add more learning modes as needed
    ];

    return (
        <div className="learn-page">
            <h1 className="learn-title">Learn Chord construction</h1>
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