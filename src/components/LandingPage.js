import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const questionModes = [
        { name: 'Triads', description: 'Learn how to build and identify basic three-note chords.', path: '/play/triad' },
        { name: '7th Chords', description: 'Practice recognizing and spelling four-note seventh chords.', path: '/play/seventh' },
        { name: 'Basic Tension', description: 'Learn how to identify triads with an added tension note.', path: '/play/triadPlusTension' },
        { name: 'Jazz Chords', description: 'Challenge yourself with complex jazz chord structures.', path: '/play/jazzChords' },
        { name: 'Random 3-Note Chords', description: 'Test your skills with random three-note combinations.', path: '/play/random3' },
        { name: 'Random 4-Note Chords', description: 'Identify random four-note chords for advanced practice.', path: '/play/random4' },
        { name: 'Random 5-Note Chords', description: 'Master complex harmony with random five-note chords.', path: '/play/random5' },
    ];

    return (
        <div className="landing-page">
            <h1 className="title">Chord Spelling Master</h1>
            <p className="subtitle">Choose your practice mode</p>
            <div className="card-container">
                {questionModes.map((mode) => (
                    <Link to={mode.path} key={mode.name} className="card">
                        <h2>{mode.name}</h2>
                        <p>{mode.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;