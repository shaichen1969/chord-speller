// HarmonicUtils.js

export const noteToInt = {
    'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4,
    'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11,
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

export const getNoteFromFunction = (rootNote, func, harmonicFunctions) => {
    const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    const rootIndex = noteOrder.indexOf(rootNote);
    if (rootIndex === -1) {
         
        return '';
    }

    let interval = 0;
    let letterOffset = 0;

    switch (func) {
        case '1': interval = 0; letterOffset = 0; break;
        case '♭3': interval = 3; letterOffset = 2; break;
        case '3': interval = 4; letterOffset = 2; break;
        case '♭5': interval = 6; letterOffset = 4; break;
        case '5': interval = 7; letterOffset = 4; break;
        case '♯5': interval = 8; letterOffset = 4; break;
        case '♭7': interval = 10; letterOffset = 6; break;
        case '7': interval = 11; letterOffset = 6; break;
        case '♭9': interval = 1; letterOffset = 1; break;
        case '9': interval = 2; letterOffset = 1; break;
        case '♯9': interval = 3; letterOffset = 1; break;
        case '11': interval = 5; letterOffset = 3; break;
        case '♯11': interval = 6; letterOffset = 3; break;
        case '♭13': interval = 8; letterOffset = 5; break;
        case '13': interval = 9; letterOffset = 5; break;
        default: return '';
    }

    const targetLetter = String.fromCharCode(((rootNote.charCodeAt(0) - 65 + letterOffset) % 7) + 65);
    let resultNote = noteOrder[(rootIndex + interval) % 12];

    // Adjust the note name if it doesn't match the target letter
    if (resultNote[0] !== targetLetter) {
        const enharmonic = Object.entries(noteToInt).find(([note, int]) =>
            int === noteToInt[resultNote] && note[0] === targetLetter
        );
        if (enharmonic) {
            resultNote = enharmonic[0];
        }
    }

    // If the chord has a b5, lower the 5 by a half step
    if (harmonicFunctions.includes('♭5') && func === '5') {
        const lowerIndex = (noteOrder.indexOf(resultNote) - 1 + 12) % 12;
        resultNote = noteOrder[lowerIndex];
    }

    return resultNote;
};

export function buildChordSymbol(rootNote, harmonicFunctions) {
    let symbol = rootNote;
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
