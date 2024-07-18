import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/NavBar';
import Piano from './components/Piano';
import GameCenter from './components/GameControlCenter';
import { analyzeChord } from './utils/ChordAnalyzerUtils';
import HarmonicTree from './components/HarmonicTree';
import { PianoProvider, usePiano } from './PianoContext';
import './styles/App.css';

function AppContent() {
  const [gameState, setGameState] = useState('idle');
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [analyzedChord, setAnalyzedChord] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [roundActive, setRoundActive] = useState(false);
  const [numNotes, setNumNotes] = useState(3);
  const [pianoSound, setPianoSound] = useState(true);
  const [showCheckmark, setShowCheckmark] = useState(false);
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

    // Convert question to indices and analyze
    const questionIndices = newQuestion.map(note => availableNotes.indexOf(note));
    const analysis = analyzeChord(questionIndices);
    console.log("Generated question:", newQuestion);
    console.log("Analyzed chord:", analysis);
    setAnalyzedChord(analysis);

    return newQuestion;
  }, [numNotes, availableNotes]);

  useEffect(() => {
    let timer;
    if (roundActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endRound();
    }
    return () => clearInterval(timer);
  }, [roundActive, timeLeft]);

  const startRound = useCallback(() => {
    setGameState('playing');
    setRoundActive(true);
    setScore(0);
    setTimeLeft(60);
    const newQuestion = generateNewQuestion();
    console.log("Playing chord:", newQuestion);
    playChord(newQuestion);
  }, [generateNewQuestion, playChord]);

  const endRound = useCallback(() => {
    setGameState('idle');
    setRoundActive(false);
    setCurrentQuestion([]);
    setAnalyzedChord(null);
  }, []);

  const handleGuess = useCallback((note) => {
    if (currentQuestion.includes(note)) {
      setFeedback(prevFeedback => ({ ...prevFeedback, [note]: 'correct' }));
      setScore(prevScore => prevScore + 10);

      if (Object.keys(feedback).length + 1 === currentQuestion.length) {
        setShowCheckmark(true);
        setTimeout(() => {
          setShowCheckmark(false);
          const newQuestion = generateNewQuestion();
          playChord(newQuestion);
        }, 1000);
      }
    } else {
      setFeedback(prevFeedback => ({ ...prevFeedback, [note]: 'incorrect' }));
      setScore(prevScore => Math.max(0, prevScore - 5));
    }
  }, [currentQuestion, feedback, generateNewQuestion, playChord]);

  const onPlayReference = useCallback(() => {
    
    playChord('C4');
  }, [currentQuestion, playChord]);

  return (
    <div className="App">
      <Navbar
        numNotes={numNotes}
        setNumNotes={setNumNotes}
        pianoSound={pianoSound}
        setPianoSound={setPianoSound}
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
        {analyzedChord && analyzedChord.chordSymbol && (
          <HarmonicTree chordAnalysis={analyzedChord} />
        )}
      </main>
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