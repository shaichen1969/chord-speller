// src/Utils/HarmonicUtils.js
const noteToInt = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8,
    'A': 9, 'A#': 10, 'Bb': 10, 'B': 11,
};

const intToNote = {
    0: 'C', 1: 'Db', 2: 'D', 3: 'Eb', 4: 'E',
    5: 'F', 6: 'Gb', 7: 'G', 8: 'Ab', 9: 'A',
    10: 'Bb', 11: 'B',
};

const harmonicFunctionMap = {
    0: '1', 1: '♭9', 2: '9', 3: '♭3', 4: '3', 5: '11',
    6: '♭5', 7: '5', 8: '♯5', 9: '13', 10: '♭7', 11: '7',
};

const harmonicFunctionOrder = [
    '1', '♭3', '3', '♭5', '5', '♯5', '♭7', '7', '♭9', '9', '♯9', '11', '♯11', '13', '♭13'
];

const harmonicFunctionScores = {
    '1': 0, '♭3': 3, '3': 3, '5': 5, '♭7': 7, '7': 7,
    '♭9': 9, '9': 9, '♯9': 9, '11': 11, '♯11': 11, '13': 13,
    '♭5': 5, '♯5': 5, '♭13': 13
};

const shouldUseFlatsForMinor = (rootNote) => {
    const minorFlatRoots = ['C', 'F', 'Bb', 'Eb', 'Ab', 'G', 'D', 'A', 'E'];
    return minorFlatRoots.includes(rootNote);
};

const adjustRootNote = (rootNote, isMinor) => {
    if (isMinor && shouldUseFlatsForMinor(rootNote)) {
        const sharpToFlatMap = { 'C#': 'Db', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb', 'D#': 'Eb' };
        return sharpToFlatMap[rootNote] || rootNote;
    }
    const majorRootNoteMap = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };
    return majorRootNoteMap[rootNote] || rootNote;
};

const getNoteFromFunction = (rootNote, func, isMinor) => {
    const useFlats = shouldUseFlatsForMinor(rootNote) || isMinor;
    const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const flatNoteOrder = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    const noteOrderToUse = useFlats ? flatNoteOrder : noteOrder;

    const rootIndex = noteOrderToUse.indexOf(rootNote);
    let interval = 0;

    switch (func) {
        case '1': interval = 0; break;
        case '3': case '♭3': interval = func === '♭3' ? 3 : 4; break;
        case '5': case '♭5': case '♯5':
            interval = func === '♭5' ? 6 : (func === '♯5' ? 8 : 7);
            break;
        case '7': case '♭7': interval = func === '♭7' ? 10 : 11; break;
        case '9': case '♭9': case '♯9':
            interval = func === '♭9' ? 1 : (func === '♯9' ? 3 : 2);
            break;
        case '11': case '♯11': interval = func === '♯11' ? 6 : 5; break;
        case '13': case '♭13': interval = func === '♭13' ? 8 : 9; break;
        default: return '';
    }

    return noteOrderToUse[(rootIndex + interval) % 12];
};

const buildChordSymbol = (rootNote, harmonicFunctions) => {
    const isMinor = harmonicFunctions.includes('♭3');
    const isDiminished = harmonicFunctions.includes('♭3') && harmonicFunctions.inc
