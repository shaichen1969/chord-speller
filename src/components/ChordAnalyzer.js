// ChordAnalyzer.js

import { useMemo } from 'react';
import {
    noteToInt,
    intToNote,
    harmonicFunctionMap,
    harmonicFunctionOrder,
    harmonicFunctionScores,
    buildChordSymbol,
    getNoteFromFunction,
} from '../utils/HarmonicUtils';

const ChordAnalyzer = ({ currentQuestion }) => {
    const analyzeChord = useMemo(() => {
        if (!currentQuestion || !Array.isArray(currentQuestion) || currentQuestion.length === 0) {
             
            return { symbol: '', functions: [], notes: [], spelledNotes: [] };
        }

         

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

        const isValidInversion = (functions) => {
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

        const sortedCurrentQuestion = sortNotes(currentQuestion);
        

        const chord = sortedCurrentQuestion.map(note => {
            const pitch = note.slice(0, -1);
            return noteToInt[pitch];
        }).filter(value => value !== undefined);

         

        if (chord.length === 0) {
            
            return { symbol: '', functions: [], notes: sortedCurrentQuestion, spelledNotes: [] };
        }

        const inversions = getInversions(chord);
         

        const inversionsWithHarmonicFunctions = inversions.map((inversion, index) => {
            let functions = inversion.map(noteInt => harmonicFunctionMap[noteInt]);
            functions = handleSpecialCases(functions, inversion);
            const rootNote = sortedCurrentQuestion[index].slice(0, -1);
            if (!rootNote || !isValidInversion(functions)) return null;
            const sortedFunctions = sortHarmonicFunctions(functions);
            const score = calculateInversionScore(sortedFunctions);
            return { inversion: sortedFunctions, score, index, rootNote, functions };
        }).filter(Boolean);

      

        if (inversionsWithHarmonicFunctions.length === 0) {
           
            return { symbol: '', functions: [], notes: sortedCurrentQuestion, spelledNotes: [] };
        }

        const { inversion: mostStableInversion, index: mostStableIndex, rootNote } = findMostStableChord(inversionsWithHarmonicFunctions);

        if (!rootNote) {
           
            return { symbol: '', functions: [], notes: sortedCurrentQuestion, spelledNotes: [] };
        }

        const symbol = buildChordSymbol(rootNote, mostStableInversion);
         


        const spelledNotes = mostStableInversion.map(func =>
            getNoteFromFunction(rootNote, func, mostStableInversion)
        );

       

        return {
            symbol,
            functions: mostStableInversion,
            notes: sortedCurrentQuestion,
            spelledNotes,
            root: rootNote,
            isMinor: mostStableInversion.includes('♭3'),
            isDiminished: mostStableInversion.includes('♭5')
        };
    }, [currentQuestion]);

    return analyzeChord;
};

export default ChordAnalyzer;
