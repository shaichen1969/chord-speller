import React from 'react';
import '../styles/HarmonicTree.css';
import { analyzeChord } from '../utils/ChordAnalyzerUtils';

const HarmonicTree = ({ currentQuestion }) => {
    const harmonicLevels = ['1', '3', '5', '7', '9', '11', '13'];

    const analyzedChord = analyzeChord(currentQuestion);

    if (!analyzedChord || !analyzedChord.chordSymbol) {
        return null;
    }

    const { chordSymbol, harmonicFunctionsFound, spelledChord, enharmonicSpelledChord, root, altRoot, notes } = analyzedChord;

    return (
        <div className="harmonic-tree">
            <div className="chord-symbol">{chordSymbol}</div>
            <div className="tree-container">
                {harmonicLevels.map((level, index) => {
                    const functionIndex = harmonicFunctionsFound.findIndex(func =>
                        func.replace(/[♭♯]/, '') === level
                    );

                    const note = functionIndex !== -1
                        ? notes[functionIndex]
                        : '';

                    const harmonicFunction = functionIndex !== -1 ? harmonicFunctionsFound[functionIndex] : '';

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
