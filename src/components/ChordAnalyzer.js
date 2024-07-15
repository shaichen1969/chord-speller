import { useMemo } from 'react';
import {
    noteToInt,
    intToNote,
    harmonicFunctionMap,
    harmonicFunctionOrder,
    harmonicFunctionScores,
    buildChordSymbol,
    getNoteFromFunction,
    determineOptimalSpelling
} from '../utils/HarmonicUtils';

const ChordAnalyzer = ({ currentQuestion }) => {
    console.log(currentQuestion);
    const analyzeChord = useMemo(() => {
        console.log('Analyzing chord. Current question:', currentQuestion);

        const sortNotes = (notes) => {
            return notes.sort((a, b) => {
                const pitchA = a.slice(0, -1);
                const pitchB = b.slice(0, -1);
                return (noteToInt[pitchA] || 0) - (noteToInt[pitchB] || 0);
            });
        };

        const normalize = (arr) => {
            const base = arr[0];
            return arr.map(note => (note - base + 12) % 12);
        };

        const handleSpecialCases = (functions, intervals) => {
            let newFunctions = [...functions];
            for (let i = 0; i < intervals.length; i++) {
                if (intervals[i] === 6) {
                    newFunctions[i] = '♭5';
                }
            }

            const set = new Set(newFunctions);
            if (set.has('♭3') && set.has('3')) newFunctions = newFunctions.map(f => (f === '♭3' ? '♯9' : f));
            if (set.has('♭5') && set.has('5')) newFunctions = newFunctions.map(f => (f === '5' ? '♯11' : f));
            if (set.has('♯5') && set.has('5')) newFunctions = newFunctions.map(f => (f === '♯5' ? '♭13' : f));
            return newFunctions;
        };

        const isValidInversion = (functions, rootNote) => {
            const set = new Set(functions);
            return !(
                (set.has('♭9') && set.has('9')) ||
                (set.has('9') && set.has('♯9')) ||
                (set.has('♭7') && set.has('7')) ||
                (set.has('11') && set.has('♯11')) ||
                (set.has('♭13') && set.has('13')) ||
                (set.has('1') && set.has('♭3') && set.has('♯5'))
            );
        };

        const getInversions = (chord) => {
            return chord.map((_, i) => normalize(chord.slice(i).concat(chord.slice(0, i))));
        };

        const sortHarmonicFunctions = (functions) => {
            return harmonicFunctionOrder.filter(func => functions.includes(func));
        };

        const calculateInversionScore = (functions) => {
            return functions.reduce((acc, func) => acc + (harmonicFunctionScores[func] || 0), 0);
        };

        const findMostStableChord = (inversionsWithHarmonicFunctions) => {
            return inversionsWithHarmonicFunctions.reduce((best, current) => {
                return current.score < best.score ? current : best;
            }, { score: Infinity });
        };

        if (!currentQuestion || currentQuestion.length === 0) {
            console.log('Empty or invalid question. Returning default values.');
            return { symbol: '', functions: [], notes: [], spelledNotes: [] };
        }

        const sortedCurrentQuestion = sortNotes(currentQuestion);
        console.log('Sorted question:', sortedCurrentQuestion);

        const chord = sortedCurrentQuestion.map(note => {
            const pitch = note.slice(0, -1);
            const intValue = noteToInt[pitch];
            if (intValue === undefined) {
                console.warn(`Invalid note: ${note}`);
            }
            return intValue;
        }).filter(value => value !== undefined);

        console.log('Chord as integers:', chord);

        if (chord.length === 0) {
            console.log('No valid notes in the chord. Returning default values.');
            return { symbol: '', functions: [], notes: [], spelledNotes: [] };
        }

        const inversions = getInversions(chord);
        console.log('Inversions:', inversions);

        const inversionsWithHarmonicFunctions = inversions.map((inversion, index) => {
            let functions = inversion.map(noteInt => harmonicFunctionMap[noteInt]);
            functions = handleSpecialCases(functions, inversion);
            const rootNote = intToNote[chord[index]];
            if (!rootNote || !isValidInversion(functions, rootNote)) return null;
            const sortedFunctions = sortHarmonicFunctions(functions);
            const score = calculateInversionScore(sortedFunctions);
            return { inversion: sortedFunctions, score, index, functions };
        }).filter(Boolean);

        console.log('Inversions with harmonic functions:', inversionsWithHarmonicFunctions);

        if (inversionsWithHarmonicFunctions.length === 0) {
            console.log('No valid inversions found. Returning N/A.');
            return { symbol: 'N/A', functions: [], notes: sortedCurrentQuestion, spelledNotes: [] };
        }

        const { inversion: mostStableInversion, index: mostStableIndex } = findMostStableChord(inversionsWithHarmonicFunctions);
        console.log('Most stable inversion:', mostStableInversion);
        console.log('Most stable index:', mostStableIndex);

        const rootNote = intToNote[chord[mostStableIndex]];
        console.log('Root note:', rootNote);

        if (!rootNote) {
            console.log('Invalid root note. Returning N/A.');
            return { symbol: 'N/A', functions: [], notes: sortedCurrentQuestion, spelledNotes: [] };
        }

        const optimalRootNote = determineOptimalSpelling(rootNote, mostStableInversion);
        console.log('Optimal root note:', optimalRootNote);

        const symbol = buildChordSymbol(optimalRootNote, mostStableInversion);
        console.log('Built chord symbol:', symbol);

        const spelledNotes = mostStableInversion.map(func =>
            getNoteFromFunction(optimalRootNote, func, mostStableInversion)
        );

        console.log('Analyzed Chord Functions:', mostStableInversion);
        console.log('Spelled Notes:', spelledNotes);

        return {
            symbol,
            functions: mostStableInversion,
            notes: sortedCurrentQuestion,
            spelledNotes,
            root: optimalRootNote,
            isMinor: mostStableInversion.includes('♭3'),
            isDiminished: mostStableInversion.includes('♭5')
        };
    }, [currentQuestion]);

    return analyzeChord;
};

export default ChordAnalyzer;
