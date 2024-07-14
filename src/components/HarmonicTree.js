import React from 'react';
import '../styles/HarmonicTree.css';
<<<<<<< HEAD
import { getNoteFromFunction, determineOptimalSpelling } from '../utils/HarmonicUtils';
=======
>>>>>>> a650b36e5f5f6236c0fa2343331e4bbb299f64a4

const HarmonicTree = ({ chordAnalysis }) => {
    const harmonicLevels = ['1', '3', '5', '7', '9', '11', '13'];

    if (!chordAnalysis || !chordAnalysis.symbol) {
        return null;
    }

    const { symbol, functions, spelledNotes } = chordAnalysis;

    // Use determineOptimalSpelling to get the correct root note spelling
    const optimalRootNote = determineOptimalSpelling(rootNote, isMinor, isDiminished);

    return (
        <div className="harmonic-tree">
            <div className="chord-symbol">{symbol}</div>
            <div className="tree-container">
                {harmonicLevels.map((level, index) => {
                    const functionIndex = functions.findIndex(func =>
                        func.replace(/[♭♯]/, '') === level
                    );

<<<<<<< HEAD
                    const note = functionIndex !== -1
                        ? getNoteFromFunction(optimalRootNote, functions[functionIndex], isMinor, isDiminished)
                        : '';

=======
                    const note = functionIndex !== -1 ? spelledNotes[functionIndex] : '';
>>>>>>> a650b36e5f5f6236c0fa2343331e4bbb299f64a4
                    const harmonicFunction = functionIndex !== -1 ? functions[functionIndex] : '';

                    return (
                        <div key={level} className="tree-level" style={{ bottom: `${index * 14}%` }}>
                            <div className="level-label">{level}</div>
                            <div className="note-circle">
                                <div className={`level-note ${note ? 'filled' : ''}`}>
                                    {note && <span className="note">{note}</span>}
                                </div>
                            </div>
                            <div className="harmonic-function">{harmonicFunction}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HarmonicTree;