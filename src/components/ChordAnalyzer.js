// ChordAnalyzer.js

const NOTE_ORDER = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function getHarmonicFunction(interval) {
    const functionMap = {
        0: '1', 1: 'b9', 2: '9', 3: 'b3', 4: '3', 5: '11',
        6: 'b5', 7: '5', 8: 'b13', 9: '13', 10: 'b7', 11: '7'
    };
    return functionMap[interval];
}

function normalizeHarmonicFunctions(functions) {
    const orderMap = {
        '1': 1, 'b9': 2, '9': 2, '#9': 2, 
        'b3': 3, '3': 3, '11': 5, '#11': 6, 
        'b5': 6, '5': 7, '#5': 8, 'b13': 8, '13': 9, 
        'b7': 10, '7': 11
    };
    const preferredNames = {
        1: '1', 2: '9', 3: '3', 5: '11', 6: '#11', 
        7: '5', 8: '13', 10: 'b7', 11: '7'
    };
    
    const numericFunctions = functions.map(func => orderMap[func] || parseInt(func));
    numericFunctions.sort((a, b) => a - b);

    return [...new Set(numericFunctions.map(num => preferredNames[num] || getHarmonicFunction(num % 12)))];
}

function convertToHarmonicFunctions(notes) {
    const uniqueNotes = [...new Set(notes)];
    const harmonicFunctions = {};

    for (const root of uniqueNotes) {
        const rootIndex = NOTE_ORDER.indexOf(root);
        const intervals = uniqueNotes.map(note => (NOTE_ORDER.indexOf(note) - rootIndex + 12) % 12);
        const functions = intervals.map(getHarmonicFunction);
        harmonicFunctions[root] = normalizeHarmonicFunctions(functions);
    }

    return harmonicFunctions;
}

function analyzeChord(chord) {
    let notes;
    if (Array.isArray(chord)) {
        notes = chord;
    } else if (typeof chord === 'string') {
        notes = chord.split(',').map(note => note.trim());
         
        
    } else {
        throw new Error('Invalid input: chord must be an array of notes or a comma-separated string');
    }

    notes = notes.map(note => note.replace(/\d+$/, '')); // Remove any octave numbers
    return convertToHarmonicFunctions(notes);
}

export { analyzeChord, NOTE_ORDER };