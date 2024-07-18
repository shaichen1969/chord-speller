import React, { useState, useEffect, useCallback } from 'react';
import './styles/App.css';
import Navbar from './components/NavBar';
import GameCenter from './components/GameControlCenter';
import Piano from './components/Piano';
import { PianoProvider, usePiano } from './PianoContext';
import HarmonicTree from './components/HarmonicTree';
import * as Tone from 'tone';

function AppContent() {
  const { playNote, notes } = usePiano();
  const [feedback, setFeedback] = useState({});
  const [gameState, setGameState] = useState('ready');
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [guessedNotes, setGuessedNotes] = useState([]);
  const [numNotes, setNumNotes] = useState(4);
  const [pianoSound, setPianoSound] = useState(true);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [roundActive, setRoundActive] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const generateUniqueNotes = useCallback((availableNotes, count) => {
    const uniqueNotes = [];
    const noteSet = new Set();

    while (uniqueNotes.length < count) {
      const randomNote = availableNotes[Math.floor(Math.random() * availableNotes.length)];
      if (!noteSet.has(randomNote)) {
        noteSet.add(randomNote);
        uniqueNotes.push(randomNote);
      }
    }
    return uniqueNotes;
  }, []);

  const playChord = (chord) => {
    if (pianoSound) {
      const now = Tone.now();
      chord.forEach((note, index) => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(note, "8n", now + index * 0.1);
      });
    }
  };

  const startRound = useCallback(() => {
    setRoundActive(true);
    setGameState('playing');
    const newQuestion = generateUniqueNotes(notes, numNotes);
    setCurrentQuestion(newQuestion);
    playChord(newQuestion);
  }, [generateUniqueNotes, notes, numNotes, playChord]);

  const endRound = useCallback(() => {
    setRoundActive(false);
    setGameState('ready');
  }, []);

  return (
    <div className="App">
      <Navbar numNotes={numNotes} setNumNotes={setNumNotes} pianoSound={pianoSound} setPianoSound={setPianoSound} />
      <div className="game-container">
        <div className="main-game-area">
          <GameCenter
            gameState={gameState}
            setGameState={setGameState}
            currentQuestion={currentQuestion}
            generateNewQuestion={generateUniqueNotes}
            playNote={playNote}
            score={score}
            setScore={setScore}
            timeLeft={timeLeft}
            roundActive={roundActive}
            startRound={startRound}
            endRound={endRound}
          />
          <Piano
            feedback={feedback}
            gameState={gameState}
            currentQuestion={currentQuestion}
            guessedNotes={guessedNotes}
            onGuess={setGuessedNotes}
            pianoSound={pianoSound}
            playNote={playNote}
            showCheckmark={showCheckmark}
          />
        </div>
        <div className="harmonic-tree-container">
          <HarmonicTree currentQuestion={currentQuestion} />
        </div>
      </div>
    </div>
  );
}

const App = () => (
  <PianoProvider>
    <AppContent />
  </PianoProvider>
);

export default App;
