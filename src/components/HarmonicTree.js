import React from 'react';
import '../styles/HarmonicTree.css';

const HarmonicTree = ({ chordAnalysis }) => {
    const harmonicLevels = ['1', '3', '5', '7', '9', '11', '13'];

    const getNoteFromFunction = (rootNote, func) => {
        const noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
        const sharpNoteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const flatNoteOrder = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

        const isSharp = rootNote.includes('#');
        const isFlat = rootNote.includes('b');
        const noteOrderToUse = isSharp ? sharpNoteOrder : (isFlat ? flatNoteOrder : noteOrder);

        const rootIndex = noteOrderToUse.indexOf(rootNote.replace(/\d+/, ''));
        let interval = 0;

        switch (func) {
            case '1': interval = 0; break;
            case '♭3': case '3': interval = func === '♭3' ? 3 : 4; break;
            case '5': case '♭5': case '♯5':
                interval = func === '♭5' ? 6 : (func === '♯5' ? 8 : 7);
                break;
            case '♭7': case '7': interval = func === '♭7' ? 10 : 11; break;
            case '9': case '♭9': case '♯9':
                interval = func === '♭9' ? 1 : (func === '♯9' ? 3 : 2);
                break;
            case '11': case '♯11': interval = func === '♯11' ? 6 : 5; break;
            case '13': case '♭13': interval = func === '♭13' ? 8 : 9; break;
            default: return '';
        }

        return noteOrderToUse[(rootIndex + interval) % 12];
    };

    return (
        <div className="harmonic-tree">
            <h3 className="title is-5">Harmonic Tree</h3>
            <div className="tree-container">
                {harmonicLevels.map((level, index) => {
                    const functionIndex = chordAnalysis.functions.indexOf(level);
                    const note = functionIndex !== -1
                        ? getNoteFromFunction(chordAnalysis.notes[0], level)
                        : '';

                    return (
                        <div key={level} className="tree-level" style={{ bottom: `${index * 14}%` }}>
                            <div className="level-label">{level}</div>
                            <div className={`level-note ${note ? 'filled' : ''}`}>
                                {note && <span className="note">{note}</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HarmonicTree;