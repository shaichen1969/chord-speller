import {
    noteMap,
    harmonicFunctionToNote,
    invalidateQuestion,
    createHarmonicInterpretations,
    reorderHarmonicFunctions,
    findMostStableChords,
    simplifyNoteWithFlats,
    simplifyNoteWithSharps,
    buildChordSymbol,
    majorScales
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

// Helper function to sort notes in scale order
const sortNotesInScaleOrder = (notes, root) => {
    const scaleOrder = majorScales[root];
    return notes.sort((a, b) => {
        return scaleOrder.indexOf(a.replace(/\d+$/, '')) - scaleOrder.indexOf(b.replace(/\d+$/, ''));
    });
};

export const analyzeChord = (questionIndices, questionMode) => {
    if (invalidateQuestion(questionIndices)) {
        return null;
    }

    let interpretations = createHarmonicInterpretations(questionIndices, questionMode);

    // Force the root when in major scale mode
    if (questionMode === 'majorScale') {
        const forcedRoot = noteMap[questionIndices[0]];
        interpretations = { [forcedRoot]: interpretations[forcedRoot] };
    }

    const bestChords = findMostStableChords(interpretations);
    if (bestChords.length === 0) {
        return null;
    }

    const results = bestChords.map(bestChord => {
        const harmonicFunctions = reorderHarmonicFunctions(bestChord.harmonicFunctions);

        const sharpRoot = bestChord.root.includes('♭') ? simplifyNoteWithSharps(bestChord.root) : bestChord.root;
        const flatRoot = bestChord.root.includes('♯') ? simplifyNoteWithFlats(bestChord.root) : bestChord.root;

        const sharpSpelledChord = harmonicFunctionToNote(sharpRoot, harmonicFunctions);
        const flatSpelledChord = harmonicFunctionToNote(flatRoot, harmonicFunctions);

        const preferredSpelling = selectPreferredSpelling(sharpSpelledChord, flatSpelledChord);

        const preferredRoot = preferredSpelling === 'flat' ? flatRoot : sharpRoot;
        const preferredSpelledChord = preferredSpelling === 'flat' ? flatSpelledChord : sharpSpelledChord;

        const chordSymbol = buildChordSymbol(preferredRoot, harmonicFunctions, questionMode);

        let result = {
            root: preferredRoot,
            altRoot: preferredSpelling === 'flat' ? sharpRoot : flatRoot,
            notes: questionIndices.map(note => noteMap[note]),
            harmonicFunctionsFound: harmonicFunctions,
            spelledChord: preferredSpelledChord.join(', '),
            enharmonicSpelledChord: (preferredSpelling === 'flat' ? sharpSpelledChord : flatSpelledChord).join(', '),
            preferredSpelling: preferredSpelling,
            preferredSpellingNotes: preferredSpelledChord.join(', '),
            chordSymbol: chordSymbol,
            forcedRoot: questionMode === 'majorScale'
        };

        if (questionMode === 'majorScale') {
            // Reshuffle notes for major scale mode
            const sortedNotes = sortNotesInScaleOrder(preferredSpelledChord, preferredRoot);
            result.spelledChord = sortedNotes.join(', ');
            result.preferredSpellingNotes = sortedNotes.join(', ');
            result.harmonicFunctionsFound = ['1', '2', '3', '4', '5', '6', '7'];
        }

        return result;
    });

    return results.length > 1 ? results : results[0];
};