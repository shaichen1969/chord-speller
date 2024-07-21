import React, { useState } from 'react';
import '../styles/GameControlCenter.css';
import { Play, SkipForward, Music, Square } from 'lucide-react';
import * as Tone from 'tone';
import { Tooltip } from 'react-tooltip';

const GameControls = ({ onPlay, onSkip, onPlayReference, onStop, gameState, roundActive }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const showTooltipBriefly = () => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
    };

    return (
        <div className="buttons">
            <button
                className="button is-primary is-medium"
                onClick={() => { onPlay(); showTooltipBriefly(); }}
                disabled={gameState !== 'playing' || !roundActive}
                aria-label="Play"
                data-tooltip-id="play-tooltip"
                data-tooltip-content="Play question"
            >
                <Play />
            </button>
            <button
                className="button is-warning is-medium"
                onClick={() => { onSkip(); showTooltipBriefly(); }}
                disabled={gameState !== 'playing' || !roundActive}
                aria-label="Skip"
                data-tooltip-id="skip-tooltip"
                data-tooltip-content="Skip question"
            >
                <SkipForward />
            </button>
            <button
                className="button is-success is-medium"
                onClick={() => { onPlayReference(); showTooltipBriefly(); }}
                disabled={!roundActive}
                aria-label="Play Reference"
                data-tooltip-id="reference-tooltip"
                data-tooltip-content="Play reference C"
            >
                <Music />
            </button>
            <button
                className="button is-danger is-medium"
                onClick={() => { onStop(); showTooltipBriefly(); }}
                disabled={!roundActive}
                aria-label="Stop"
                data-tooltip-id="stop-tooltip"
                data-tooltip-content="End round"
            >
                <Square />
            </button>
            <Tooltip id="play-tooltip" place="top" effect="solid" isOpen={showTooltip} />
            <Tooltip id="skip-tooltip" place="top" effect="solid" isOpen={showTooltip} />
            <Tooltip id="reference-tooltip" place="top" effect="solid" isOpen={showTooltip} />
            <Tooltip id="stop-tooltip" place="top" effect="solid" isOpen={showTooltip} />
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
    setScore,
    timeLeft,
    roundActive,
    startRound,
    onPlayReference,
    endRound,
    numNotes,
    playChord,
    gameLength,
    finalScore
}) => {
    const handlePlay = async () => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        playChord(currentQuestion);
    };

    const handleSkip = () => {
        const newQuestion = generateNewQuestion();
        playChord(newQuestion);
        setScore(prevScore => Math.max(0, prevScore - 5));
    };

    const handlePlayReference = () => {
        onPlayReference();
    };

    const formatTime = (seconds) => {
        if (gameLength === Infinity) return 'Eternity';
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