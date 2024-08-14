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
        treeLevels = ['1', '2', '3', '4', '5', '6', '7'].map((level, index) => {
            return {
                level,
                note: notes[index] || '',
                isGuessed: correctlyGuessedNotes.includes(level)
            };
        });
    } else {
        treeLevels = ['1', '3', '5', '7', '9', '11', '13']
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
            <div className="tree-container">
                <div className="tree-levels">
                    {treeLevels.map(({ level, note, isGuessed }, index) => (
                        <div key={level} className={`tree-level ${isGuessed ? 'guessed' : ''}`} style={{order: treeLevels.length - index}}>
                            <div className="level-circle">{level}</div>
                            <div className="note-circle" style={{ backgroundColor: isGuessed ? 'green' : 'transparent' }}>
                                {isGuessed ? note : ''}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HarmonicTree;