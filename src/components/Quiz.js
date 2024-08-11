import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';  // Reuse the same styles as LandingPage

const Quiz = () => {
    const quizModes = [
        { name: 'Triads', description: 'Test your knowledge of basic three-note chords.', path: '/play/quiz/triad' },
        { name: '7th Chords', description: 'Quiz yourself on four-note seventh chords.', path: '/play/quiz/seventh' },
        { name: 'Basic Tension', description: 'Quiz on triads with an added tension note.', path: '/play/quiz/triadPlusTension' },
        { name: 'Jazz Chords', description: 'Challenge yourself with complex jazz chord structures.', path: '/play/quiz/jazzChords' },
        { name: 'Random 3-Note Chords', description: 'Test your skills with random three-note combinations.', path: '/play/quiz/random3' },
        { name: 'Random 4-Note Chords', description: 'Identify random four-note chords in quiz mode.', path: '/play/quiz/random4' },
        { name: 'Random 5-Note Chords', description: 'Master complex harmony with random five-note chords.', path: '/play/quiz/random5' },
        { name: 'Major Scales', description: 'Practice identifying notes in major scales.', path: '/play/quiz/majorScale' },
    ];

    return (
        <div className="landing-content">
            <h1 className="title">Chord Spelling Quiz</h1>
            <p className="subtitle">Choose your quiz mode (Time limited)</p>
            <div className="card-container">
                {quizModes.map((mode) => (
                    <Link to={mode.path} key={mode.name} className="card">
                        <h2>{mode.name}</h2>
                        <p>{mode.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Quiz;