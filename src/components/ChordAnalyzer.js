import React, { useMemo } from 'react';
import { usePiano } from '../PianoContext';
import '../styles/ChordAnalyzer.css';

const noteToInt = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8,
    'A': 9, 'A#': 10, 'Bb': 10, 'B': 11,
};

const intToNote = {
    0: 'C', 1: 'C#', 2: 'D', 3: 'Eb', 4: 'E',
    5: 'F', 6: 'F#', 7: 'G', 8: 'Ab', 9: 'A',
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

const ChordAnalyzer = ({ currentQuestion }) => {
    const { notes } = usePiano();

    const analyzeChord = useMemo(() => {
        const sortNotes = (notes) => {
            return notes.sort((a, b) => {
                const pitchA = a.slice(0, -1);
                const pitchB = b.slice(0, -1);
                return noteToInt[pitchA] - noteToInt[pitchB];
            });
        };

        const normalize = (arr) => {
            const base = arr[0];
            return arr.map(note => (note - base + 12) % 12);
        };

        const handleSpecialCases = (functions, rootNoteInt) => {
            const set = new Set(functions);
            if (set.has('♭3') && set.has('3')) functions = functions.map(f => (f === '♭3' ? '♯9' : f));
            if (set.has('♭5') && set.has('5')) functions = functions.map(f => (f === '♭5' ? '♯11' : f));
            if (set.has('♯5') && set.has('5')) functions = functions.map(f => (f === '♯5' ? '♭13' : f));
            if (set.has('♭5') && set.has('♯5')) functions = functions.map(f => (f === '♯5' ? '♭13' : f));
            if (set.has('6') && (rootNoteInt === 5 || rootNoteInt === 11)) {
                functions = functions.map(f => (f === '6' ? '♭13' : f));
            }
            return functions;
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

        const adjustRootNote = (rootNote, isMinor) => {
            const majorRootNoteMap = { 'C#': 'Db', 'D#': 'Eb', 'F#': 'F#', 'G#': 'Ab', 'A#': 'Bb' };
            const minorRootNoteMap = { 'C#': 'C#', 'D#': 'Eb', 'F#': 'F#', 'G#': 'Ab', 'A#': 'Bb' };
            return isMinor ? (minorRootNoteMap[rootNote] || rootNote) : (majorRootNoteMap[rootNote] || rootNote);
        };

        const buildChordSymbol = (rootNote, harmonicFunctions) => {
            const isMinor = harmonicFunctions.includes('♭3');
            const isDiminished = harmonicFunctions.includes('♭3') && harmonicFunctions.includes('♭5');
            const isAugmented = harmonicFunctions.includes('3') && harmonicFunctions.includes('♯5');
            rootNote = adjustRootNote(rootNote, isMinor);
            let symbol = rootNote;

            if (isDiminished) symbol += '°';
            else if (isAugmented) symbol += '+';
            else if (isMinor) symbol += 'm';

            if (harmonicFunctions.includes('♭5') && !isDiminished) symbol += '♭5';
            else if (harmonicFunctions.includes('♯5') && !isAugmented) symbol += '♯5';

            const extensions = ['7', '9', '11', '13'].filter(ext =>
                harmonicFunctions.includes(ext) ||
                harmonicFunctions.includes(`♭${ext}`) ||
                harmonicFunctions.includes(`♯${ext}`)
            );

            extensions.forEach(ext => {
                const type = harmonicFunctions.find(func => func.includes(ext));
                if (type === '7') symbol += 'Δ7';
                else if (type === '♭7') symbol += '7';
                else if (type !== '5') symbol += type;
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
                }
            }

            if (missingOvertones.size > 0) {
                symbol += ' no ' + Array.from(missingOvertones).join(' ');
            }

            return symbol;
        };

        if (currentQuestion.length === 0) {
            return { symbol: '', functions: [], notes: [] };
        }

        const sortedCurrentQuestion = sortNotes(currentQuestion);
        const chord = sortedCurrentQuestion.map(note => noteToInt[note.slice(0, -1)]);
        const inversions = getInversions(chord);

        const inversionsWithHarmonicFunctions = inversions.map((inversion, index) => {
            let functions = inversion.map(noteInt => harmonicFunctionMap[noteInt]);
            functions = handleSpecialCases(functions, inversion[0]);
            if (!isValidInversion(functions)) return null;
            const sortedFunctions = sortHarmonicFunctions(functions);
            const score = calculateInversionScore(sortedFunctions);
            return { inversion: sortedFunctions, score, index, functions };
        }).filter(Boolean);

        if (inversionsWithHarmonicFunctions.length === 0) {
            return { symbol: 'N/A', functions: [], notes: sortedCurrentQuestion };
        }

        const { inversion: mostStableInversion, index: mostStableIndex } = findMostStableChord(inversionsWithHarmonicFunctions);
        const mostStableRoot = intToNote[chord[mostStableIndex]];
        const symbol = buildChordSymbol(mostStableRoot, mostStableInversion);

        return {
            symbol,
            functions: mostStableInversion,
            notes: sortedCurrentQuestion
        };
    }, [currentQuestion]);

    return analyzeChord;
};

export default ChordAnalyzer;