import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/NavBar';
import Piano from './components/Piano';
import GameCenter from './components/GameControlCenter';
import { analyzeChord } from './utils/ChordAnalyzerUtils';
import HarmonicTree from './components/HarmonicTree';
import { PianoProvider, usePiano } from './PianoContext';
import Documentation from './components/Documentation';
import './styles/App.css';

function AppContent() {
  const [gameState, setGameState] = useState('idle');
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [analyzedChord, setAnalyzedChord] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [roundActive, setRoundActive] = useState(false);
  const [numNotes, setNumNotes] = useState(3);
  const [pianoSound, setPianoSound] = useState(true);
  const [gameLength, setGameLength] = useState(60);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const { playNote, playChord, notes } = usePiano();
  const availableNotes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4'];

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
    let timer;
    if (roundActive && timeLeft > 0 && gameLength !== Infinity) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameLength !== Infinity) {
      endRound();
    }
    return () => clearInterval(timer);
  }, [roundActive, timeLeft, gameLength]);

  const startRound = useCallback(() => {
    setGameState('playing');
    setRoundActive(true);
    setScore(0);
    setTimeLeft(gameLength);
    const newQuestion = generateNewQuestion();
    console.log("Playing chord:", newQuestion);
    playChord(newQuestion);
  }, [generateNewQuestion, playChord, gameLength]);

  const endRound = useCallback(() => {
    setGameState('idle');
    setRoundActive(false);
    setCurrentQuestion([]);
    setAnalyzedChord(null);
    setCorrectGuesses(0);
    setScore(0);
    setTimeLeft(gameLength);
  }, [gameLength]);

  const handleGuess = useCallback((note) => {
    if (currentQuestion.includes(note) && !feedback[note]) {
      setFeedback(prevFeedback => ({ ...prevFeedback, [note]: 'correct' }));
      setScore(prevScore => prevScore + 10);
      setCorrectGuesses(prevCorrectGuesses => prevCorrectGuesses + 1);

      if (correctGuesses + 1 === currentQuestion.length) {
        setShowCheckmark(true);
        setTimeout(() => {
          setShowCheckmark(false);
          const newQuestion = generateNewQuestion();
          playChord(newQuestion);
        }, 1000);
      }
    } else if (!feedback[note]) {
      setFeedback(prevFeedback => ({ ...prevFeedback, [note]: 'incorrect' }));
      setScore(prevScore => Math.max(0, prevScore - 5));
    }
  }, [currentQuestion, feedback, correctGuesses, generateNewQuestion, playChord]);

  const onPlayReference = useCallback(() => {
    playChord('C4');
  }, [playChord]);

  const handleSetNumNotes = useCallback((newNumNotes) => {
    setNumNotes(newNumNotes);
    endRound();
  }, [endRound]);

  const handleSetGameLength = useCallback((newGameLength) => {
    setGameLength(newGameLength);
    endRound();
  }, [endRound]);

  const openDocumentation = () => setIsDocumentationOpen(true);
  const closeDocumentation = () => setIsDocumentationOpen(false);

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
          roundActive={roundActive}
          startRound={startRound}
          endRound={endRound}
          numNotes={numNotes}
          onPlayReference={onPlayReference}
          gameLength={gameLength}
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