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
    'B♭': ['B♭', 'C', 'D', 'E', 'F', 'G', 'A'],
    'B': ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯']
};

const harmonicFunctionMap = {
    0: '1', 1: '♭9', 2: '9', 3: '♭3', 4: '3', 5: '11',
    6: '♭5', 7: '5', 8: '♯5', 9: '6', 10: '♭7', 11: '7'
};


const displayOrder = ['1', '♭3', '3', '♭5', '5', '♯5', '6', '♭7', '7', '♭9', '9', '♯9', '11', '♯11', '♭13', '13'];

const scoreMap = {
    '1': 0, '♭3': 3, '3': 3, '♭5': 5, '5': 5, '♯5': 5, '6': 7,
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
            case '6': noteIndex = 5; break;
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
    const containsFlat3 = harmonicFunctions.includes('♭3');
    const contains3 = harmonicFunctions.includes('3');
    const containsFlat5 = harmonicFunctions.includes('♭5');
    const contains5 = harmonicFunctions.includes('5');
    const containsSharp5 = harmonicFunctions.includes('♯5');
    const containsFlat7 = harmonicFunctions.includes('♭7');
    const containsMajor7 = harmonicFunctions.includes('7');

    let hasFlat9 = harmonicFunctions.includes('♭9');

    harmonicFunctions = harmonicFunctions.map(func => {
        if (func === '♭3' && contains3) {
            return '♯9';
        } else if (func === '♭5' && contains5) {
            return '♯11';
        } else if (func === '♯5' && (contains5 || containsFlat5)) {
            return '♭13';
        } else if (func === '6' && (containsFlat7 || containsMajor7)) {
            return '13';
        }
        return func;
    });

    // Remove duplicates
    return [...new Set(harmonicFunctions)];
};

const invalidateQuestion = (question) => {
    const sortedQuestion = [...question].sort((a, b) => a - b);
    const extendedQuestion = [...sortedQuestion, sortedQuestion[0] + 12, sortedQuestion[1] + 12];

    for (let i = 0; i < extendedQuestion.length - 2; i++) {
        const interval1 = extendedQuestion[i + 1] - extendedQuestion[i];
        const interval2 = extendedQuestion[i + 2] - extendedQuestion[i + 1];

        if (interval1 === 1 && interval2 === 1) {
            return true; // Invalid if there are three consecutive half steps
        }
    }
    return false;
};

const createHarmonicInterpretations = (question, questionMode) => {
    console.log(questionMode);
    let interpretations = {};
    if (questionMode ==='triadPlusTension')console.log('condition met!');
 
    question.forEach(root => {
        let harmonicFunctions = question.map(number =>
            harmonicFunctionMap[(number - root + 12) % 12]
        );
        
        // Existing validation checks
        if (harmonicFunctions.includes('♭3') && harmonicFunctions.includes('♯5')) {
            return; // Skip this interpretation
        }
        if (harmonicFunctions.includes('3') && harmonicFunctions.includes('♯5') &&
            harmonicFunctions.includes('6')) {
            return; // Skip this interpretation
        }
        if (harmonicFunctions.includes('♭9') && harmonicFunctions.includes('♭3') && harmonicFunctions.includes('3')) {
            return; // Skip this interpretation
        }
        if (harmonicFunctions.includes('1') && harmonicFunctions.includes('♭3') &&
            harmonicFunctions.includes('♭5') && harmonicFunctions.includes('6') && harmonicFunctions.includes('♭7')) {
            return; // Skip this interpretation
        }
        // Special case for diminished seventh chord with 9th
        if (harmonicFunctions.includes('1') && harmonicFunctions.includes('♭3') &&
            harmonicFunctions.includes('♭5') && harmonicFunctions.includes('13')) {
            harmonicFunctions = harmonicFunctions.map(func => func === '13' ? '♭7' : func);
        }
        const tensionFunctions = convertToTensions([...harmonicFunctions]);

        // Add this check after tension conversion
        if (tensionFunctions.includes('♭9') && tensionFunctions.includes('♯9')) {
            return; // Skip this interpretation
        }

        interpretations[noteMap[root]] = {
            root: noteMap[root],
            notes: question.map(note => noteMap[note]),
            harmonicFunctions: tensionFunctions,
            harmonicFunctionsBefore: harmonicFunctions
        };
    });

    return interpretations;
};

const findMostStableChords = (interpretations) => {
    let bestChords = [];
    let lowestScore = Infinity;

    for (const root in interpretations) {
        const { harmonicFunctions } = interpretations[root];
        const score = calculateChordScore(harmonicFunctions);

        if (score < lowestScore) {
            lowestScore = score;
            bestChords = [{ root, score, harmonicFunctions }];
        } else if (score === lowestScore) {
            bestChords.push({ root, score, harmonicFunctions });
        }
    }

    // If there's a tie, pick a random winner
    if (bestChords.length > 1) {
        const randomIndex = Math.floor(Math.random() * bestChords.length);
        bestChords = [bestChords[randomIndex]];
    }

    return bestChords;
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
    let score = harmonicFunctions.reduce((score, func) => score + (scoreMap[func] || 0), 0);
    
    // Check for augmented chord (1, 3, #5)
    if (harmonicFunctions.includes('1') && harmonicFunctions.includes('3') && harmonicFunctions.includes('♯5')) {
        score += 0.5; // Add a small value to differentiate augmented chords
    }
    
    return score;
};

export const buildChordSymbol = (root, harmonicFunctions) => {
    let symbol = root;
    let has3 = harmonicFunctions.includes('3');
    let hasFlat3 = harmonicFunctions.includes('♭3');
    let has5 = harmonicFunctions.includes('5');
    let hasFlat5 = harmonicFunctions.includes('♭5');
    let hasSharp5 = harmonicFunctions.includes('♯5');
    let has6 = harmonicFunctions.includes('6');
    let has7 = harmonicFunctions.includes('7');
    let hasFlat7 = harmonicFunctions.includes('♭7');
    let extensions = [];

    // Handle triad quality
    if (hasFlat3) {
        symbol += 'm';
    }

    // Handle diminished and half-diminished chords
    if (hasFlat3 && hasFlat5) {
        if (hasFlat7) {
            symbol = symbol.replace('m', '') + 'ø'; // Half-diminished
        } else if (!has7 && !has6) {
            symbol = symbol.replace('m', '') + '°'; // Fully diminished
        }
    }

    // Handle 6th and 7th chords
    if (has6) {
        symbol += '6';
    }
    if (has7) {
        symbol += '△7'; // Using triangle symbol for major 7th
    } else if (hasFlat7 && !symbol.includes('ø') && !symbol.includes('°')) {
        symbol += '7';
    }

    // Handle altered 5th
    if (hasFlat5 && !hasSharp5 && !symbol.includes('ø') && !symbol.includes('°')) {
        extensions.push('♭5');
    } else if (hasSharp5 && !hasFlat5) {
        extensions.push('♯5');
    } else if (hasFlat5 && hasSharp5) {
        extensions.push('♭5');
        extensions.push('♯5');
    }

    // Handle extensions and alterations
    ['9', '11', '13'].forEach(ext => {
        if (harmonicFunctions.includes(ext)) extensions.push(ext);
        if (harmonicFunctions.includes('♭' + ext)) extensions.push('♭' + ext);
        if (harmonicFunctions.includes('♯' + ext)) extensions.push('♯' + ext);
    });

    // Add extensions to symbol
    if (extensions.length > 0) {
        symbol += '(' + extensions.join(',') + ')';
    }

    // Handle special cases for missing 3rd or 5th
    if (!has3 && !hasFlat3 && harmonicFunctions.length > 1) {
        symbol += ' no 3';
    }
    if (!has5 && !hasFlat5 && !hasSharp5 && harmonicFunctions.length > 1 && !symbol.includes('°')) {
        symbol += ' no 5';
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
    findMostStableChords
};