// GameControlCenter.js

import React from 'react';
import '../styles/GameControlCenter.css';
import { Play, SkipForward, Music, Square } from 'lucide-react';
import * as Tone from 'tone';
import { Tooltip } from 'react-tooltip';
import { availableNotes, generateCompleteChord } from '../utils/ChordGeneratorUtils';

const GameControls = ({ onPlay, onSkip, onPlayReference, onStop, gameState, roundActive }) => {
    return (
        <div className="buttons">
            <button
                className="button is-primary is-medium"
                onClick={onPlay}
                disabled={gameState !== 'playing' || !roundActive}
                aria-label="Play"
                data-tooltip-id="play-tooltip"
                data-tooltip-content="Play question"
            >
                <Play />
            </button>
            <button
                className="button is-warning is-medium"
                onClick={onSkip}
                disabled={gameState !== 'playing' || !roundActive}
                aria-label="Skip"
                data-tooltip-id="skip-tooltip"
                data-tooltip-content="Skip question"
            >
                <SkipForward />
            </button>
            <button
                className="button is-success is-medium"
                onClick={onPlayReference}
                disabled={!roundActive}
                aria-label="Play Reference"
                data-tooltip-id="reference-tooltip"
                data-tooltip-content="Play reference C"
            >
                <Music />
            </button>
            <button
                className="button is-danger is-medium"
                onClick={onStop}
                disabled={!roundActive}
                aria-label="Stop"
                data-tooltip-id="stop-tooltip"
                data-tooltip-content="End round"
            >
                <Square />
            </button>
            <Tooltip id="play-tooltip" place="top" effect="solid" />
            <Tooltip id="skip-tooltip" place="top" effect="solid" />
            <Tooltip id="reference-tooltip" place="top" effect="solid" />
            <Tooltip id="stop-tooltip" place="top" effect="solid" />
        </div>
    );
};

const GameCenter = ({
    gameState,
    setGameState,
    currentQuestion,
    generateNewQuestion,
    playChord,
    playNote,
    score,
    setScore,
    timeLeft,
    setTimeLeft,
    roundActive,
    startRound,
    onPlayReference,
    onSkip,
    endRound,
    numNotes,
    gameLength,
    finalScore,
    mode
}) => {
    const handlePlay = async () => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        
        if (mode === 'majorScale' || mode === 'majorScales') {
            playScale(currentQuestion);
        } else {
            playChord(currentQuestion);
        }
    };

    const playScale = (scale) => {
        console.log('Playing scale:', scale);
        const normalizedScale = scale.reduce((acc, note, index) => {
            if (index === 0) return [note];
            
            const prevNote = acc[index - 1];
            const prevPitchClass = prevNote.slice(0, -1);
            const prevOctave = parseInt(prevNote.slice(-1));
            const currentPitchClass = note.slice(0, -1);
            let currentOctave = parseInt(note.slice(-1));

            const prevIndex = availableNotes.findIndex(n => n.startsWith(prevPitchClass));
            const currentIndex = availableNotes.findIndex(n => n.startsWith(currentPitchClass));

            if (currentIndex < prevIndex) {
                // The pitch has actually dropped, so increment the octave
                currentOctave = prevOctave + 1;
            } else {
                // The pitch hasn't dropped, so use the same octave as the previous note
                currentOctave = prevOctave;
            }

            const normalizedNote = currentPitchClass + currentOctave;
            return [...acc, normalizedNote];
        }, []);

        console.log('Normalized scale:', normalizedScale);

        normalizedScale.forEach((note, index) => {
            setTimeout(() => {
                playNote(note);
            }, index * 500);
        });
    };

    const handleSkip = () => {
        onSkip();
    };

    const handlePlayReference = () => {
        onPlayReference();
    };

    const formatTime = (seconds) => {
        if (seconds === Infinity) return 'Eternity';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    let instructionText = '';
    if (roundActive) {
        instructionText = 'Listen to the chord and guess the notes!';
    } else if (gameState === 'finished') {
        instructionText = `Round finished! Your score: ${finalScore}`;
    } else {
        instructionText = 'Press "Go" to begin round';
    }

    return (
        <div className="game-center-content has-background-dark">
            <p className="title is-4">{instructionText}</p>
            <div className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading has-text-light">Score</p>
                        <p className="title has-text-light">{roundActive ? score : finalScore}</p>
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
                <div className="button-container">
                    {!roundActive ? (
                        <button className="button is-large is-primary is-dark-blue-gray" onClick={startRound}>
                            {gameState === 'finished' ? 'Play Again' : 'Go'}
                        </button>
                    ) : (
                        <GameControls
                            onPlay={handlePlay}
                            onSkip={handleSkip}
                            onPlayReference={handlePlayReference}
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