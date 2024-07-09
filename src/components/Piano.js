import React, { useState } from 'react';
import { usePiano } from '../PianoContext';
import '../styles/Piano.css';

const Piano = ({ feedback, gameState, currentQuestion, onGuess }) => {
    const { playNote } = usePiano();
    const [activeKey, setActiveKey] = useState(null);
    const notes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'];

    const handleKeyClick = (note) => {
        if (gameState !== 'playing' || feedback[note]) return;

        playNote(note);
        setActiveKey(note);
        setTimeout(() => setActiveKey(null), 200);

        if (onGuess) {
            onGuess(note);
        }
    };

    return (
        <div className="piano-container">
            <div className="piano">
                {notes.map((note, index) => (
                    <div
                        key={index}
                        className={`key ${note.includes('b') ? 'black' : 'white'} ${activeKey === note ? 'active' : ''} ${feedback[note] || ''}`}
                        onClick={() => handleKeyClick(note)}
                    >
                        {feedback[note] === 'correct' && <span className="checkmark">✓</span>}
                        {feedback[note] === 'incorrect' && <span className="cross">✗</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Piano;