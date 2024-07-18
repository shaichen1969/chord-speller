import React from 'react';
import '../styles/HarmonicTree.css';

const HarmonicTree = ({ chordAnalysis }) => {
    const harmonicLevels = ['1', '3', '5', '7', '9', '11', '13'];

    console.log("Received chord analysis in HarmonicTree:", chordAnalysis);

    if (!chordAnalysis || !chordAnalysis.chordSymbol) {
        console.log("No valid chord analysis in HarmonicTree");
        return (
            <div className="harmonic-tree">
                <p>No valid chord analysis available</p>
            </div>
        );
    }

    const { chordSymbol, harmonicFunctionsFound, preferredSpellingNotes } = chordAnalysis;
    const preferredSpellingNotesArray = preferredSpellingNotes.split(', ');

    return (
        <div className="harmonic-tree">
            <div className="chord-symbol">{chordSymbol}</div>
            <div className="tree-container">
                {harmonicLevels.map((level, index) => {
                    const functionIndex = harmonicFunctionsFound.findIndex(func =>
                        func.replace(/[♭♯]/, '') === level
                    );

                    const note = functionIndex !== -1
                        ? preferredSpellingNotesArray[functionIndex]
                        : '';

                    const harmonicFunction = functionIndex !== -1 ? harmonicFunctionsFound[functionIndex] : '';

                    console.log(`Level ${level}: Note ${note}, Function ${harmonicFunction}`);

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
