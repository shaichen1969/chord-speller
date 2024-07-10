import React from 'react';
import '../styles/GameControlCenter.css';
import { Play, SkipForward, Music, Square } from 'lucide-react';
import * as Tone from 'tone';

const GameControls = ({ onPlay, onSkip, onPlayReference, onStop, gameState, roundActive }) => {
    return (
        <div className="buttons">
            <button
                className="button is-primary is-medium"
                onClick={onPlay}
                disabled={gameState !== 'playing' || !roundActive}
                aria-label="Play"
            >
                <Play />
            </button>
            <button
                className="button is-warning is-medium"
                onClick={onSkip}
                disabled={gameState !== 'playing' || !roundActive}
                aria-label="Skip"
            >
                <SkipForward />
            </button>
            <button
                className="button is-success is-medium"
                onClick={onPlayReference}
                disabled={!roundActive}
                aria-label="Play Reference"
            >
                <Music />
            </button>
            <button
                className="button is-danger is-medium"
                onClick={onStop}
                disabled={!roundActive}
                aria-label="Stop"
            >
                <Square />
            </button>
        </div>
    );
};

const GameCenter = ({
    gameState,
    setGameState,
    currentQuestion,
    generateNewQuestion,
    playNote,
    score,
    timeLeft,
    roundActive,
    startRound,
    onPlayReference,
    endRound
}) => {
    const playChord = (chord) => {
        chord.forEach(note => playNote(note));
    };

    const handlePlay = async () => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        playChord(currentQuestion);
    };

    const handleSkip = () => {
        const newQuestion = generateNewQuestion();
        playChord(newQuestion);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="container">
            <div className="game-center-content has-background-dark">
                <h2 className="title is-3">Harmonic Ear Trainer</h2>
                <p className="subtitle">Listen to the chord and identify the notes</p>
                <div className="level">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading has-text-light">Score</p>
                            <p className="title has-text-light">{score}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading has-text-light">Time Left</p>
                            <p className="title has-text-light">{formatTime(timeLeft)}</p>
                        </div>
                    </div>
                </div>
                <div className="game-controls-wrapper">
                    {!roundActive ? (
                        <button className="button is-large is-primary mb-4" onClick={startRound}>
                            {gameState === 'finished' ? 'New Round' : 'Go!'}
                        </button>
                    ) : (
                        <GameControls
                            onPlay={handlePlay}
                            onSkip={handleSkip}
                            onPlayReference={() => {
                                onPlayReference();
                                ['C4', 'E4', 'G4', 'C5'].forEach(note => playNote(note));
                            }}
                            onStop={endRound}
                            gameState={gameState}
                            roundActive={roundActive}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameCenter;