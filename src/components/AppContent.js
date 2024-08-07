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
    if (currentQuestion.includes(note)) {
      setFeedback((prevFeedback) => ({ ...prevFeedback, [note]: 'correct' }));
      setScore((prevScore) => prevScore + 1);
      setCorrectlyGuessedNotes((prevNotes) => [...prevNotes, note]);
      if (correctlyGuessedNotes.length + 1 === currentQuestion.length) {
        setShowCheckmark(true);
        setTimeout(() => {
          setShowCheckmark(false);
          generateNewQuestion();
        }, 1000);
      }
    } else {
      setFeedback((prevFeedback) => ({ ...prevFeedback, [note]: 'incorrect' }));
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