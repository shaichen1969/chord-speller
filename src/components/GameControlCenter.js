import React from 'react';
import '../styles/GameControlCenter.css';
import { Play, Repeat, SkipForward, Music } from 'lucide-react';
import * as Tone from 'tone';

const GameControls = ({ onPlay, onReplay, onSkip, onPlayPiano, gameState, onGo }) => {
    return (
        <div className="buttons">
            {gameState === 'ready' && (
                <button
                    className="button is-info is-large go-button"
                    onClick={onGo}
                    aria-label="Go"
                >
                    Go
                </button>
            )}
            {gameState === 'playing' && (
                <>
                    <button
                        className="button is-primary is-medium"
                        onClick={onPlay}
                        aria-label="Play"
                    >
                        <Play />
                    </button>
                    <button
                        className="button is-info is-medium"
                        onClick={onReplay}
                        aria-label="Replay"
                    >
                        <Repeat />
                    </button>
                    <button
                        className="button is-warning is-medium"
                        onClick={onSkip}
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
                </>
            )}
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
    };

    const handleGo = () => {
        setGameState('playing');
        handlePlay();
    };

    const handleSkip = () => {
        const newQuestion = generateNewQuestion();
        playChord(newQuestion);
    };

    return (
        <div className="game-center-content">
            <h2 className="title is-3">Harmonic Ear Trainer</h2>
            <p className="subtitle">Listen to the chord and identify the notes</p>
            <GameControls
                onPlay={handlePlay}
                onReplay={() => playChord(currentQuestion)}
                onSkip={handleSkip}
                onPlayPiano={() => ['C4', 'E4', 'G4', 'C5'].forEach(note => playNote(note))}
                gameState={gameState}
                onGo={handleGo}
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
    );
};

export default GameCenter;