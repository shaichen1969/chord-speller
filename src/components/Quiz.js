import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Quiz.css';

const Quiz = () => {
    const quizModes = [
        { name: 'Triads', description: 'Test your knowledge of basic three-note chords.', path: '/play/quiz/triad' },
        { name: '7th Chords', description: 'Quiz yourself on four-note seventh chords.', path: '/play/quiz/seventh' },
        { name: 'Basic Tension', description: 'Quiz on triads with an added tension note.', path: '/play/quiz/triadPlusTension' },
        { name: 'Jazz Chords', description: 'Challenge yourself with complex jazz chord structures.', path: '/play/quiz/jazzChords' },
        { name: 'Random 3-Note Chords', description: 'Practice spelling random three-note chords.', path: '/play/quiz/random3' },
        { name: 'Random 4-Note Chords', description: 'Practice spelling random four-note chords.', path: '/play/quiz/random4' },
        { name: 'Random 5-Note Chords', description: 'Practice spelling random five-note chords.', path: '/play/quiz/random5' },
        { name: 'Major Scales', description: 'Practice identifying notes in major scales.', path: '/play/quiz/majorScale' },
    ];

    return (
        <div className="quiz-page">
            <h1 className="quiz-title">Chord Spelling Quiz</h1>
            <p className="quiz-subtitle">Choose your quiz mode (Time limited)</p>
            <div className="quiz-card-container">
                {quizModes.map((mode) => (
                    <Link to={mode.path} key={mode.name} className="quiz-card">
                        <h2 className="quiz-card-title">{mode.name}</h2>
                        <p className="quiz-card-description">{mode.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Quiz;