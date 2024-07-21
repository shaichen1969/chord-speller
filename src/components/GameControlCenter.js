import React, { useCallback } from 'react';
import { Play, SkipForward, Music, Square } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import '../styles/GameControlCenter.css';
import * as Tone from 'tone';

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

            <Tooltip id="play-tooltip" place="top" delayShow={1000} />
            <Tooltip id="skip-tooltip" place="top" delayShow={1000} />
            <Tooltip id="reference-tooltip" place="top" delayShow={1000} />
            <Tooltip id="stop-tooltip" place="top" delayShow={1000} />
        </div>
    );
};

const GameCenter = ({
    gameState,
    setGameState,
    currentQuestion,
    generateNewQuestion,
    playChord,
    score,
    setScore,
    timeLeft,
    roundActive,
    startRound,
    onPlayReference,
    endRound,
    numNotes,
    gameLength
}) => {
    const formatTime = (seconds) => {
        if (gameLength === Infinity) return 'Eternity';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handlePlay = useCallback(async () => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        playChord(currentQuestion);
    }, [currentQuestion, playChord]);

    const handleSkip = useCallback(() => {
        const newQuestion = generateNewQuestion();
        playChord(newQuestion);
        setScore(prevScore => Math.max(0, prevScore - 5));
    }, [generateNewQuestion, playChord, setScore]);

    const handlePlayReference = useCallback(() => {
        onPlayReference();
    }, [onPlayReference]);

    const instructionText = roundActive ? 'Listen to the chord and guess the notes!' : 'Press "Go" to begin round';

    return (
        <div className="game-center-content has-background-dark">
            <p className="title is-4">{instructionText}</p>
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
                <div className="button-container">
                    {!roundActive ? (
                        <button
                            className="button is-large is-primary is-dark-blue-gray"
                            onClick={startRound}
                        >
                            Go
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