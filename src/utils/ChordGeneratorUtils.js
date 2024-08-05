import { analyzeChord } from './ChordAnalyzerUtils';

const noteValues = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5,
  'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};

const valueToNote = Object.fromEntries(
  Object.entries(noteValues).map(([note, value]) => [value, note])
);

const availableNotes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'];

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

const generateExtended = () => {
  const seventh = generateSeventh().map(note => noteValues[note.slice(0, -1)]);
  const extensions = [14, 17, 21]; // 9th, 11th, 13th
  const numExtensions = Math.floor(Math.random() * 2) + 1; // 1 or 2 extensions
  
  for (let i = 0; i < numExtensions; i++) {
    const extension = extensions[Math.floor(Math.random() * extensions.length)];
    seventh.push((seventh[0] + extension) % 12);
  }
  
  return seventh.map(note => valueToNote[note] + '4');
};
const generateJazzChords = () => {
  const seventh = generateSeventh().map(note => noteValues[note.slice(0, -1)]);
  let isDominant=false;
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

export function generateCompleteChord(questionMode, numNotes = 4) {
  let chord;
  switch (questionMode) {
    case 'random':
      chord = generateRandomChord(numNotes);
      break;
    case 'triad':
      chord = generateTriad();
      break;
    case 'seventh':
      chord = generateSeventh();
      break;
    case 'extended':
      chord = generateExtended();
      break;
    default:
      chord = generateTriad();
  }

  const questionIndices = chord.map(note => availableNotes.indexOf(note));
  const analysis = analyzeChord(questionIndices);

  if (analysis === null || !analysis.chordSymbol || analysis.chordSymbol === "No stable chords found") {
    // If the generated chord is not valid, try again
    return generateCompleteChord(questionMode, numNotes);
  }

  return chord;
}