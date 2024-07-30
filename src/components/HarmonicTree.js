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

    const treeLevels = ['13', '11', '9', '7', '5', '3', '1']
        .filter(level => harmonicFunctionsFound.some(f => f.replace(/[♭♯]/, '') === level))
        .map((level) => {
            const func = harmonicFunctionsFound.find(f => f.replace(/[♭♯]/, '') === level) || '';
            const note = notes[harmonicFunctionsFound.indexOf(func)] || '';
            const isGuessed = correctlyGuessedNotes.some(guessedNote => 
                normalizeNote(guessedNote) === normalizeNote(note)
            );

            return {
                level,
                note,
                isGuessed
            };
        });

    return (
        <div className="harmonic-tree">
            <div className="chord-symbol">{chordSymbol}</div>
            <div className="tree-container">
                {treeLevels.map(({ level, note, isGuessed }, index) => (
                    <div key={index} className="tree-level">
                        <div className="level-label">{level}</div>
                        <div className="note-circle">
                            <div className={`level-note ${isGuessed ? 'filled' : ''}`}>
                                {isGuessed ? note : ''}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HarmonicTree;