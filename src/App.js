import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navbar from './components/NavBar';
import GameCenter from './components/GameControlCenter';
import Piano from './components/Piano';
import { PianoProvider, usePiano } from './PianoContext';

function AppContent() {
  const { playNote, notes } = usePiano();
  const [feedback, setFeedback] = useState({});
  const [gameState, setGameState] = useState('ready');
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [guessedNotes, setGuessedNotes] = useState([]);
  const [numNotes, setNumNotes] = useState(4);
  const [pianoSound, setPianoSound] = useState(true);

  useEffect(() => {
    generateNewQuestion();
  }, [numNotes]);

  const generateUniqueNotes = (availableNotes, count) => {
    const uniqueNotes = [];
    const noteSet = new Set();

    while (uniqueNotes.length < count) {
      const randomIndex = Math.floor(Math.random() * availableNotes.length);
      const note = availableNotes[randomIndex];

      const pitch = note.slice(0, -1);
      if (!noteSet.has(pitch)) {
        uniqueNotes.push(note);
        noteSet.add(pitch);
      }
    }

    return uniqueNotes;
  };

  const generateNewQuestion = () => {
    const availableNotes = notes.filter(note => !note.startsWith('C1') && !note.startsWith('D1') && !note.startsWith('E1') && !note.startsWith('F1') && !note.startsWith('G1') && !note.startsWith('A1') && !note.startsWith('B1'));
    const newQuestion = generateUniqueNotes(availableNotes, numNotes);
    setCurrentQuestion(newQuestion);
    setGuessedNotes([]);
    setFeedback({});
    setGameState('ready');
  };

  const handleGuess = (note) => {
    if (gameState !== 'playing') return;

    if (currentQuestion.includes(note) && !guessedNotes.includes(note)) {
      setFeedback(prev => ({ ...prev, [note]: 'correct' }));
      setGuessedNotes(prev => [...prev, note]);
    } else {
      setFeedback(prev => ({ ...prev, [note]: 'incorrect' }));
    }

    if (guessedNotes.length + 1 === numNotes) {
      setGameState('finished');
    }
  };

  return (
    <div className="App">
      <Navbar
        numNotes={numNotes}
        setNumNotes={setNumNotes}
        pianoSound={pianoSound}
        setPianoSound={setPianoSound}
      />
      <div className="section has-background-white">
        <div className="container">
          <GameCenter
            feedback={feedback}
            setFeedback={setFeedback}
            gameState={gameState}
            setGameState={setGameState}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            generateNewQuestion={generateNewQuestion}
            playNote={playNote}
            numNotes={numNotes}
          />
          <Piano
            feedback={feedback}
            gameState={gameState}
            currentQuestion={currentQuestion}
            onGuess={handleGuess}
            pianoSound={pianoSound}
            playNote={playNote}
          />
        </div>
      </div>
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