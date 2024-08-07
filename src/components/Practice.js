import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';  // Reuse the same styles as LandingPage

const Practice = () => {
    const practiceModes = [
        { name: 'Triads', description: 'Practice identifying basic three-note chords.', path: '/play/practice/triad' },
        { name: '7th Chords', description: 'Practice recognizing four-note seventh chords.', path: '/play/practice/seventh' },
        { name: 'Basic Tension', description: 'Practice identifying triads with an added tension note.', path: '/play/practice/triadPlusTension' },
        { name: 'Jazz Chords', description: 'Challenge yourself with complex jazz chord structures.', path: '/play/practice/jazzChords' },
        { name: 'Random 3-Note Chords', description: 'Test your skills with random three-note combinations.', path: '/play/practice/random3' },
        { name: 'Random 4-Note Chords', description: 'Identify random four-note chords for advanced practice.', path: '/play/practice/random4' },
        { name: 'Random 5-Note Chords', description: 'Master complex harmony with random five-note chords.', path: '/play/practice/random5' },
    ];

    return (
        <div className="landing-content">
            <h1 className="title">Practice Chord Identification</h1>
            <p className="subtitle">Choose your practice mode (No time limit)</p>
            <div className="card-container">
                {practiceModes.map((mode) => (
                    <Link to={mode.path} key={mode.name} className="card">
                        <h2>{mode.name}</h2>
                        <p>{mode.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Practice;