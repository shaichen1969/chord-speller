import {
    noteMap,
    harmonicFunctionToNote,
    invalidateQuestion,
    createHarmonicInterpretations,
    reorderHarmonicFunctions,
    findMostStableChords,
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
        console.log("Invalid input: empty or null questionIndices");
        return null;
    }

    const invalid = invalidateQuestion(questionIndices);
    if (invalid) {
        console.log("Invalid chord configuration");
        return null;
    }

    console.log("Analyzing chord with notes:", questionIndices.map(note => noteMap[note]));

    const interpretations = createHarmonicInterpretations(questionIndices);
    console.log("All interpretations:", interpretations);

    const bestChords = findMostStableChords(interpretations);
    if (bestChords.length === 0) {
        console.log("No stable chords found");
        return null;
    }

    console.log("Best chord interpretations:", bestChords);

    const results = bestChords.map(bestChord => {
        const harmonicFunctions = reorderHarmonicFunctions(bestChord.harmonicFunctions);

        const sharpRoot = bestChord.root.includes('♭') ? simplifyNoteWithSharps(bestChord.root) : bestChord.root;
        const flatRoot = bestChord.root.includes('♯') ? simplifyNoteWithFlats(bestChord.root) : bestChord.root;

        const sharpSpelledChord = harmonicFunctionToNote(sharpRoot, harmonicFunctions);
        const flatSpelledChord = harmonicFunctionToNote(flatRoot, harmonicFunctions);

        const preferredSpelling = selectPreferredSpelling(sharpSpelledChord, flatSpelledChord);

        const preferredRoot = preferredSpelling === 'flat' ? flatRoot : sharpRoot;
        const preferredSpelledChord = preferredSpelling === 'flat' ? flatSpelledChord : sharpSpelledChord;

        const chordSymbol = buildChordSymbol(preferredRoot, harmonicFunctions);

        return {
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
    });

    if (results.length > 1) {
        console.log("Tie found. Multiple interpretations:", results);
    } else {
        console.log("Single interpretation found:", results[0]);
    }

    return results[0];
};