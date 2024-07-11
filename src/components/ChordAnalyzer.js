import React from 'react';

const noteToInt = {
    'C': 0, 'C#': 1, 'Db': 1,
    'D': 2, 'D#': 3, 'Eb': 3,
    'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6,
    'G': 7, 'G#': 8, 'Ab': 8,
    'A': 9, 'A#': 10, 'Bb': 10,
    'B': 11,
};

const harmonicFunctionMap = {
    0: '1',
    1: '♭9',
    2: '9',
    3: '♭3',
    4: '3',
    5: '11',
    6: '♭5',
    7: '5',
    8: '♭13',
    9: '13',
    10: '♭7',
    11: '7',
};

const normalize = (arr) => {
    const base = arr[0];
    const normalized = arr.map(note => (note - base + 12) % 12);
    normalized.sort((a, b) => a - b); // Sort the normalized array
    return normalized;
};

const getInversions = (chord) => {
    const inversions = [];
    for (let i = 0; i < chord.length; i++) {
        const rotated = chord.slice(i).concat(chord.slice(0, i));
        inversions.push(normalize(rotated));
    }
    return inversions;
};

const ChordAnalyzer = ({ currentQuestion }) => {
    const chord = currentQuestion.map(note => {
        const pitch = note.slice(0, -1); // Remove octave number
        return noteToInt[pitch];
    });

    const inversions = getInversions(chord);

    const inversionsWithHarmonicFunctions = inversions.map(inversion =>
        inversion.map(noteInt => harmonicFunctionMap[noteInt]).join(' ')
    );

    return (
        <div>
            <p>Hello world. I'm a chord analyzer.</p>
            <p>Current question: {currentQuestion.join(', ')}</p>
            <p>Chord as integers: {chord.join(' ')}</p>
            <div>
                {inversionsWithHarmonicFunctions.map((inversion, index) => (
                    <p key={index}>Inversion {index + 1}: {inversion}</p>
                ))}
            </div>
        </div>
    );
};

export default ChordAnalyzer;
