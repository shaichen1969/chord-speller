export const noteToInt = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8,
    'A': 9, 'A#': 10, 'Bb': 10, 'B': 11,
};

export const intToNote = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const harmonicFunctionMap = {
    0: '1', 1: '♭9', 2: '9', 3: '♭3', 4: '3', 5: '11',
    6: '♭5', 7: '5', 8: '♯5', 9: '13', 10: '♭7', 11: '7',
};

export const harmonicFunctionOrder = [
    '1', '♭3', '3', '♭5', '5', '♯5', '♭7', '7', '♭9', '9', '♯9', '11', '♯11', '13', '♭13'
];

export const harmonicFunctionScores = {
    '1': 0, '♭3': 1, '3': 1, '♭5': 2, '5': 2, '♯5': 2, '♭7': 3, '7': 3,
    '♭9': 4, '9': 4, '11': 5, '♯11': 5, '♭13': 6, '13': 6
};

const flatPreferenceKeys = ['Bb', 'Eb', 'Ab', 'Db'];
const sharpPreferenceKeys = ['F#'];
const minorSharpPreferenceKeys = ['C#', 'F#'];

export const determineOptimalSpelling = (rootNote, harmonicFunctions) => {
    const isMinor = harmonicFunctions.includes('♭3');
    const hasThird = harmonicFunctions.includes('3') || harmonicFunctions.includes('♭3');
    const hasMajorThird = harmonicFunctions.includes('3');

    if (isMinor && minorSharpPreferenceKeys.includes(rootNote)) {
        return rootNote;
    }

    if (hasMajorThird || !hasThird) {
        if (flatPreferenceKeys.includes(rootNote)) {
            return rootNote;
        }
        if (sharpPreferenceKeys.includes(rootNote)) {
            return rootNote;
        }
    }

    const noteIndex = Object.values(noteToInt).indexOf(noteToInt[rootNote]);
    return intToNote[noteIndex];
};

export const getNoteFromFunction = (rootNote, func, harmonicFunctions) => {
    const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    const rootIndex = noteOrder.indexOf(rootNote);
    if (rootIndex === -1) {
        console.error(`Invalid root note: ${rootNote}`);
        return '';
    }

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

export function buildChordSymbol(rootNote, harmonicFunctions) {
    const optimalRootNote = determineOptimalSpelling(rootNote, harmonicFunctions);
    let symbol = optimalRootNote;
    const isMinor = harmonicFunctions.includes('♭3');
    const isMajor = harmonicFunctions.includes('3');
    const isDiminished = harmonicFunctions.includes('♭3') && harmonicFunctions.includes('♭5');
    const isHalfDiminished = isDiminished && harmonicFunctions.includes('♭7');
    const isAugmented = harmonicFunctions.includes('3') && harmonicFunctions.includes('♯5');

    if (isHalfDiminished) symbol += ' ø';
    else if (isDiminished) symbol += ' °';
    else if (isAugmented) symbol += ' +';
    else if (isMinor) symbol += 'm';

    if (harmonicFunctions.includes('♭5') && !isDiminished && !isHalfDiminished) symbol += ' ♭5';
    else if (harmonicFunctions.includes('♯5') && !isAugmented) symbol += ' ♯5';

    const extensions = ['7', '9', '11', '13'].filter(ext =>
        harmonicFunctions.includes(ext) ||
        harmonicFunctions.includes(`♭${ext}`) ||
        harmonicFunctions.includes(`♯${ext}`)
    );

    extensions.forEach(ext => {
        const type = harmonicFunctions.find(func => func.includes(ext));
        if (type === '7' && !isHalfDiminished && isMajor) symbol += 'Δ7';
        else if (type === '♭7' && !isHalfDiminished) symbol += '7';
        else if (type !== '5' && type !== '7') symbol += type;
    });

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
            default:
                break;
        }
    }

    if (missingOvertones.size > 0) {
        symbol += ' no ' + Array.from(missingOvertones).join(' ');
    }

    return symbol;
}
