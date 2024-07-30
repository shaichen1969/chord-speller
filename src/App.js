// App.js t

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
  const { playNote, playChord, notes, sampler } = usePiano();

  const availableNotes = useMemo(() => ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'], []);

  useEffect(() => {
    logEvent(analytics, 'session_start');
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
    setFeedback({});
    setCorrectGuesses(0);

    const questionIndices = newQuestion.map(note => availableNotes.indexOf(note));
    const analysis = analyzeChord(questionIndices);
    console.log("Generated question:", newQuestion);
    console.log("Analyzed chord:", analysis);

    if (analysis === null || !analysis.chordSymbol) {
      setAnalyzedChord({ chordSymbol: "No stable chords found" });
    } else {
      setAnalyzedChord(analysis);
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
  }, [generateNewQuestion, playChord, gameLength, numNotes, setGameState]);

  const handleGuess = useCallback((note) => {
    if (currentQuestion.includes(note) && !feedback[note]) {
      setFeedback(prevFeedback => ({ ...prevFeedback, [note]: 'correct' }));
      setCorrectGuesses(prevCorrectGuesses => prevCorrectGuesses + 1);

      if (correctGuesses + 1 === currentQuestion.length) {
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
    } else if (!feedback[note]) {
      setFeedback(prevFeedback => ({ ...prevFeedback, [note]: 'incorrect' }));
      setScore(prevScore => Math.max(0, prevScore - 5 * numNotes));
      logEvent(analytics, 'incorrect_guess', { numNotes: numNotes });
    }
  }, [currentQuestion, feedback, correctGuesses, generateNewQuestion, playChord, numNotes, score, sampler]);

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