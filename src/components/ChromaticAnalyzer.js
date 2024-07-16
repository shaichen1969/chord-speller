import React, { useEffect, useState } from 'react';

const noteMap = {
    0: 'C', 1: 'C#', 2: 'D', 3: 'D#', 4: 'E', 5: 'F',
    6: 'F#', 7: 'G', 8: 'G#', 9: 'A', 10: 'A#', 11: 'B'
};

const harmonicFunctionMap = {
    0: '1', 1: 'b9', 2: '9', 3: 'b3', 4: '3', 5: '11',
    6: 'b5', 7: '5', 8: '#5', 9: '13', 10: 'b7', 11: '7'
};

const displayOrder = ['1', 'b3', '3', 'b5', '5', '#5', 'b7', '7', 'b9', '9', '#9', '11', '#11', 'b13', '13'];

const convertToTensions = (harmonicFunctions) => {
    const containsFlat3 = harmonicFunctions.includes('b3');
    const contains3 = harmonicFunctions.includes('3');
    const containsFlat5 = harmonicFunctions.includes('b5');
    const contains5 = harmonicFunctions.includes('5');
    const containsSharp5 = harmonicFunctions.includes('#5');

    console.log(`containsFlat3: ${containsFlat3}, contains3: ${contains3}, containsFlat5: ${containsFlat5}, contains5: ${contains5}, containsSharp5: ${containsSharp5}`);

    harmonicFunctions.forEach((func, index) => {
        if (func === 'b3' && contains3) {
            harmonicFunctions[index] = '#9';
        }
        if (func === '5' && containsFlat5) {
            harmonicFunctions[index] = '#11';
        }
        if (func === '#5' && (contains5 || containsFlat5)) {
            harmonicFunctions[index] = 'b13';
        }
    });

    // Remove duplicates
    return [...new Set(harmonicFunctions)];
};

const createHarmonicInterpretations = (question) => {
    let interpretations = {};

    question.forEach(root => {
        let harmonicFunctions = question.map(number =>
            harmonicFunctionMap[(number - root + 12) % 12]
        );

        console.log(`Root Note: ${noteMap[root]}`);
        console.log(`Harmonic Functions Before Conversion: ${harmonicFunctions.join(', ')}`);

        const tensionFunctions = convertToTensions([...harmonicFunctions]); // Copy array for comparison

        console.log(`Harmonic Functions After Conversion: ${tensionFunctions.join(', ')}`);

        interpretations[noteMap[root]] = {
            root: noteMap[root],
            notes: question.map(note => noteMap[note]),
            harmonicFunctions: tensionFunctions,
            harmonicFunctionsBefore: harmonicFunctions, // Store the original functions for display
            booleans: {
                containsFlat3: harmonicFunctions.includes('b3'),
                contains3: harmonicFunctions.includes('3'),
                containsFlat5: harmonicFunctions.includes('b5'),
                contains5: harmonicFunctions.includes('5'),
                containsSharp5: harmonicFunctions.includes('#5')
            }
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

const ChromaticAnalyzer = () => {
    const [question, setQuestion] = useState([]);
    const [harmonicInterpretations, setHarmonicInterpretations] = useState({});

    useEffect(() => {
        const newQuestion = getRandomNotes(4);
        setQuestion(newQuestion);
    }, []);

    useEffect(() => {
        if (question.length > 0) {
            const interpretations = createHarmonicInterpretations(question);
            setHarmonicInterpretations(interpretations);
        }
    }, [question]);

    if (question.length === 0 || Object.keys(harmonicInterpretations).length === 0) {
        return <div>Loading...</div>;
    }

    const questionNotes = question.map(num => noteMap[num]).join(', ');
    const orderedNotes = getOrderedNotes(noteMap[question[0]], question.map(num => noteMap[num])).join(', ');

    return (
        <div>
            <h3>Question: {questionNotes}</h3>
            {Object.keys(harmonicInterpretations).map((root, index) => (
                <div key={index}>
                    <div>Notes Ordered: {getOrderedNotes(root, harmonicInterpretations[root].notes).join(', ')}</div>
                    <div>Harmonic Functions Before Conversion: {
                        reorderHarmonicFunctions(harmonicInterpretations[root].harmonicFunctionsBefore).join(' ')
                    }</div>
                    <div>Harmonic Functions After Conversion: {
                        reorderHarmonicFunctions(harmonicInterpretations[root].harmonicFunctions).join(' ')
                    }</div>
                    
                   
                    <br />
                </div>
            ))}
        </div>
    );
};

export default ChromaticAnalyzer;
