import React from 'react';
import '../styles/Piano.css';

const Piano = ({ feedback, gameState, currentQuestion, onGuess, pianoSound, playNote }) => {
    const notes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'];

    const handleKeyClick = (note) => {
        if (pianoSound) {
            playNote(note);
        }

        if (gameState === 'playing' && onGuess && !feedback[note]) {
            onGuess(note);
        }
    };

    return (
        <div className="piano-container">
            <div className="piano">
                {notes.map((note, index) => (
                    <div
                        key={note}
                        className={`key ${note.includes('b') ? 'black' : 'white'}`}
                        onClick={() => handleKeyClick(note)}
                    >
                        <div className="key-content">
                            {feedback[note] && (
                                <span className={`feedback-indicator ${feedback[note]}`}>
                                    {feedback[note] === 'correct' ? '✓' : '✗'}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Piano;