// src/utils/HarmonicUtils.js
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

export const harmonicFunctionMap = {
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

const majorSharpRoots = ['G', 'D', 'A', 'E', 'B', 'F#'];
const majorFlatRoots = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'];
const minorDiatonicFromMajor = {
    'A': 'C', 'E': 'G', 'B': 'D', 'F#': 'A', 'C#': 'E', 'G#': 'B', 'D#': 'F#', 'A#': 'C#',
    'D': 'F', 'G': 'Bb', 'C': 'Eb', 'F': 'Ab', 'Bb': 'Db', 'Eb': 'Gb', 'Ab': 'Cb'
};
const diminishedFromMajor = {
    'B': 'C', 'E': 'F', 'A': 'Bb', 'D': 'Eb', 'G': 'Ab', 'C': 'Db', 'F': 'Gb', 'Bb': 'Cb',
    'Db': 'E', 'Eb': 'F#', 'F#': 'G#', 'G#': 'A', 'Cb': 'Db', 'Gb': 'A'
};

const determineOptimalSpelling = (rootNote, isMinor, isDiminished) => {
    if (rootNote === 'C') return rootNote;

    if (isDiminished) {
        const majorRoot = diminishedFromMajor[rootNote];
        if (majorSharpRoots.includes(majorRoot)) return rootNote;
        if (majorFlatRoots.includes(majorRoot)) return rootNote;

        const sharpToFlatMap = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };
        const flatToSharpMap = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };

        return sharpToFlatMap[rootNote] || flatToSharpMap[rootNote] || rootNote;
    }

    if (isMinor) {
        const majorRoot = minorDiatonicFromMajor[rootNote];
        if (majorSharpRoots.includes(majorRoot)) return rootNote;
        if (majorFlatRoots.includes(majorRoot)) return rootNote;

        const sharpToFlatMap = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };
        const flatToSharpMap = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };

        return sharpToFlatMap[rootNote] || flatToSharpMap[rootNote] || rootNote;
    }

    if (majorSharpRoots.includes(rootNote)) return rootNote;
    if (majorFlatRoots.includes(rootNote)) return rootNote;

    const sharpToFlatMap = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb' };
    const flatToSharpMap = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };

    return sharpToFlatMap[rootNote] || flatToSharpMap[rootNote] || rootNote;
};

const adjustRootNote = (rootNote, isMinor, isMajor, isDiminished) => {
    return determineOptimalSpelling(rootNote, isMinor, isDiminished);
};

const getNoteFromFunction = (rootNote, func, isMinor, isDiminished) => {
    const useFlats = (isMinor && majorFlatRoots.includes(minorDiatonicFromMajor[rootNote])) || (isDiminished && majorFlatRoots.includes(diminishedFromMajor[rootNote]));
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
    const isMajor = harmonicFunctions.includes('3');
    const isDiminished = harmonicFunctions.includes('♭3') && harmonicFunctions.includes('♭5');
    const isHalfDiminished = isDiminished && harmonicFunctions.includes('♭7');
    const isAugmented = harmonicFunctions.includes('3') && harmonicFunctions.includes('♯5');
    rootNote = adjustRootNote(rootNote, isMinor, isMajor, isDiminished);
    let symbol = rootNote;

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
        if (type === '7' && !isHalfDiminished) symbol += 'Δ7';
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
                // Do nothing for unknown overtones
                break;
        }
    }

    if (missingOvertones.size > 0) {
        symbol += ' no ' + Array.from(missingOvertones).join(' ');
    }

    return symbol;
};

export {
    noteToInt,
    intToNote,
    harmonicFunctionMap,
    harmonicFunctionOrder,
    harmonicFunctionScores,
    determineOptimalSpelling,
    adjustRootNote,
    getNoteFromFunction,
    buildChordSymbol
};
