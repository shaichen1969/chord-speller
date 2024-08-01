// src/components/HarmonicUtils.js
const noteMap = {
    0: 'C', 1: 'C♯', 2: 'D', 3: 'D♯', 4: 'E', 5: 'F',
    6: 'F♯', 7: 'G', 8: 'G♯', 9: 'A', 10: 'A♯', 11: 'B'
};

const majorScales = {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'C♯': ['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯'],
    'D♭': ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C'],
    'D': ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'],
    'D♯': ['D♯', 'E♯', 'F♯♯', 'G♯', 'A♯', 'B♯', 'C♯♯'],
    'E♭': ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D'],
    'E': ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'],
    'F': ['F', 'G', 'A', 'B♭', 'C', 'D', 'E'],
    'F♯': ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯'],
    'G♭': ['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'],
    'G♯': ['G♯', 'A♯', 'B♯', 'C♯', 'D♯', 'E♯', 'F♯♯'],
    'A♭': ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G'],
    'A': ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'],
    'A♯': ['A♯', 'B♯', 'C♯♯', 'D♯', 'E♯', 'F♯♯', 'G♯♯'],
    'B♭': ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A'],
    'B': ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯']
};

const harmonicFunctionMap = {
    0: '1', 1: '♭9', 2: '9', 3: '♭3', 4: '3', 5: '11',
    6: '♭5', 7: '5', 8: '♯5', 9: '6', 10: '♭7', 11: '7'
};


const displayOrder = ['1', '♭3', '3', '♭5', '5', '♯5', '6','♭7', '7', '♭9', '9', '♯9', '11', '♯11', '♭13', '13'];

const scoreMap = {
    '1': 0, '♭3': 3, '3': 3, '♭5': 5, '5': 5, '♯5': 5,'6':6,
    '♭7': 7, '7': 7, '♭9': 9, '9': 9, '♯9': 9,
    '11': 11, '♯11': 11, '♭13': 13, '13': 13
};

const harmonicFunctionToNote = (root, harmonicFunctions) => {
    const scale = majorScales[root];
    if (!scale) return [];

    return harmonicFunctions.map(func => {
        let noteIndex;
        let accidental = '';
        switch (func) {
            case '1': noteIndex = 0; break;
            case '♭3': noteIndex = 2; accidental = '♭'; break;
            case '3': noteIndex = 2; break;
            case '♭5': noteIndex = 4; accidental = '♭'; break;
            case '5': noteIndex = 4; break;
            case '♯5': noteIndex = 4; accidental = '♯'; break;
            case '♭7': noteIndex = 6; accidental = '♭'; break;
            case '7': noteIndex = 6; break;
            case '9': noteIndex = 1; break;
            case '♭9': noteIndex = 1; accidental = '♭'; break;
            case '♯9': noteIndex = 1; accidental = '♯'; break;
            case '11': noteIndex = 3; break;
            case '♯11': noteIndex = 3; accidental = '♯'; break;
            case '♭13': noteIndex = 5; accidental = '♭'; break;
            case '13': noteIndex = 5; break;
            default: return '';
        }

        let note = scale[noteIndex];
        if (accidental) {
            note = simplifyNote(note + accidental);
        }
        return note;
    }).filter(note => note !== '');
};

const convertToTensions = (harmonicFunctions) => {
    //eslint-disable-next-line
    const containsFlat3 = harmonicFunctions.includes('♭3');
    const contains3 = harmonicFunctions.includes('3');
    const containsFlat5 = harmonicFunctions.includes('♭5');
    const contains5 = harmonicFunctions.includes('5');
    //eslint-disable-next-line
    const containsSharp5 = harmonicFunctions.includes('♯5');
    const containsFlat7 = harmonicFunctions.includes('♭7');
    const containsMajor7 = harmonicFunctions.includes('7');

    harmonicFunctions.forEach((func, index) => {
        if (func === '♭3' && contains3) {
            harmonicFunctions[index] = '♯9';
        }
        if (func === '♭5' && contains5) {
            harmonicFunctions[index] = '♯11';
        }
        if (func === '♯5' && (contains5 || containsFlat5)) {
            harmonicFunctions[index] = '♭13';
        }
        if (func === '6' && (containsFlat7 || containsMajor7)) {
            harmonicFunctions[index] = '13';
        }
    });

    // Remove duplicates
    return [...new Set(harmonicFunctions)];
};

const invalidateQuestion = (question) => {
    const sortedQuestion = [...question].sort((a, b) => a - b);
    const extendedQuestion = [...sortedQuestion, sortedQuestion[0] + 12, sortedQuestion[1] + 12];

    // Check for any combination of three notes with half steps between them
    for (let i = 0; i < extendedQuestion.length - 2; i++) {
        const interval1 = extendedQuestion[i + 1] - extendedQuestion[i];
        const interval2 = extendedQuestion[i + 2] - extendedQuestion[i + 1];

        if (interval1 === 1 && interval2 === 1) {
            return true; // Invalid if there are three consecutive half steps
        }
    }

    return false;
};


const createHarmonicInterpretations = (question) => {
    let interpretations = {};

    question.forEach(root => {
        let harmonicFunctions = question.map(number =>
            harmonicFunctionMap[(number - root + 12) % 12]
        );

        // Invalidate interpretation with both ♭3 and ♯5
        if (harmonicFunctions.includes('♭3') && harmonicFunctions.includes('♯5')) {
            return; // Skip this interpretation
        }

        // Invalidate interpretation with both ♭9 and ♯9
        if (harmonicFunctions.includes('♭9') && harmonicFunctions.includes('♯9')) {
            return; // Skip this interpretation
        }
        if (harmonicFunctions.includes('1') && harmonicFunctions.includes('♭3') &&
            harmonicFunctions.includes('♭5') && harmonicFunctions.includes('13') && harmonicFunctions.includes('♭7')) {
            return; // Skip this interpretation
        }
        // Special case for diminished seventh chord with 9th
        if (harmonicFunctions.includes('1') && harmonicFunctions.includes('♭3') &&
            harmonicFunctions.includes('♭5') && harmonicFunctions.includes('13')) {
            harmonicFunctions = harmonicFunctions.map(func => func === '13' ? '♭7' : func);
        }

        const tensionFunctions = convertToTensions([...harmonicFunctions]);

        interpretations[noteMap[root]] = {
            root: noteMap[root],
            notes: question.map(note => noteMap[note]),
            harmonicFunctions: tensionFunctions,
            harmonicFunctionsBefore: harmonicFunctions
        };
    });

    return interpretations;
};

const simplifyNote = (note) => {
    if (note === "F♭") return "E";
    if (note === "C♭") return "B";
    if (note === "E♯") return "F";
    if (note === "B♯") return "C";
    if (note.length === 2) return note;


    const noteWithoutAccidentals = note.replace(/[♯♭]/g, '');
    const accidentals = note.replace(/[A-G]/g, '');

    let semitones = 0;
    for (let acc of accidentals) {
        semitones += acc === '♯' ? 1 : -1;
    }

    const noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    let index = noteOrder.indexOf(noteWithoutAccidentals);

    // Adjust index and semitones
    index = (index + Math.floor(semitones / 2) + 7) % 7;
    semitones = semitones % 2;

    // Handle cases where semitones wrap around
    if (semitones === -1 && noteOrder[index] === 'C') {
        semitones = 0;
        index = (index - 1 + 7) % 7;
    }
    if (semitones === -1 && noteOrder[index] === 'F') {
        semitones = 0;
        index = (index - 1 + 7) % 7;
    }

    let newNote = noteOrder[index];

    if (semitones === 1) return newNote + '♯';
    if (semitones === -1) return newNote + '♭';
    return newNote;
};

const simplifyNoteWithSharps = (note) => {
    const flatToSharp = {
        'B♭': 'A♯', 'E♭': 'D♯', 'A♭': 'G♯', 'D♭': 'C♯', 'G♭': 'F♯', 'C♭': 'B', 'F♭': 'E'
    };
    return flatToSharp[note] || note;
};

const simplifyNoteWithFlats = (note) => {
    const sharpToFlat = {
        'A♯': 'B♭', 'D♯': 'E♭', 'G♯': 'A♭', 'C♯': 'D♭', 'F♯': 'G♭', 'B': 'C♭', 'E': 'F♭'
    };
    return sharpToFlat[note] || note;
};

const reorderHarmonicFunctions = (harmonicFunctions) => {
    return displayOrder.filter(func => harmonicFunctions.includes(func));
};

const getRandomNotes = (numNotes) => {
    const notes = [];
    while (notes.length < numNotes) {
        const randomNote = Math.floor(Math.random() * 12);
        if (!notes.includes(randomNote)) {
            notes.push(randomNote);
        }
    }
    return notes;
};

const getOrderedNotes = (root, notes) => {
    const rootIndex = Object.keys(noteMap).find(key => noteMap[key] === root);
    let chromaticScale = [];

    for (let i = 0; i < 12; i++) {
        chromaticScale.push(noteMap[(parseInt(rootIndex) + i) % 12]);
    }

    return chromaticScale.filter(note => notes.includes(note));
};

const calculateChordScore = (harmonicFunctions) => {
    return harmonicFunctions.reduce((score, func) => score + (scoreMap[func] || 0), 0);
};

const findMostStableChord = (interpretations) => {
    let bestChord = null;
    let lowestScore = Infinity;

    for (const root in interpretations) {
        const { harmonicFunctions } = interpretations[root];
        const score = calculateChordScore(harmonicFunctions);

        if (score < lowestScore) {
            lowestScore = score;
            bestChord = { root, score, harmonicFunctions };
        }
    }

    return bestChord;
};



export const buildChordSymbol = (root, harmonicFunctions) => {
    if (harmonicFunctions.length === 1 && harmonicFunctions[0] === '1') {
        return root;
    }

    let symbol = root;
    let hasFlat3 = harmonicFunctions.includes('♭3');
    let has3 = harmonicFunctions.includes('3');
    let hasFlat5 = harmonicFunctions.includes('♭5');
    let has5 = harmonicFunctions.includes('5');
    let hasSharp5 = harmonicFunctions.includes('♯5');
    let has6 = harmonicFunctions.includes('6');
    let hasFlat7 = harmonicFunctions.includes('♭7');
    let hasMajor7 = harmonicFunctions.includes('7');
    let has9 = harmonicFunctions.includes('9');
    let hasFlat9 = harmonicFunctions.includes('♭9');
    let hasSharp9 = harmonicFunctions.includes('♯9');
    let has11 = harmonicFunctions.includes('11');
    let hasSharp11 = harmonicFunctions.includes('♯11');
    let has13 = harmonicFunctions.includes('13');
    let hasFlat13 = harmonicFunctions.includes('♭13');

    // Check for four-note chords with 1, 3, 5, and an extension without 7
    if (harmonicFunctions.length === 4 &&
        harmonicFunctions.includes('1') &&
        (has3 || hasFlat3) &&
        (has5 || hasFlat5 || hasSharp5) &&
        !hasFlat7 && !hasMajor7 &&
        (has9 || hasFlat9 || hasSharp9 || has11 || hasSharp11 || has13 || hasFlat13)) {

        // Determine chord quality
        if (hasFlat3) {
            symbol += 'm';
        }
        if (hasFlat5) {
            symbol += '(♭5)';
        } else if (hasSharp5) {
            symbol += '+';
        }
        if (has6) {
            symbol += '6';
        }
        else if (has9) {
            symbol += ' add 9';
        } else if (hasFlat9) {
            symbol += ' add ♭9';
        } else if (hasSharp9) {
            symbol += ' add ♯9';
        } else if (has11) {
            symbol += ' add 11';
        } else if (hasSharp11) {
            symbol += ' add ♯11';
        } else if (has13) {
            symbol += ' add 13';
        } else if (hasFlat13) {
            symbol += ' add ♭13';
        }
        return symbol;
    }

    // Existing logic for other chord types
    if (hasFlat3 && hasFlat5) {
        symbol += '○'; // Diminished triad
    } else if (hasFlat3) {
        symbol += 'm'; // Minor triad
    } else if (has3 && hasFlat5) {
        symbol += '(♭5)';
    } else if (hasSharp5) {
        symbol += '+';
    }

    // Add seventh when present
    if (hasFlat7) {
        symbol += '7';
    } else if (hasMajor7) {
        symbol += 'Δ7';
    }
    //support half-diminished chords
    if (hasFlat3 && hasFlat5 && hasFlat7) {
        symbol += 'ø';
    }

    // Add alterations and extensions
    let alterations = harmonicFunctions.filter(func =>
        ['9', '♭9', '♯9', '11', '♯11', '13', '♭13'].includes(func)
    );

    if (alterations.length > 0) {
        symbol += '(' + alterations.join(',') + ')';
    }

    // Determine highest overtone and missing overtones
    const overtones = ['3', '5', '7', '9', '11', '13'];
    const highestOvertone = Math.max(...overtones.filter(o =>
        harmonicFunctions.some(f => f.replace(/[♭♯]/, '') === o)
    ).map(o => parseInt(o)));

    const missingOvertones = overtones
        .filter(o => parseInt(o) < highestOvertone)
        .filter(o => !harmonicFunctions.some(f => f.replace(/[♭♯]/, '') === o));

    if (missingOvertones.length > 0) {
        symbol += ' no ' + missingOvertones.join(',');
    }
    return symbol;
};


// Function to convert harmonic function to display format
export const convertHarmonicFunctionForDisplay = (func) => {
    if (func === '7') {
        return 'Δ7';  // Use triangle symbol for major 7th
    }
    return func;
};

export {
    noteMap,
    majorScales,
    harmonicFunctionMap,
    displayOrder,
    scoreMap,
    harmonicFunctionToNote,
    convertToTensions,
    invalidateQuestion,
    createHarmonicInterpretations,
    simplifyNote,
    simplifyNoteWithSharps,
    simplifyNoteWithFlats,
    reorderHarmonicFunctions,
    getRandomNotes,
    getOrderedNotes,
    calculateChordScore,
    findMostStableChord
};