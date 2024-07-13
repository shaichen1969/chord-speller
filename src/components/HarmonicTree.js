import React from 'react';
import '../styles/HarmonicTree.css';
import { getNoteFromFunction } from '../utils/HarmonicUtils';

const HarmonicTree = ({ chordAnalysis }) => {
    const harmonicLevels = ['1', '3', '5', '7', '9', '11', '13'];

    if (!chordAnalysis || !chordAnalysis.symbol) {
        return null;
    }

    const { symbol, functions } = chordAnalysis;
    const rootNote = symbol.split(/[^A-G#b]/)[0];
    const isMinor = symbol.includes('m') && !symbol.includes('maj');

    return (
        <div className="harmonic-tree">
            <div className="chord-symbol">{symbol}</div>
            <div className="tree-container">
                {harmonicLevels.map((level, index) => {
                    const functionIndex = functions.findIndex(func =>
                        func.replace(/[♭♯]/, '') === level
                    );

                    const note = functionIndex !== -1
                        ? getNoteFromFunction(rootNote, functions[functionIndex], isMinor)
                        : '';

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
