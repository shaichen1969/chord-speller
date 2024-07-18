import {
    noteMap,
    harmonicFunctionToNote,
    invalidateQuestion,
    createHarmonicInterpretations,
    reorderHarmonicFunctions,
    findMostStableChord,
    simplifyNoteWithFlats,
    simplifyNoteWithSharps,
    buildChordSymbol
} from './HarmonicUtils';

const countAccidentals = (notes) => {
    return notes.reduce((count, note) => {
        if (note.includes('♯') || note.includes('♭')) {
            return count + 1;
        }
        return count;
    }, 0);
};

const selectPreferredSpelling = (sharpSpelling, flatSpelling) => {
    const sharpAccidentals = countAccidentals(sharpSpelling);
    const flatAccidentals = countAccidentals(flatSpelling);
    return flatAccidentals <= sharpAccidentals ? 'flat' : 'sharp';
};

export const analyzeChord = (question) => {
    if (!question || question.length === 0) {
        
        return null;
    }

    const invalid = invalidateQuestion(question);
    if (invalid) {
      
        return null;
    }

    const interpretations = createHarmonicInterpretations(question);
    

    const bestChord = findMostStableChord(interpretations);
    if (!bestChord) {
         
        return null;
    }
     

    const harmonicFunctions = reorderHarmonicFunctions(bestChord.harmonicFunctions);

    const sharpRoot = bestChord.root.includes('♭') ? simplifyNoteWithSharps(bestChord.root) : bestChord.root;
    const flatRoot = bestChord.root.includes('♯') ? simplifyNoteWithFlats(bestChord.root) : bestChord.root;

    const sharpSpelledChord = harmonicFunctionToNote(sharpRoot, harmonicFunctions);
    const flatSpelledChord = harmonicFunctionToNote(flatRoot, harmonicFunctions);

    const preferredSpelling = selectPreferredSpelling(sharpSpelledChord, flatSpelledChord);

    const preferredRoot = preferredSpelling === 'flat' ? flatRoot : sharpRoot;
    const preferredSpelledChord = preferredSpelling === 'flat' ? flatSpelledChord : sharpSpelledChord;

    const chordSymbol = buildChordSymbol(preferredRoot, harmonicFunctions);

    const result = {
        root: preferredRoot,
        altRoot: preferredSpelling === 'flat' ? sharpRoot : flatRoot,
        notes: question.map(note => noteMap[note]),
        harmonicFunctionsFound: harmonicFunctions,
        spelledChord: preferredSpelledChord.join(', '),
        enharmonicSpelledChord: preferredSpelling === 'flat' ? sharpSpelledChord.join(', ') : flatSpelledChord.join(', '),
        preferredSpelling: preferredSpelling,
        preferredSpellingNotes: preferredSpelledChord.join(', '),
        chordSymbol: chordSymbol
    };

      
    return result;
};