import { analyzeChord } from './ChordAnalyzerUtils';
import { majorScales, noteMap } from './HarmonicUtils';

export const availableNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const noteValues = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5,
  'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};

const valueToNote = Object.fromEntries(
  Object.entries(noteValues).map(([note, value]) => [value, note])
);


const generateRandomChord = (numNotes) => {
  const notesCopy = [...availableNotes];
  let newChord = [];
  for (let i = 0; i < numNotes; i++) {
    const randomIndex = Math.floor(Math.random() * notesCopy.length);
    newChord.push(notesCopy[randomIndex]);
    notesCopy.splice(randomIndex, 1);
  }
  return newChord;
};

const generateTriad = () => {
  const rootNote = Math.floor(Math.random() * 12);
  const triadTypes = [[4, 3], [3, 4], [3, 3], [4, 4]]; // Major, Minor, Diminished, Augmented
  const selectedType = triadTypes[Math.floor(Math.random() * triadTypes.length)];

  return [
    rootNote,
    (rootNote + selectedType[0]) % 12,
    (rootNote + selectedType[0] + selectedType[1]) % 12
  ].map(note => valueToNote[note] + '4');
};

const generateSeventh = () => {
  const triad = generateTriad().map(note => noteValues[note.slice(0, -1)]);
  const seventhTypes = [10, 11]; // Minor 7th, Major 7th
  const seventh = [...triad, (triad[0] + seventhTypes[Math.floor(Math.random() * seventhTypes.length)]) % 12];
  return seventh.map(note => valueToNote[note] + '4');
};

const generateTriadPlusTension = () => {
  const triad = generateTriad();
  const triadNotes = triad.map(note => noteValues[note.slice(0, -1)]);
  const root = triadNotes[0];
  const third = triadNotes[1];
  let fifth = triadNotes[2];
  if ((fifth - root + 12) % 12 === 6) {
    // Raise the fifth by one semitone
    fifth = (fifth + 1) % 12;
    triad[2] = valueToNote[fifth] + '4';
    triadNotes[2] = fifth;
  }
  let possibleTensions = [];
  // Check if it's a major triad
  const isMajorTriad = (third - root + 12) % 12 === 4;

  // Rule 1: 9 is always a whole step above 1
  possibleTensions.push((root + 2) % 12);

  // Rule 2: 11 needs to be a whole step above 3
  if ((third + 2) % 12 !== root) {
    possibleTensions.push((third + 2) % 12);
  }

  // Rule 3: 13 always needs to be a whole step above 5
  if ((fifth + 2) % 12 !== root) {
    possibleTensions.push((fifth + 2) % 12);
  }

  // Rule 4: Exception for major triads
  if (isMajorTriad) {
    possibleTensions.push((root + 1) % 12); // ♭9
    possibleTensions.push((root + 3) % 12); // ♯9
    possibleTensions.push((fifth + 1) % 12); // ♭13
  }

  // Select a random tension from the possible ones
  const tension = possibleTensions[Math.floor(Math.random() * possibleTensions.length)];

  // Add the tension to the triad
  triad.push(valueToNote[tension] + '4');

  return triad;
};

const generateJazzChords = () => {
  const seventh = generateSeventh().map(note => noteValues[note.slice(0, -1)]);
  let isDominant = false;
  //check if chord contains major third and minor srevnth
  if (seventh[1] - seventh[0] === 4 && seventh[3] - seventh[0] === 10) {
    isDominant = true;
  } else {
    isDominant = false;
  }
  //omit the fifth if it is a dominant chord
  if (isDominant) {
    seventh.splice(2, 1);
  }
  const extensions = [14, 17, 21]; // 9th, 11th, 13th
  const numExtensions = Math.floor(Math.random() * 2) + 1; // 1 or 2 extensions
  for (let i = 0; i < numExtensions; i++) {
    const extension = extensions[Math.floor(Math.random() * extensions.length)];
    seventh.push((seventh[0] + extension) % 12);
  }
  return seventh.map(note => valueToNote[note] + '4');
};

function generateMajorScale() {
  // Major scale formula: W W H W W W H (where W = whole step, H = half step)
  const majorScaleSteps = [2, 2, 1, 2, 2, 2, 1];

  // Select a random starting note
  const startIndex = Math.floor(Math.random() * availableNotes.length);
  const startNote = availableNotes[startIndex];

  let scale = [startNote];
  let currentIndex = startIndex;

  // Generate the rest of the scale
  for (let step of majorScaleSteps) {
    currentIndex = (currentIndex + step) % availableNotes.length;
    scale.push(availableNotes[currentIndex]);
  }

   
  return scale;
}
export function generateCompleteChord(questionMode) {
  let chord;
  let analysis;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    
    chord = generateChordByMode(questionMode);

    const questionIndices = chord.map(note => availableNotes.indexOf(note));

    analysis = analyzeChord(questionIndices, questionMode);

    attempts++;
  } while ((!analysis || !analysis.chordSymbol || analysis.chordSymbol === "No stable chords found") && attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    return {
      chord: ['C4', 'E4', 'G4'],
      analysis: {
        chordSymbol: 'C',
        root: 'C',
        harmonicFunctionsFound: ['1', '3', '5'],
        preferredSpellingNotes: 'C4, E4, G4',
        sharpSpelling: 'C4, E4, G4',
        flatSpelling: 'C4, E4, G4',
        questionMode
      }
    };
  }

  return { chord, analysis };
}

function generateChordByMode(questionMode) {
  let generatedChord;
  switch (questionMode) {
    case 'triad':
      generatedChord = generateTriad();
      break;
    case 'seventh':
      generatedChord = generateSeventh();
      break;
    case 'triadPlusTension':
      generatedChord = generateTriadPlusTension();
      break;
    case 'jazzChords':
      generatedChord = generateJazzChords();
      break;
    case 'random3':
      generatedChord = generateRandomChord(3);
      break;
    case 'random4':
      generatedChord = generateRandomChord(4);
      break;
    case 'random5':
      generatedChord = generateRandomChord(5);
      break;
    case 'majorScale':
      generatedChord = generateMajorScale();
      break;
    default:
      generatedChord = generateRandomChord(4);
  }
  return generatedChord;
}