import { analyzeChord } from './ChordAnalyzerUtils';

const noteValues = {
  'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 
  'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
};

const valueToNote = Object.fromEntries(
  Object.entries(noteValues).map(([note, value]) => [value, note])
);

export function generateCompleteChord(numNotes) {
  if (numNotes < 3 || numNotes > 7) {
    throw new Error('Number of notes must be between 3 and 7');
  }

  const rootNote = Math.floor(Math.random() * 12);
  let chord;

  do {
    chord = [rootNote];
    
    // Add third (major or minor)
    chord.push((rootNote + (Math.random() < 0.5 ? 4 : 3)) % 12);
    
    // Add fifth (perfect, diminished, or augmented)
    const fifthOptions = [6, 7, 8]; // ♭5, 5, ♯5
    chord.push((rootNote + fifthOptions[Math.floor(Math.random() * fifthOptions.length)]) % 12);

    if (numNotes >= 4) {
      // Decide whether to add a seventh or a tension
      if (Math.random() < 0.7 || numNotes > 4) { // 70% chance for seventh or if more than 4 notes
        // Add seventh (major or minor)
        chord.push((rootNote + (Math.random() < 0.5 ? 11 : 10)) % 12);
      } else {
        // Add a tension (9, 11, or 13)
        const tensions = [14, 17, 21]; // 9, 11, 13
        chord.push((rootNote + tensions[Math.floor(Math.random() * tensions.length)]) % 12);
      }
    }

    if (numNotes >= 5) {
      // Add remaining tensions or sevenths
      const remainingOptions = [10, 11, 14, 17, 21].filter(interval => {
        const noteValue = (rootNote + interval) % 12;
        return !chord.includes(noteValue);
      });
      while (chord.length < numNotes && remainingOptions.length > 0) {
        const optionIndex = Math.floor(Math.random() * remainingOptions.length);
        chord.push((rootNote + remainingOptions[optionIndex]) % 12);
        remainingOptions.splice(optionIndex, 1);
      }
    }

    // Shuffle the chord tones (except the root)
    for (let i = chord.length - 1; i > 1; i--) {
      const j = 1 + Math.floor(Math.random() * (i - 1));
      [chord[i], chord[j]] = [chord[j], chord[i]];
    }

  } while (!isValidChord(chord));

  return chord.map(note => valueToNote[note] + '4');
}

function isValidChord(chord) {
  const analysis = analyzeChord(chord);
  return analysis && analysis.chordSymbol && analysis.chordSymbol !== "No stable chords found";
}