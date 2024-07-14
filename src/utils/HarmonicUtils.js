export const noteToInt = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
    'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8,
    'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};

export const intToNote = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const harmonicFunctionMap = {
    0: '1', 1: '♭9', 2: '9', 3: '♭3', 4: '3', 5: '11',
    6: '♭5', 7: '5', 8: '♯5', 9: '13', 10: '♭7', 11: '7'
};

export const harmonicFunctionOrder = ['1', '♭3', '3', '♭5', '5', '♯5', '♭7', '7', '♭9', '9', '11', '♯11', '♭13', '13'];

export const harmonicFunctionScores = {
    '1': 0, '♭3': 1, '3': 1, '♭5': 2, '5': 2, '♯5': 2, '♭7': 3, '7': 3,
    '♭9': 4, '9': 4, '11': 5, '♯11': 5, '♭13': 6, '13': 6
};

const majorSharpRoots = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
const majorFlatRoots = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];

const minorDiatonicFromMajor = {
    'A': 'C', 'E': 'G', 'B': 'D', 'F#': 'A', 'C#': 'E', 'G#': 'B', 'D#': 'F#', 'A#': 'C#',
    'D': 'F', 'G': 'Bb', 'C': 'Eb', 'F': 'Ab', 'Bb': 'Db', 'Eb': 'Gb', 'Ab': 'Cb'
};

const diminishedFromMajor = {
    'B': 'C', 'E': 'F', 'A': 'Bb', 'D': 'Eb', 'G': 'Ab', 'C': 'Db', 'F': 'Gb', 'Bb': 'Cb',
    'Db': 'E', 'Eb': 'F#', 'F#': 'G#', 'G#': 'A', 'Cb': 'Db', 'Gb': 'A'
};

export const determineOptimalSpelling = (rootNote, isMinor, isDiminished) => {
    if (rootNote === 'C') return rootNote;

    if (isDiminished) {
        const majorRoot = diminishedFromMajor[rootNote];
        if (majorSharpRoots.includes(majorRoot)) return rootNote;
        if (majorFlatRoots.includes(majorRoot)) return rootNote;
    }

    if (isMinor) {
        const majorRoot = minorDiatonicFromMajor[rootNote];
        if (majorSharpRoots.includes(majorRoot)) return rootNote;
        if (majorFlatRoots.includes(majorRoot)) return rootNote;
    }

    if (majorSharpRoots.includes(rootNote)) return rootNote;
    if (majorFlatRoots.includes(rootNote)) return rootNote;

    const sharpToFlatMap = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };
    const flatToSharpMap = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };

    return sharpToFlatMap[rootNote] || flatToSharpMap[rootNote] || rootNote;
};

export const getNoteFromFunction = (rootNote, func, isMinor, isDiminished) => {
    const useFlats = majorFlatRoots.includes(rootNote) ||
        (isMinor && majorFlatRoots.includes(minorDiatonicFromMajor[rootNote])) ||
        (isDiminished && majorFlatRoots.includes(diminishedFromMajor[rootNote]));

    const noteOrder = useFlats
        ? ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
        : ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    const rootIndex = noteOrder.indexOf(rootNote);
    let interval = 0;

    switch (func) {
        case '1': interval = 0; break;
        case '♭3': interval = 3; break;
        case '3': interval = 4; break;
        case '♭5': interval = 6; break;
        case '5': interval = 7; break;
        case '♯5': interval = 8; break;
        case '♭7': interval = 10; break;
        case '7': interval = 11; break;
        case '♭9': interval = 1; break;
        case '9': interval = 2; break;
        case '♯9': interval = 3; break;
        case '11': interval = 5; break;
        case '♯11': interval = 6; break;
        case '♭13': interval = 8; break;
        case '13': interval = 9; break;
        default: return '';
    }

    return noteOrder[(rootIndex + interval) % 12];
};

export function buildChordSymbol(rootNote, functions) {
    let symbol = rootNote;
    const highestOvertoneOrder = ['13', '11', '9', '7', '5', '3'];
    let highestOvertone = '';
    let missingNotes = [];

    // Determine chord quality (major, minor, diminished)
    if (functions.includes('♭3')) {
        symbol += 'm';
        if (functions.includes('♭5')) {
            symbol += '°';
        }
    } else if (functions.includes('♭5') && !functions.includes('3')) {
        symbol += '(♭5)';
    }

    // Find the highest overtone
    for (const overtone of highestOvertoneOrder) {
        if (functions.includes(overtone) || functions.includes('♭' + overtone) || functions.includes('♯' + overtone)) {
            highestOvertone = overtone;
            break;
        }
    }

    // Determine missing notes
    if (highestOvertone) {
        const overtonesToCheck = highestOvertoneOrder.slice(highestOvertoneOrder.indexOf(highestOvertone));
        missingNotes = overtonesToCheck.filter(note =>
            !functions.includes(note) && !functions.includes('♭' + note) && !functions.includes('♯' + note)
        );
    }

    // Add 7 if it's present
    if (functions.includes('7')) {
        symbol += functions.includes('3') ? 'maj7' : '7';
    } else if (functions.includes('♭7')) {
        symbol += '7';
    }

    // Add the highest overtone if it's not 7
    if (highestOvertone && highestOvertone !== '7') {
        if (functions.includes('♭' + highestOvertone)) {
            symbol += '♭' + highestOvertone;
        } else if (functions.includes('♯' + highestOvertone)) {
            symbol += '♯' + highestOvertone;
        } else {
            symbol += highestOvertone;
        }
    }

    // Add 'no' for missing notes
    if (missingNotes.length > 0) {
        symbol += ' no ' + missingNotes.join(',');
    }

    // Special cases
    if (functions.includes('♯11') && !symbol.includes('♯11')) {
        symbol += '(♯11)';
    }

    return symbol;
}