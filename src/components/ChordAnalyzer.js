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
    8: '♯5',
    9: '13',
    10: '7',
    11: '♭13',
};

const harmonicFunctionOrder = [
    '1', '♭3', '3', '♭5', '5', '♯5', '♭7', '7',
    '♭9', '9', '♯9', '11', '♯11', '♭13', '13'
];

const pitchOrder = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

const sortNotes = (notes) => {
    return notes.sort((a, b) => {
        const pitchA = a.slice(0, -1);
        const pitchB = b.slice(0, -1);
        return pitchOrder.indexOf(pitchA) - pitchOrder.indexOf(pitchB);
    });
};

const normalize = (arr) => {
    const base = arr[0];
    const normalized = arr.map(note => (note - base + 12) % 12);
    return normalized;
};

const handleSpecialCases = (functions) => {
    const set = new Set(functions);

    if (set.has('♭3') && set.has('3')) {
        functions = functions.map(f => (f === '♭3' ? '♯9' : f));
    }
    if (set.has('♭5') && set.has('5')) {
        functions = functions.map(f => (f === '♭5' ? '♯11' : f));
    }
    if (set.has('♯5') && !set.has('5')) {
        functions = functions.map(f => (f === '♯5' ? '♭13' : f));
    }

    return functions;
};

const getInversions = (chord) => {
    const inversions = [];
    for (let i = 0; i < chord.length; i++) {
        const rotated = chord.slice(i).concat(chord.slice(0, i));
        inversions.push(normalize(rotated));
    }
    return inversions;
};

const sortHarmonicFunctions = (functions) => {
    return functions.sort((a, b) => harmonicFunctionOrder.indexOf(a) - harmonicFunctionOrder.indexOf(b));
};

const ChordAnalyzer = ({ currentQuestion }) => {
    // Sort the currentQuestion based on pitch order
    const sortedCurrentQuestion = sortNotes(currentQuestion);

    const chord = sortedCurrentQuestion.map(note => {
        const pitch = note.slice(0, -1); // Remove octave number
        return noteToInt[pitch];
    });

    const inversions = getInversions(chord);

    const inversionsWithHarmonicFunctions = inversions.map(inversion => {
        let functions = inversion.map(noteInt => harmonicFunctionMap[noteInt]);
        functions = handleSpecialCases(functions);
        return sortHarmonicFunctions(functions).join(' ');
    });

    const inversionLabels = ["First Inversion", "Second Inversion", "Third Inversion", "Fourth Inversion"];

    return (
        <div>
            <p>Hello world. I'm a chord analyzer.</p>
            <p>Current question: {sortedCurrentQuestion.join(', ')}</p>
            <p>Chord as integers: {chord.join(' ')}</p>
            <div>
                {inversionsWithHarmonicFunctions.map((inversion, index) => (
                    <p key={index}>{inversionLabels[index] || `Inversion ${index + 1}`}: {inversion}</p>
                ))}
            </div>
        </div>
    );
};

export default ChordAnalyzer;
