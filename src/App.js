import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navbar from './components/NavBar';
import GameCenter from './components/GameControlCenter';
import Piano from './components/Piano';
import { PianoProvider, usePiano } from './PianoContext';
import ChordAnalyzer from './components/ChordAnalyzer';
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

  useEffect(() => {
    generateNewQuestion();
  }, [numNotes]);

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
    setGameState('playing');
    return newQuestion;
  };

  const handleGuess = (note) => {
    if (gameState !== 'playing' || !roundActive) return;

    if (currentQuestion.includes(note) && !guessedNotes.includes(note)) {
      setFeedback(prev => ({ ...prev, [note]: 'correct' }));
      setGuessedNotes(prev => [...prev, note]);

      if (guessedNotes.length + 1 === numNotes) {
        setShowCheckmark(true);
        setScore(prevScore => prevScore + 10 * numNotes);
        setFeedback({});

        setTimeout(() => {
          playDingSound();
          setTimeout(() => {
            setShowCheckmark(false);
            const newQuestion = generateNewQuestion();
            playChord(newQuestion);
          }, 1000);
        }, 1000);
      }
    } else if (!currentQuestion.includes(note)) {
      setFeedback(prev => ({ ...prev, [note]: 'incorrect' }));
      setScore(prevScore => Math.max(0, prevScore - 2)); // Always deduct 2 points for incorrect guess
    }
  };

  const playDingSound = () => {
    try {
      const audio = new Audio(require('./assets/media/piano/correct.mp3'));
      audio.play()
    } catch (err) {
      console.error('Error in playDingSound function', err);
    }
  };

  const playChord = (chord) => {
    const now = Tone.now();
    chord.forEach(note => playNote(note, now));
  };

  const startRound = () => {
    setRoundActive(true);
    setTimeLeft(60);
    setScore(0);
    const newQuestion = generateNewQuestion();
    playChord(newQuestion);
  };

  const endRound = () => {
    setRoundActive(false);
    setGameState('finished');
  };

  const handlePlayReference = () => {
    setScore(prevScore => Math.max(0, prevScore - 2));
    playNote('C4', undefined, 0.5); // Play C4 at half velocity
  };

  return (
    <div className="App has-background-dark has-text-light">
      <Navbar
        numNotes={numNotes}
        setNumNotes={setNumNotes}
        pianoSound={pianoSound}
        setPianoSound={setPianoSound}
      />
      <div className="game-container">
        <div className="chord-analyzer-container">
          <ChordAnalyzer currentQuestion={currentQuestion} />
        </div>
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
          score={score}
          setScore={setScore}
          timeLeft={timeLeft}
          roundActive={roundActive}
          startRound={startRound}
          onPlayReference={handlePlayReference}
          endRound={endRound}
          playChord={playChord}
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