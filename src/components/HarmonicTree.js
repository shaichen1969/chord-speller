import React from 'react';
import '../styles/HarmonicTree.css';

const HarmonicTree = ({ chordAnalysis, correctlyGuessedNotes }) => {
    if (!chordAnalysis || !chordAnalysis.spelledChord) {
        return (
            <div className="harmonic-tree">
                <div className="chord-symbol">Invalid Chord</div>
            </div>
        );
    }

    const {
        chordSymbol,
        harmonicFunctionsFound = [],
        preferredSpellingNotes = '',
    } = chordAnalysis;

    const notes = preferredSpellingNotes.split(', ');

    const normalizeNote = (note) => {
        return note.replace('♭', 'b').replace('♯', '#');
    };

    const treeLevels = ['1', '3', '5', '7', '9', '11', '13'].map((level, index) => {
        const func = harmonicFunctionsFound.find(f => f.replace(/[♭♯]/, '') === level) || '';
        const note = notes[harmonicFunctionsFound.indexOf(func)] || '';
        const isGuessed = correctlyGuessedNotes.some(guessedNote => 
            normalizeNote(guessedNote) === normalizeNote(note)
        );

        return {
            level,
            note,
            harmonicFunction: func,
            isGuessed
        };
    });

    return (
        <div className="harmonic-tree">
            <div className="tree-container">
                {treeLevels.map(({ level, note, harmonicFunction, isGuessed }, index) => (
                    <div key={index} className="tree-level">
                        <div className="level-label">{level}</div>
                        <div className="note-circle">
                            <div className={`level-note ${isGuessed ? 'filled' : ''}`}>
                                <span className="note">{isGuessed ? note : ''}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chord-symbol">{chordSymbol}</div>
        </div>
    );
};

export default HarmonicTree;