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

export const analyzeChord = (questionIndices) => {
    if (!questionIndices || questionIndices.length === 0) {
        return null;
    }

    const invalid = invalidateQuestion(questionIndices);
    if (invalid) {
        return null;
    }

    const interpretations = createHarmonicInterpretations(questionIndices);
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
        notes: questionIndices.map(note => noteMap[note]),
        harmonicFunctionsFound: harmonicFunctions,
        spelledChord: preferredSpelledChord.join(', '),
        enharmonicSpelledChord: (preferredSpelling === 'flat' ? sharpSpelledChord : flatSpelledChord).join(', '),
        preferredSpelling: preferredSpelling,
        preferredSpellingNotes: preferredSpelledChord.join(', '),
        chordSymbol: chordSymbol
    };
console.log(result);
    return result;
};