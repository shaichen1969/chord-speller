// App.js test

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/NavBar';
import Piano from './components/Piano';
import GameCenter from './components/GameControlCenter';
import { analyzeChord } from './utils/ChordAnalyzerUtils';
import HarmonicTree from './components/HarmonicTree';
import { PianoProvider, usePiano } from './PianoContext';
import Documentation from './components/Documentation';
import correctSound from './assets/media/piano/correct.mp3';
import './styles/App.css';
import { analytics } from './Firebase';
import { logEvent } from "firebase/analytics";

function AppContent() {
  const [gameState, setGameState] = useState('idle');
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [analyzedChord, setAnalyzedChord] = useState(null);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [roundActive, setRoundActive] = useState(false);
  const [numNotes, setNumNotes] = useState(2);
  const [pianoSound, setPianoSound] = useState(true);
  const [gameLength, setGameLength] = useState(60);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const [expectedNotes, setExpectedNotes] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const { playNote, playChord, notes, sampler } = usePiano();

  const availableNotes = useMemo(() => ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'], []);

  useEffect(() => {
    logEvent(analytics, 'session_start', { app: 'Chord Spelling Master' });
  }, []);

  const endRound = useCallback(() => {
    setGameState('finished');
    setRoundActive(false);
    setCurrentQuestion([]);
    setAnalyzedChord(null);
    setCorrectGuesses(0);
    setFinalScore(score);
    setTimeLeft(gameLength === Infinity ? Infinity : gameLength);
    logEvent(analytics, 'round_end', { score: score, gameLength: gameLength, numNotes: numNotes });
  }, [gameLength, score, numNotes]);

  const generateNewQuestion = useCallback(() => {
    const newQuestion = [];
    const notesCopy = [...availableNotes];

    for (let i = 0; i < numNotes; i++) {
      const randomIndex = Math.floor(Math.random() * notesCopy.length);
      newQuestion.push(notesCopy[randomIndex]);
      notesCopy.splice(randomIndex, 1);
    }

    setCurrentQuestion(newQuestion);
    setFeedback({}); // Reset feedback completely
    setCorrectGuesses(0);
    setCurrentNoteIndex(0);

    const questionIndices = newQuestion.map(note => availableNotes.indexOf(note));
    const analysis = analyzeChord(questionIndices);
    console.log("Generated question:", newQuestion);
    console.log("Analyzed chord:", analysis);
    console.log("Expected note order (spelledChord):", analysis.spelledChord);

    if (analysis === null || !analysis.chordSymbol) {
      console.log("No stable chords found");
      setAnalyzedChord({ chordSymbol: "No stable chords found" });
      setExpectedNotes([]);
    } else {
      setAnalyzedChord(analysis);
      // Convert the spelledChord string to an array and replace ♯ with # and ♭ with b
      const spelledChordArray = analysis.spelledChord.split(', ').map(note => note.replace('♯', '#').replace('♭', 'b'));
      setExpectedNotes(spelledChordArray);
      console.log("New question - Expected notes set to:", spelledChordArray);
    }

    return newQuestion;
  }, [numNotes, availableNotes]);

  useEffect(() => {
    if (gameLength !== Infinity && timeLeft === Infinity) {
      setTimeLeft(gameLength);
    }
  }, [gameLength, timeLeft]);

  useEffect(() => {
    let timer;
    if (roundActive && timeLeft > 0 && gameLength !== Infinity) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (typeof prevTime !== 'number' || isNaN(prevTime)) {
            return gameLength;
          }
          return Math.max(0, prevTime - 1);
        });
      }, 1000);
    } else if (timeLeft === 0 && gameLength !== Infinity) {
      endRound();
    }
    return () => clearInterval(timer);
  }, [roundActive, timeLeft, gameLength, endRound]);

  const startRound = useCallback(() => {
    setGameState('playing');
    setRoundActive(true);
    setScore(0);
    setFinalScore(0);
    setTimeLeft(gameLength === Infinity ? Infinity : gameLength);
    const newQuestion = generateNewQuestion();
    console.log("Playing chord:", newQuestion);
    playChord(newQuestion);
    logEvent(analytics, 'round_start', { gameLength: gameLength, numNotes: numNotes });
  }, [generateNewQuestion, playChord, gameLength, numNotes]);

  const handleGuess = useCallback((note) => {
    const guessedNoteWithoutOctave = note.slice(0, -1);  // Remove the last character (octave)
    const expectedNote = expectedNotes[currentNoteIndex];
    
    // Function to normalize note names
    const normalizeNote = (noteName) => {
      const sharpToFlat = {
        'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
        'C♯': 'Db', 'D♯': 'Eb', 'F♯': 'Gb', 'G♯': 'Ab', 'A♯': 'Bb'
      };
      // Replace ♭ (Unicode flat symbol) with b
      noteName = noteName.replace('♭', 'b');
      return sharpToFlat[noteName] || noteName;
    };

    const normalizedGuess = normalizeNote(guessedNoteWithoutOctave);
    const normalizedExpected = normalizeNote(expectedNote);

    console.log(`Guessed: ${note} (${guessedNoteWithoutOctave}) | Expected: ${expectedNote} | Normalized Guess: ${normalizedGuess} | Normalized Expected: ${normalizedExpected} | Match: ${normalizedGuess === normalizedExpected}`);
    console.log("Current note index:", currentNoteIndex);
    console.log("Full expected notes array:", expectedNotes);

    if (normalizedGuess === normalizedExpected) {
      console.log("Correct guess!");
      setFeedback(prevFeedback => {
        // Remove all 'incorrect' feedbacks
        const newFeedback = Object.fromEntries(
          Object.entries(prevFeedback).filter(([_, value]) => value !== 'incorrect')
        );
        // Add the new correct feedback
        newFeedback[note] = 'correct';
        return newFeedback;
      });
      setCorrectGuesses(prevCorrectGuesses => prevCorrectGuesses + 1);
      setCurrentNoteIndex(prevIndex => prevIndex + 1);

      if (currentNoteIndex + 1 === expectedNotes.length) {
        console.log("All notes guessed correctly!");
        setScore(prevScore => prevScore + (5 * numNotes));
        setShowCheckmark(true);

        if (sampler) {
          sampler.releaseAll();
        }

        const audio = new Audio(correctSound);
        setTimeout(() => audio.play(), 100);

        setTimeout(() => {
          setShowCheckmark(false);
          const newQuestion = generateNewQuestion();
          playChord(newQuestion);
        }, 1000);
        logEvent(analytics, 'correct_chord', { numNotes: numNotes, score: score + (5 * numNotes) });
      }
    } else {
      console.log("Incorrect guess");
      if (!feedback[note]) {
        setFeedback(prevFeedback => ({ ...prevFeedback, [note]: 'incorrect' }));
        setScore(prevScore => Math.max(0, prevScore - 5));
        logEvent(analytics, 'incorrect_guess', { numNotes: numNotes });
      }
    }
  }, [currentNoteIndex, expectedNotes, feedback, correctGuesses, generateNewQuestion, playChord, numNotes, score, sampler]);

  const handleSkip = useCallback(() => {
    const newQuestion = generateNewQuestion();
    playChord(newQuestion);
    setScore(prevScore => Math.max(0, prevScore - (5 * numNotes)));
    logEvent(analytics, 'skip_question', { numNotes: numNotes });
  }, [generateNewQuestion, playChord, numNotes]);

  const onPlayReference = useCallback(() => {
    playChord('C4');
    setScore(prevScore => Math.max(0, prevScore - 5));
    logEvent(analytics, 'play_reference');
  }, [playChord]);

  const handleSetNumNotes = useCallback((newNumNotes) => {
    setNumNotes(newNumNotes);
    endRound();
    logEvent(analytics, 'difficulty_change', { numNotes: newNumNotes });
  }, [endRound]);

  const handleSetGameLength = useCallback((newGameLength) => {
    setGameLength(newGameLength);
    setTimeLeft(newGameLength === Infinity ? Infinity : newGameLength);
    if (roundActive) {
      endRound();
    }
    logEvent(analytics, 'game_length_change', { gameLength: newGameLength });
  }, [endRound, roundActive]);

  const openDocumentation = useCallback(() => {
    setIsDocumentationOpen(true);
    logEvent(analytics, 'open_documentation');
  }, []);

  const closeDocumentation = useCallback(() => {
    setIsDocumentationOpen(false);
  }, []);

  return (
    <div className="App">
      <Navbar
        numNotes={numNotes}
        setNumNotes={handleSetNumNotes}
        pianoSound={pianoSound}
        setPianoSound={setPianoSound}
        gameLength={gameLength}
        setGameLength={handleSetGameLength}
        openDocumentation={openDocumentation}
      />
      <main className="app-content">
        <GameCenter
          gameState={gameState}
          setGameState={setGameState}
          currentQuestion={currentQuestion}
          generateNewQuestion={generateNewQuestion}
          playChord={playChord}
          score={score}
          setScore={setScore}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          roundActive={roundActive}
          startRound={startRound}
          endRound={endRound}
          numNotes={numNotes}
          onPlayReference={onPlayReference}
          gameLength={gameLength}
          finalScore={finalScore}
          onSkip={handleSkip}
        />
        <Piano
          feedback={feedback}
          gameState={gameState}
          currentQuestion={currentQuestion}
          onGuess={handleGuess}
          pianoSound={pianoSound}
          playNote={playNote}
          showCheckmark={showCheckmark}
        />
        {currentQuestion.length < 6 && analyzedChord && (
          <HarmonicTree chordAnalysis={analyzedChord} />
        )}
      </main>
      <Documentation isOpen={isDocumentationOpen} onClose={closeDocumentation} />
    </div>
  );
}

function App() {
  return (
    <PianoProvider>
      <AppContent />
    </PianoProvider>
  );
}

export default App;