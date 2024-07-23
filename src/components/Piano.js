import React, { useEffect, useRef } from 'react';
import '../styles/Piano.css';

const Piano = ({ feedback, gameState, currentQuestion, onGuess, pianoSound, playNote, showCheckmark }) => {
    const notes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'];
    const pianoRef = useRef(null);

    useEffect(() => {
        if (pianoRef.current) {
            pianoRef.current.style.opacity = '1';
        }
    }, [gameState]);

    const handleKeyClick = (note) => {
        if (gameState === 'playing') {
            if (pianoSound) {
                playNote(note);
            }

            if (onGuess && !feedback[note]) {
                onGuess(note);
            }
        }
    };

    return (
        <div className={`piano-container ${gameState !== 'playing' ? 'disabled' : ''}`}>
            <div className="piano" ref={pianoRef}>
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
            {showCheckmark && (
                <div className="big-checkmark-overlay">
                    <span className="big-checkmark">✓</span>
                </div>
            )}
        </div>
    );
};

export default Piano;