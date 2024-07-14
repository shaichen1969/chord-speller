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

export const harmonicFunctionOrder = ['1', '♭3', '3', '♭5', '5', '♯5' ,'♭7', '7', '♭9', '9', '11', '♯11', '♭13', '13'];

export const harmonicFunctionScores = {
    '1': 0, '♭3': 1, '3': 1, '♭5': 2, '5': 2, '♯5': 2, '♭7': 3, '7': 3,
    '♭9': 4, '9': 4, '11': 5, '♯11': 5, '♭13': 6, '13': 6
};

export function buildChordSymbol(root, functions) {
    let symbol = root;
    if (functions.includes('♭3')) symbol += 'm';
    if (functions.includes('♭5')) {
        if (functions.includes('♭3')) symbol += '°';
        else symbol += '(♭5)';
    }
    if (functions.includes('7')) {
        if (functions.includes('3')) symbol += 'maj7';
        else symbol += '7';
    }
    if (functions.includes('9') && !functions.includes('7')) symbol += 'add9';
    if (functions.includes('6') && !functions.includes('7')) symbol += '6';
    if (functions.includes('♯11')) symbol += '(♯11)';
    if (functions.includes('13')) symbol += '13';
    return symbol;
}

export function getNoteFromFunction(rootNote, harmonicFunction, isMinor, isDiminished) {
    const rootNoteInt = noteToInt[rootNote];
    const intervalMap = {
        '1': 0, '♭3': 3, '3': 4, '5': 7, '♭7': 10, '7': 11,
        '♭9': 13, '9': 14, '11': 17, '♯11': 18, '♭13': 20, '13': 21
    };
    let interval = intervalMap[harmonicFunction.replace(/[♭♯]/, '')];

    if (isMinor && harmonicFunction === '3') interval = 3;
    if (isDiminished && harmonicFunction === '5') interval = 6;

    if (harmonicFunction.includes('♭')) interval--;
    if (harmonicFunction.includes('♯')) interval++;

    return intToNote[(rootNoteInt + interval) % 12];
}