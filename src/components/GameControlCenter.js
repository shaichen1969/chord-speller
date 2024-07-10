import React from 'react';
import '../styles/GameControlCenter.css';
import { Play, Repeat, SkipForward, Music } from 'lucide-react';
import * as Tone from 'tone';

const GameControls = ({ onPlay, onReplay, onSkip, onPlayReference, gameState, roundActive }) => {
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
                className="button is-info is-medium"
                onClick={onReplay}
                disabled={gameState !== 'playing' || !roundActive}
                aria-label="Replay"
            >
                <Repeat />
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
                aria-label="Play Reference"
            >
                <Music />
            </button>
        </div>
    );
};

const GameCenter = ({ gameState, setGameState, currentQuestion, generateNewQuestion, playNote, score, timeLeft, roundActive, startRound, onPlayReference }) => {
    const playChord = (chord) => {
        chord.forEach(note => playNote(note));
    };

    const handlePlay = async () => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        playChord(currentQuestion);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="container">
            <div className="game-center-content has-background-dark">
                <h2 className="title is-3 has-text-light">Game Center</h2>
                <p className="subtitle has-text-light">Ready to train your harmonic ear?</p>
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
                {!roundActive && (
                    <button className="button is-large is-primary mb-4" onClick={startRound}>
                        Go!
                    </button>
                )}
                <GameControls
                    onPlay={handlePlay}
                    onReplay={() => playChord(currentQuestion)}
                    onSkip={generateNewQuestion}
                    onPlayReference={() => {
                        onPlayReference();
                        ['C4', 'E4', 'G4', 'C5'].forEach(note => playNote(note));
                    }}
                    gameState={gameState}
                    roundActive={roundActive}
                />
                {gameState === 'finished' && (
                    <div className="mt-4">
                        <p className="is-size-4 has-text-light">Round Complete!</p>
                        <p className="is-size-5 has-text-light">Final Score: {score}</p>
                        <button className="button is-primary mt-2" onClick={startRound}>
                            Start New Round
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameCenter;