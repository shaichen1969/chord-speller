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
  const [gameState, setGameState] = useState('idle');
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [analyzedChord, setAnalyzedChord] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [timeLeft, setTimeLeft] = useState(defaultGameLength);
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
      setTimeLeft(Infinity);
      setShowScore(true);
    } else if (section === 'learn') {
      setGameLength(Infinity);
      setTimeLeft(Infinity);
      setShowScore(false);
    } else if (section === 'quiz') {
      setGameLength(defaultGameLength);
      setTimeLeft(defaultGameLength);
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
    console.log('Harmonic Functions:', JSON.stringify(harmonicFunctions, null, 2)); 



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

    const isCorrectGuess = normalizedReceivedNote === normalizedExpectedNote || 
                           enharmonicEquivalents[normalizedReceivedNote] === normalizedExpectedNote;

    if (isCorrectGuess) {
      // Correct guess logic
      setFeedback((prevFeedback) => {
        const newFeedback = { ...prevFeedback };
        newFeedback[note] = 'correct';
        // Clear all 'incorrect' feedback
        Object.keys(newFeedback).forEach(key => {
          if (newFeedback[key] === 'incorrect') {
            delete newFeedback[key];
          }
        });
        return newFeedback;
      });

      setCorrectlyGuessedNotes((prevNotes) => [...prevNotes, nextExpectedFunction]);

      if (correctlyGuessedNotes.length + 1 === harmonicFunctions.length) {
        // Entire chord guessed correctly
        setShowCheckmark(true);
        correctAudio.play(); 
        logCustomEvent('chord_guessed_correctly', { mode: mode });

        // Update score for both quiz and practice modes when the entire chord is guessed
        setScore((prevScore) => prevScore + 10 * harmonicFunctions.length);

        setTimeout(() => {
          setShowCheckmark(false);
          generateNewQuestion();
        }, 1000);
      }
    } else {
      // Incorrect guess logic
      setFeedback((prevFeedback) => ({ ...prevFeedback, [note]: 'incorrect' }));
      logCustomEvent('incorrect_guess', { mode: mode });

      // Apply penalty only in quiz mode
      if (section === 'quiz') {
        setScore((prevScore) => Math.max(0, prevScore - 5)); // Ensure score doesn't go below 0
      }
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
        section={section}
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