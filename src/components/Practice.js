import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Practice.css';

const Practice = () => {
    const practiceModes = [
        { name: 'The Major Scale', description: 'Learn how to construct a major scale in 12 keys', path: '/play/practice/majorScale' },
        { name: 'Triads', description: 'Practice constructing basic three-note chords.', path: '/play/practice/triad' },
        { name: '7th Chords', description: 'Practice constructing four-note seventh chords.', path: '/play/practice/seventh' },
        { name: 'Basic Tension', description: 'Practice constructing triads with an added tension note.', path: '/play/practice/triadPlusTension' },
        { name: 'Jazz Chords', description: 'Challenge yourself with constructing complex jazz chord structures.', path: '/play/practice/jazzChords' },
        { name: 'Random 4-Note Chords', description: 'Practice constructing random four-note chords.', path: '/play/practice/random4' },
        { name: 'Random 5-Note Chords', description: 'Practice constructing random five-note chords.', path: '/play/practice/random5' }
       
    ];

    return (
        <div className="practice-page">
            <h1 className="practice-title">Practice Chord Construction</h1>
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