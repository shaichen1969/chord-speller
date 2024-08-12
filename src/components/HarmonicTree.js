import React from 'react';
import '../styles/HarmonicTree.css';

const HarmonicTree = ({ chordAnalysis, correctlyGuessedNotes }) => {
    const {
        chordSymbol,
        harmonicFunctionsFound = [],
        preferredSpellingNotes = '',
        forcedRoot
    } = chordAnalysis;

    const notes = preferredSpellingNotes.split(', ');

    let treeLevels;
    if (forcedRoot) {  // This indicates it's a major scale
        treeLevels = ['13', '11', '9', '7', '5', '3', '1'].map((level, index) => {
            const scaleLevel = 7 - index;
            return {
                level: scaleLevel.toString(),
                note: notes[scaleLevel - 1] || '',
                isGuessed: correctlyGuessedNotes.includes(scaleLevel.toString())
            };
        });
    } else {
        treeLevels = ['13', '11', '9', '7', '5', '3', '1']
            .map(level => {
                if (level === '7' && !harmonicFunctionsFound.includes('7') && harmonicFunctionsFound.includes('6')) {
                    return '6';
                }
                return level;
            })
            .filter(level => harmonicFunctionsFound.some(f => f.replace(/[♭♯]/, '') === level))
            .map((level) => {
                const func = harmonicFunctionsFound.find(f => f.replace(/[♭♯]/, '') === level) || '';
                const note = notes[harmonicFunctionsFound.indexOf(func)] || '';
                const isGuessed = correctlyGuessedNotes.includes(func);

                return {
                    level,
                    note,
                    isGuessed
                };
            });
    }

    return (
        <div className="harmonic-tree">
            <div className="chord-symbol">{chordSymbol}</div>
            <div className="tree-levels">
                {treeLevels.map(({ level, note, isGuessed }) => (
                    <div key={level} className={`tree-level ${isGuessed ? 'guessed' : ''}`}>
                        <div className="level-circle">{level}</div>
                        <div className="note-circle" style={{ backgroundColor: isGuessed ? 'green' : 'transparent' }}>
                            {isGuessed ? note : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HarmonicTree;