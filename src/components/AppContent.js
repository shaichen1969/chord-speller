import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCenter from './GameControlCenter';
import Piano from './Piano';
import HarmonicTree from './HarmonicTree';
import { usePiano } from '../PianoContext';
import { generateCompleteChord } from '../utils/ChordGeneratorUtils';

function AppContent({ pianoSound, gameLength: defaultGameLength }) {
  const { section, mode } = useParams();
  const [gameLength, setGameLength] = useState(defaultGameLength);
  const [showScore, setShowScore] = useState(true);
  const { mode: gameMode } = useParams();
  const [gameState, setGameState] = useState('idle');
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [analyzedChord, setAnalyzedChord] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [timeLeft, setTimeLeft] = useState(gameLength);
  const [roundActive, setRoundActive] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [correctlyGuessedNotes, setCorrectlyGuessedNotes] = useState([]);
  const [finalScore, setFinalScore] = useState(0);

  const { playNote, playChord } = usePiano();

  useEffect(() => {
    if (section === 'practice') {
      setGameLength(Infinity);
      setShowScore(false);
    } else if (section === 'learn') {
      setGameLength(Infinity);
      setShowScore(false);
      // Add any additional setup for learn mode
    } else if (section === 'quiz') {
      setGameLength(defaultGameLength);
      setShowScore(true);
    }
  }, [section, defaultGameLength]);

  useEffect(() => {
    if (roundActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endRound();
    }
  }, [roundActive, timeLeft]);

  const generateNewQuestion = () => {
    const { chord, analysis } = generateCompleteChord(mode);
    setCurrentQuestion(chord);
    setAnalyzedChord(analysis);
    setFeedback({});
    setCorrectlyGuessedNotes([]);
  };

  const startRound = () => {
    setGameState('playing');
    setRoundActive(true);
    setScore(0);
    setTimeLeft(gameLength);
    generateNewQuestion();
  };

  const endRound = () => {
    setGameState('finished');
    setRoundActive(false);
    setFinalScore(score);
  };

  const handleGuess = (note) => {
    if (!analyzedChord || !analyzedChord.harmonicFunctionsFound || !analyzedChord.spelledChord) {
      console.error('Invalid chord analysis:', analyzedChord);
      return;
    }

    const harmonicFunctions = analyzedChord.harmonicFunctionsFound;
    const chordNotes = analyzedChord.spelledChord.split(', ');

    const nextExpectedIndex = correctlyGuessedNotes.length;
    const nextExpectedNote = chordNotes[nextExpectedIndex];
    const nextExpectedFunction = harmonicFunctions[nextExpectedIndex];

    console.log('Expected note:', nextExpectedNote);
    console.log('Expected function:', nextExpectedFunction);

    const normalizeNote = (n) => n.replace(/♭/g, 'b').replace(/♯/g, '#').replace(/\d+$/, '');

    if (normalizeNote(note) === normalizeNote(nextExpectedNote)) {
      // Clear incorrect feedback
      setFeedback((prevFeedback) => {
        const newFeedback = {};
        Object.keys(prevFeedback).forEach(key => {
          if (prevFeedback[key] === 'correct') {
            newFeedback[key] = 'correct';
          }
        });
        newFeedback[note] = 'correct';
        return newFeedback;
      });

      setScore((prevScore) => prevScore + 1);
      setCorrectlyGuessedNotes((prevNotes) => [...prevNotes, nextExpectedFunction]);

      if (correctlyGuessedNotes.length + 1 === harmonicFunctions.length) {
        setShowCheckmark(true);
        setTimeout(() => {
          setShowCheckmark(false);
          generateNewQuestion();
        }, 1000);
      }
    } else {
      setFeedback((prevFeedback) => ({ ...prevFeedback, [note]: 'incorrect' }));
    }

    console.log('Updated correctly guessed notes:', [...correctlyGuessedNotes, nextExpectedFunction]);
  };

  const handleSkip = () => {
    generateNewQuestion();
  };

  const handlePlayReference = () => {
    playNote('C4');
  };

  return (
    <div className="game-content">
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
        onPlayReference={handlePlayReference}
        onSkip={handleSkip}
        endRound={endRound}
        gameLength={gameLength}
        finalScore={finalScore}
        showScore={showScore}
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
        <HarmonicTree chordAnalysis={analyzedChord} correctlyGuessedNotes={correctlyGuessedNotes} />
      )}
    </div>
  );
}

export default AppContent;