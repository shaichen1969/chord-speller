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

const intToNote = {
    0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E',
    5: 'F', 6: 'F#', 7: 'G', 8: 'G#', 9: 'A',
    10: 'A#', 11: 'B',
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
    10: '♭7',
    11: '7',
    '♭13': '♭13'
};

const harmonicFunctionOrder = [
    '1', '♭3', '3', '♭5', '5', '♯5', '♭7', '7', '♭9', '9', '♯9', '11', '♯11', '13', '♭13'
];

const harmonicFunctionScores = {
    '1': 0,
    '♭3': 3,
    '3': 3,
    '5': 5,
    '♭7': 7,
    '7': 7,
    '♭9': 9,
    '9': 9,
    '♯9': 9,
    '11': 11,
    '♯11': 11,
    '13': 13,
    '♭5': 5,
    '♯5': 5,
    '♭13': 13
};

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

const handleSpecialCases = (functions, rootNoteInt) => {
    const set = new Set(functions);

    if (set.has('♭3') && set.has('3')) {
        functions = functions.map(f => (f === '♭3' ? '♯9' : f));
    }
    if (set.has('♭5') && set.has('5')) {
        functions = functions.map(f => (f === '♭5' ? '♯11' : f));
    }
    if (set.has('♯5') && set.has('5')) {
        functions = functions.map(f => (f === '♯5' ? '♭13' : f));
    }
    if (set.has('♭5') && set.has('♯5')) {
        functions = functions.map(f => (f === '♯5' ? '♭13' : f));
    }
    if (set.has('6') && (rootNoteInt === 5 || rootNoteInt === 11)) {
        functions = functions.map(f => (f === '6' ? '♭13' : f));
    }

    return functions;
};

const isValidInversion = (functions) => {
    const set = new Set(functions);
    return !(
        (set.has('♭9') && set.has('9')) ||
        (set.has('9') && set.has('♯9')) ||
        (set.has('♭7') && set.has('7')) ||
        (set.has('11') && set.has('♯11')) ||
        (set.has('♭13') && set.has('13')) ||
        (set.has('1') && set.has('♭3') && set.has('♯5'))
    );
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
    return harmonicFunctionOrder.filter(func => functions.includes(func));
};

const calculateInversionScore = (functions) => {
    return functions.reduce((acc, func) => acc + (harmonicFunctionScores[func] || 0), 0);
};

const findMostStableChord = (inversionsWithHarmonicFunctions) => {
    let minScore = Infinity;
    let mostStableInversion = null;
    let mostStableIndex = -1;

    inversionsWithHarmonicFunctions.forEach(({ inversion, score, index, functions }) => {
        if (score < minScore) {
            minScore = score;
            mostStableInversion = functions;
            mostStableIndex = index;
        }
    });

    return { mostStableInversion, mostStableIndex };
};

const adjustRootNote = (rootNote, isMinor) => {
    const majorRootNoteMap = {
        'C#': 'Db',
        'D#': 'Eb',
        'F#': 'F#',
        'G#': 'Ab',
        'A#': 'Bb'
    };

    const minorRootNoteMap = {
        'C#': 'C#',
        'D#': 'Eb',
        'F#': 'F#',
        'G#': 'G#',
        'A#': 'Bb'
    };

    if (isMinor) {
        return minorRootNoteMap[rootNote] || rootNote;
    } else {
        return majorRootNoteMap[rootNote] || rootNote;
    }
};

const buildChordSymbol = (rootNote, harmonicFunctions) => {
    const isMinor = harmonicFunctions.includes('♭3');
    const isDiminished = harmonicFunctions.includes('♭3') && harmonicFunctions.includes('♭5');
    const isAugmented = harmonicFunctions.includes('3') && harmonicFunctions.includes('♯5');
    rootNote = adjustRootNote(rootNote, isMinor);
    let symbol = rootNote;

    if (isDiminished) {
        symbol += '°';
    } else if (isAugmented) {
        symbol += '+';
    } else if (isMinor) {
        symbol += 'm';
    }

    // Always include altered fifths
    if (harmonicFunctions.includes('♭5') && !isDiminished) {
        symbol += '♭5';
    } else if (harmonicFunctions.includes('♯5') && !isAugmented) {
        symbol += '♯5';
    }

    const extensions = ['7', '9', '11', '13'].filter(ext =>
        harmonicFunctions.includes(ext) ||
        harmonicFunctions.includes(`♭${ext}`) ||
        harmonicFunctions.includes(`♯${ext}`)
    );

    extensions.forEach(ext => {
        const type = harmonicFunctions.find(func => func.includes(ext));
        if (type === '7') {
            symbol += 'Δ7'; // Use triangle 7 for major 7th
        } else if (type === '♭7') {
            symbol += '7'; // Use plain 7 for minor 7th
        } else if (type !== '5') { // Exclude 5 as it's handled separately
            symbol += type;
        }
    });

    // Check for missing overtones
    const highestOvertone = harmonicFunctionOrder.findLast(func => harmonicFunctions.includes(func));
    const missingOvertones = new Set();

    const checkMissingOvertone = (base, flats, sharps) => {
        const allMissing = [base, ...flats, ...sharps].every(func => !harmonicFunctions.includes(func));
        if (allMissing) missingOvertones.add(base);
    };

    const overtonesToCheck = ['3', '5', '7', '9', '11', '13'];
    for (const overtone of overtonesToCheck) {
        if (harmonicFunctionOrder.indexOf(overtone) >= harmonicFunctionOrder.indexOf(highestOvertone)) {
            break;
        }
        switch (overtone) {
            case '3':
                checkMissingOvertone('3', ['♭3'], []);
                break;
            case '5':
                checkMissingOvertone('5', ['♭5'], ['♯5']);
                break;
            case '7':
                checkMissingOvertone('7', ['♭7'], []);
                break;
            case '9':
                checkMissingOvertone('9', ['♭9'], ['♯9']);
                break;
            case '11':
                checkMissingOvertone('11', [], ['♯11']);
                break;
            case '13':
                checkMissingOvertone('13', ['♭13'], []);
                break;
        }
    }

    if (missingOvertones.size > 0) {
        symbol += ' no ' + Array.from(missingOvertones).join(' ');
    }

    return symbol;
};

const ChordAnalyzer = ({ currentQuestion }) => {
    const sortedCurrentQuestion = sortNotes(currentQuestion);

    const chord = sortedCurrentQuestion.map(note => {
        const pitch = note.slice(0, -1); // Remove octave number
        return noteToInt[pitch];
    });

    const inversions = getInversions(chord);

    const inversionsWithHarmonicFunctions = inversions.map((inversion, index) => {
        let functions = inversion.map(noteInt => harmonicFunctionMap[noteInt]);
        functions = handleSpecialCases(functions, inversion[0]); // Handle special cases with root note context
        if (!isValidInversion(functions)) {
            return null;
        }
        const sortedFunctions = sortHarmonicFunctions(functions);
        const score = calculateInversionScore(sortedFunctions);
        return { inversion: sortedFunctions.join(' '), score, index, functions };
    }).filter(Boolean);

    if (inversionsWithHarmonicFunctions.length === 0) {
        return (
            <div>
                <p>Hello world. I'm a chord analyzer.</p>
                <p>Current question: {sortedCurrentQuestion.join(', ')}</p>
                <p>No stable chords found.</p>
            </div>
        );
    }

    const { mostStableInversion, mostStableIndex } = findMostStableChord(inversionsWithHarmonicFunctions);
    const mostStableRoot = intToNote[chord[mostStableIndex]];

    // Sort the winning inversion's functions
    const sortedWinningFunctions = sortHarmonicFunctions(mostStableInversion);

    // Build the chord symbol
    const chordSymbol = buildChordSymbol(mostStableRoot, sortedWinningFunctions);

    return (
        <div>
            <p>Hello world. I'm a chord analyzer.</p>
            <p>Current question: {sortedCurrentQuestion.map(question => question.replace(/\d/g, '')).join(', ')}</p>
            <div>
                {inversionsWithHarmonicFunctions.map(({ inversion, index }) => (
                    <p key={index}>When {intToNote[chord[index]]} is the root, the harmonic functions are: {inversion}</p>
                ))}
            </div>
            <div>
                <p>Strongest root is: {mostStableRoot}</p>
                <p>Harmonic functions found are: {sortedWinningFunctions.join(' ')}</p>
                <p>Chord symbol: {chordSymbol}</p>
            </div>
        </div>
    );
};

export default ChordAnalyzer;