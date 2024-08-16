import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameCenter from './GameControlCenter';
import Piano from './Piano';
import HarmonicTree from './HarmonicTree';
import { usePiano } from '../PianoContext';
import { generateCompleteChord } from '../utils/ChordGeneratorUtils';
import correctSound from '../assets/media/piano/correct.mp3';
import { useAnalytics } from '../useAnalytics';

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
  const correctAudio = new Audio(correctSound);
  const { logCustomEvent } = useAnalytics();

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

    const normalizeNote = (n) => {
      return n.replace(/b/g, '♭')
               .replace(/#/g, '♯')
               .replace(/\d+$/, '')
               .toUpperCase();
    };

    const enharmonicEquivalents = {
      'C♯': 'D♭', 'D♭': 'C♯',
      'D♯': 'E♭', 'E♭': 'D♯',
      'F♯': 'G♭', 'G♭': 'F♯',
      'G♯': 'A♭', 'A♭': 'G♯',
      'A♯': 'B♭', 'B♭': 'A♯' ,'B': 'C♭','C♭': 'B' };

    const normalizedExpectedNote = normalizeNote(nextExpectedNote);
    const normalizedReceivedNote = normalizeNote(note);

    if (normalizedReceivedNote === normalizedExpectedNote || 
        enharmonicEquivalents[normalizedReceivedNote] === normalizedExpectedNote) {
      // Clear incorrect feedback and set the correct note as green
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
        correctAudio.play(); 
        logCustomEvent('chord_guessed_correctly', { mode: mode });
        setTimeout(() => {
          setShowCheckmark(false);
          generateNewQuestion();
        }, 1000);
      }
    } else {
      setFeedback((prevFeedback) => ({ ...prevFeedback, [note]: 'incorrect' }));
      logCustomEvent('incorrect_guess', { mode: mode });
    }
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
        playNote={playNote}
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
        mode={mode}
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
      { analyzedChord && (
        <HarmonicTree chordAnalysis={analyzedChord} correctlyGuessedNotes={correctlyGuessedNotes} />
      )}
    </div>
  );
}

export default AppContent;