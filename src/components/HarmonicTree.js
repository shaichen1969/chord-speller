import React, { useState, useEffect } from 'react';
import '../styles/HarmonicTree.css';
import { convertHarmonicFunctionForDisplay } from '../utils/HarmonicUtils';
import { ChevronDown, ChevronUp } from 'lucide-react';

const HarmonicTree = ({ chordAnalysis, correctlyGuessedNotes }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const harmonicLevels = ['1', '3', '5', '7', '9', '11', '13'];

    useEffect(() => {
        console.log("Chord Analysis:", chordAnalysis);
        console.log("Correctly Guessed Notes:", correctlyGuessedNotes);
    }, [chordAnalysis, correctlyGuessedNotes]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    if (!chordAnalysis) {
        console.log("No chord analysis available");
        return (
            <div className={`harmonic-tree ${isExpanded ? 'expanded' : 'collapsed'}`}>
                {isExpanded && (
                    <>
                        <div className="chord-symbol">Unstable Chord</div>
                        <div className="tree-container">
                            <div className="unstable-message">No stable chord structure found.</div>
                        </div>
                    </>
                )}
                <button className="tree-toggle" onClick={toggleExpand}>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
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

    console.log("Chord Symbol:", chordSymbol);
    console.log("Harmonic Functions Found:", harmonicFunctionsFound);
    console.log("Preferred Spelling Notes:", notes);
    console.log("Root:", root);

    const normalizeNote = (note) => {
        return note.replace('♭', 'b').replace('♯', '#');
    };

    return (
        <div className={`harmonic-tree ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {isExpanded && (
                <>
                    <div className="chord-symbol">{chordSymbol || 'Analyzing...'}</div>
                    <div className="tree-container">
                        {harmonicLevels.map((level, index) => {
                            const functionIndex = harmonicFunctionsFound.findIndex(func => {
                                const baseFunctionNumber = func.replace(/[♭♯]/, '');
                                console.log(`Checking level ${level} against function ${func} (base: ${baseFunctionNumber})`);
                                switch (level) {
                                    case '1': return baseFunctionNumber === '1';
                                    case '3': return ['3', '♭3'].includes(func);
                                    case '5': return ['5', '♭5', '♯5'].includes(func);
                                    case '7': return ['7', '♭7', '♭♭7'].includes(func);
                                    case '9': return ['9', '♭9', '♯9', '2'].includes(func);
                                    case '11': return ['11', '♯11', '4'].includes(func);
                                    case '13': return ['13', '♭13', '6'].includes(func);
                                    default: return false;
                                }
                            });

                            const note = functionIndex !== -1 ? notes[functionIndex] : '';
                            const harmonicFunction = functionIndex !== -1 ? harmonicFunctionsFound[functionIndex] : '';
                            const isGuessed = correctlyGuessedNotes.some(guessedNote => 
                                normalizeNote(guessedNote) === normalizeNote(note)
                            );

                            console.log(`Level ${level}:`, {
                                functionIndex,
                                note,
                                harmonicFunction,
                                isGuessed,
                                correctlyGuessedNotes
                            });

                            return (
                                <div key={level} className="tree-level" style={{ bottom: `${index * 14}%` }}>
                                    <div className="level-label">{level}</div>
                                    <div className="note-circle">
                                        <div className={`level-note ${isGuessed ? 'filled' : ''}`}>
                                            {isGuessed && <span className="note">{note}</span>}
                                        </div>
                                    </div>
                                    <div className="harmonic-function">
                                        {convertHarmonicFunctionForDisplay(harmonicFunction)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            <button className="tree-toggle" onClick={toggleExpand}>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </button>
        </div>
    );
};

export default HarmonicTree;