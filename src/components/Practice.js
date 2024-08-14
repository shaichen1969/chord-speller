import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Practice.css';

const Practice = () => {
    const practiceModes = [
        { name: 'Triads', description: 'Practice identifying basic three-note chords.', path: '/play/practice/triad' },
        { name: '7th Chords', description: 'Practice recognizing four-note seventh chords.', path: '/play/practice/seventh' },
        { name: 'Basic Tension', description: 'Practice identifying triads with an added tension note.', path: '/play/practice/triadPlusTension' },
        { name: 'Jazz Chords', description: 'Challenge yourself with complex jazz chord structures.', path: '/play/practice/jazzChords' },
        { name: 'Random 3-Note Chords', description: 'Test your skills with random three-note combinations.', path: '/play/practice/random3' },
        { name: 'Random 4-Note Chords', description: 'Identify random four-note chords for advanced practice.', path: '/play/practice/random4' },
        { name: 'Random 5-Note Chords', description: 'Master complex harmony with random five-note chords.', path: '/play/practice/random5' },
        { name: 'The Major Scale', description: 'Learn how to construct a major scale in 12 keys', path: '/play/practice/majorScales' },
    ];

    return (
        <div className="practice-page">
            <h1 className="practice-title">Practice Chord Identification</h1>
            <p className="practice-subtitle">Choose your practice mode (No time limit)</p>
            <div className="practice-card-container">
                {practiceModes.map((mode) => (
                    <Link to={mode.path} key={mode.name} className="practice-card">
                        <h2 className="practice-card-title">{mode.name}</h2>
                        <p className="practice-card-description">{mode.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Practice;