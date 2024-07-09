import React from 'react';
import '../styles/GameControlCenter.css';
import { Play, Repeat, SkipForward, Music } from 'lucide-react';
import * as Tone from 'tone';

const GameControls = ({ onPlay, onReplay, onSkip, onPlayPiano, gameState }) => {
    return (
        <div className="buttons">
            <button
                className="button is-primary is-medium"
                onClick={onPlay}
                disabled={gameState !== 'ready'}
                aria-label="Play"
            >
                <Play />
            </button>
            <button
                className="button is-info is-medium"
                onClick={onReplay}
                disabled={gameState !== 'playing'}
                aria-label="Replay"
            >
                <Repeat />
            </button>
            <button
                className="button is-warning is-medium"
                onClick={onSkip}
                disabled={gameState === 'ready'}
                aria-label="Skip"
            >
                <SkipForward />
            </button>
            <button
                className="button is-success is-medium"
                onClick={onPlayPiano}
                aria-label="Play Piano"
            >
                <Music />
            </button>
        </div>
    );
};

const GameCenter = ({ gameState, setGameState, currentQuestion, generateNewQuestion, playNote }) => {
    const playChord = (chord) => {
        chord.forEach(note => playNote(note));
    };

    const handlePlay = async () => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        playChord(currentQuestion);
        setGameState('playing');
    };

    return (
        <div className="container">
            <div className="game-center-content">
                <h2 className="title is-3">Game Center</h2>
                <p className="subtitle">Ready to train your harmonic ear?</p>
                <GameControls
                    onPlay={handlePlay}
                    onReplay={() => playChord(currentQuestion)}
                    onSkip={generateNewQuestion}
                    onPlayPiano={() => ['C4', 'E4', 'G4', 'C5'].forEach(note => playNote(note))}
                    gameState={gameState}
                />
                {gameState === 'finished' && (
                    <div className="mt-4">
                        <p className="is-size-4">Round Complete!</p>
                        <button className="button is-primary mt-2" onClick={generateNewQuestion}>
                            Next Round
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameCenter;