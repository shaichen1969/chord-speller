import React from 'react';
import '../styles/HarmonicTree.css';

const HarmonicTree = ({ chordAnalysis }) => {
    const harmonicLevels = ['1', '3', '5', '7', '9', '11', '13'];

    if (!chordAnalysis) {
        return (
            <div className="harmonic-tree">
                <div className="chord-symbol">Unstable Chord</div>
                <div className="tree-container">
                    <div className="unstable-message">No stable chord structure found.</div>
                </div>
            </div>
        );
    }

    const {
        chordSymbol,
        harmonicFunctionsFound = [],
        preferredSpellingNotes = '',
        root
    } = chordAnalysis;

    const notes = preferredSpellingNotes.split(', ');

    return (
        <div className="harmonic-tree">
            <div className="chord-symbol">{chordSymbol || 'Analyzing...'}</div>
            <div className="tree-container">
                {harmonicLevels.map((level, index) => {
                    const functionIndex = harmonicFunctionsFound.findIndex(func => {
                        const baseFunctionNumber = func.replace(/[♭♯]/, '');
                        return baseFunctionNumber === level ||
                            (level === '9' && baseFunctionNumber === '2') ||
                            (level === '11' && baseFunctionNumber === '4') ||
                            (level === '13' && baseFunctionNumber === '6');
                    });

                    const note = functionIndex !== -1 && notes.length > functionIndex ? notes[functionIndex] : '';
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