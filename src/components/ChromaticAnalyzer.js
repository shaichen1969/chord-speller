import React, { useEffect, useState } from 'react';

const noteMap = {
    0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F',
    6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'
};

const majorScales = {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
    'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'D#': ['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C##'],
    'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
    'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'G#': ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F##'],
    'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']
};

const harmonicFunctionMap = {
    0: '1', 1: 'b9', 2: '9', 3: 'b3', 4: '3', 5: '11',
    6: 'b5', 7: '5', 8: '#5', 9: '13', 10: 'b7', 11: '7'
};

const displayOrder = ['1', 'b3', '3', 'b5', '5', '#5', 'b7', '7', 'b9', '9', '#9', '11', '#11', 'b13', '13'];

const scoreMap = {
    '1': 0, 'b3': 3, '3': 3, 'b5': 5, '5': 5, '#5': 5,
    'b7': 7, '7': 7, 'b9': 9, '9': 9, '#9': 9,
    '11': 11, '#11': 11, 'b13': 13, '13': 13
};

const harmonicFunctionToNote = (root, harmonicFunctions) => {
    const scale = majorScales[root];
    const notes = harmonicFunctions.map(func => {
        switch (func) {
            case '1': return scale[0];
            case 'b9': return 'b' + scale[1];
            case '9': return scale[1];
            case '#9': return '#' + scale[1];
            case 'b3': return 'b' + scale[2];
            case '3': return scale[2];
            case '11': return scale[3];
            case '#11': return '#' + scale[3];
            case 'b5': return 'b' + scale[4];
            case '5': return scale[4];
            case '#5': return '#' + scale[4];
            case 'b13': return 'b' + scale[5];
            case '13': return scale[5];
            case 'b7': return 'b' + scale[6];
            case '7': return scale[6];
            default: return '';
        }
    });
    return notes;
};

const convertToTensions = (harmonicFunctions) => {
    const containsFlat3 = harmonicFunctions.includes('b3');
    const contains3 = harmonicFunctions.includes('3');
    const containsFlat5 = harmonicFunctions.includes('b5');
    const contains5 = harmonicFunctions.includes('5');
    const containsSharp5 = harmonicFunctions.includes('#5');

    harmonicFunctions.forEach((func, index) => {
        if (func === 'b3' && contains3) {
            harmonicFunctions[index] = '#9';
        }
        if (func === 'b5' && contains5) {
            harmonicFunctions[index] = '#11';
        }
        if (func === '#5' && (contains5 || containsFlat5)) {
            harmonicFunctions[index] = 'b13';
        }
    });

    // Remove duplicates
    return [...new Set(harmonicFunctions)];
};

const invalidateQuestion = (question) => {
    const sortedQuestion = [...question].sort((a, b) => a - b);
    for (let i = 0; i < sortedQuestion.length - 2; i++) {
        if (sortedQuestion[i + 1] - sortedQuestion[i] === 1 && sortedQuestion[i + 2] - sortedQuestion[i + 1] === 1) {
            return true;
        }
        
    }
    return false;
};

const createHarmonicInterpretations = (question) => {
    let interpretations = {};

    question.forEach(root => {
        let harmonicFunctions = question.map(number =>
            harmonicFunctionMap[(number - root + 12) % 12]
        );

        // Invalidate chord if it contains both b3 and #5
        if (harmonicFunctions.includes('b3') && harmonicFunctions.includes('#5')) {
            return interpretations;
        }

        const tensionFunctions = convertToTensions([...harmonicFunctions]); // Copy array for comparison

        interpretations[noteMap[root]] = {
            root: noteMap[root],
            notes: question.map(note => noteMap[note]),
            harmonicFunctions: tensionFunctions,
            harmonicFunctionsBefore: harmonicFunctions // Store the original functions for display
        };
    });

    return interpretations;
};

const reorderHarmonicFunctions = (harmonicFunctions) => {
    return displayOrder.filter(func => harmonicFunctions.includes(func));
};

const getRandomNotes = (numNotes) => {
    const notes = [];
    while (notes.length < numNotes) {
        const randomNote = Math.floor(Math.random() * 12);
        if (!notes.includes(randomNote)) {
            notes.push(randomNote);
        }
    }
    return notes;
};

const getOrderedNotes = (root, notes) => {
    const rootIndex = Object.keys(noteMap).find(key => noteMap[key] === root);
    let chromaticScale = [];

    for (let i = 0; i < 12; i++) {
        chromaticScale.push(noteMap[(parseInt(rootIndex) + i) % 12]);
    }

    return chromaticScale.filter(note => notes.includes(note));
};

const calculateChordScore = (harmonicFunctions) => {
    return harmonicFunctions.reduce((score, func) => score + (scoreMap[func] || 0), 0);
};

const findMostStableChord = (interpretations) => {
    let bestChord = null;
    let lowestScore = Infinity;

    for (const root in interpretations) {
        const { harmonicFunctions } = interpretations[root];
        const score = calculateChordScore(harmonicFunctions);

        if (score < lowestScore) {
            lowestScore = score;
            bestChord = { root, score, harmonicFunctions };
        }
    }

    return bestChord;
};

const ChromaticAnalyzer = () => {
    const [question, setQuestion] = useState([]);
    const [harmonicInterpretations, setHarmonicInterpretations] = useState({});
    const [mostStableChord, setMostStableChord] = useState(null);
    const [isInvalid, setIsInvalid] = useState(false);

    useEffect(() => {
        const newQuestion = getRandomNotes(4);
        setQuestion(newQuestion);
    }, []);

    useEffect(() => {
        if (question.length > 0) {
            const invalid = invalidateQuestion(question);
            setIsInvalid(invalid);

            if (!invalid) {
                const interpretations = createHarmonicInterpretations(question);
                setHarmonicInterpretations(interpretations);

                const bestChord = findMostStableChord(interpretations);
                setMostStableChord(bestChord);
            }
        }
    }, [question]);

    if (question.length === 0) {
        return <div>Loading...</div>;
    }

    const questionNotes = question.map(num => noteMap[num]).join(', ');
    const orderedNotes = getOrderedNotes(noteMap[question[0]], question.map(num => noteMap[num])).join(', ');

    return (
        <div>
            <h3>Question: {questionNotes}</h3>
            <h3>Ordered Notes: {orderedNotes}</h3>
            {isInvalid ? (
                <div>No stable chords found</div>
            ) : (
                <>
                    {Object.keys(harmonicInterpretations).map((root, index) => (
                        <div key={index}>
                            <h3>Root Note: {root}</h3>
                            <div>Harmonic Functions Before Conversion: {
                                reorderHarmonicFunctions(harmonicInterpretations[root].harmonicFunctionsBefore).join(' ')
                            }</div>
                            <div>Harmonic Functions After Conversion: {
                                reorderHarmonicFunctions(harmonicInterpretations[root].harmonicFunctions).join(' ')
                            }</div>
                            <div>Notes Order: {getOrderedNotes(root, harmonicInterpretations[root].notes).join(', ')}</div>
                            <br />
                        </div>
                    ))}
                    <h3>Most Stable Chord:</h3>
                    {mostStableChord ? (
                        <div>
                            <h4>Root Note: {mostStableChord.root}</h4>
                            <div>Score: {mostStableChord.score}</div>
                            <div>Harmonic Functions: {reorderHarmonicFunctions(mostStableChord.harmonicFunctions).join(' ')}</div>
                            <div>Chord Notes: {harmonicFunctionToNote(mostStableChord.root, mostStableChord.harmonicFunctions).join(', ')}</div>
                        </div>
                    ) : (
                        <div>No valid chords found</div>
                    )}
                </>
            )}
        </div>
    );
};

export default ChromaticAnalyzer;
