import React from 'react';
import '../styles/Documentation.css';

const Documentation = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="documentation-overlay">
            <div className="documentation-content">
                <h2>Harmonic Ear Trainer Documentation</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="documentation-text">
                    <h3>How the Application Works</h3>
                    <p>Enhance your harmonic ear training by learning to listen carefully to single chords of varying complexity, improving your sensitivity to overtones within chords, one chord at a time. The chords generated are 100% random and represent any possible harmonic occurrence within one octave on a piano.</p>
                    <h4>Steps:</h4>
                    <ol>
                        <li><strong>Start a Round:</strong> Kick off your training session by clicking the "Go" button. This sets the game in motion, initializing the game state, setting your score to zero, and generating a fresh chord question.</li>
                        <li><strong>Answering Questions:</strong> Listen carefully to the chord and identify the notes by selecting the correct keys on the virtual piano. Each correct note will be marked, and your score will increase.</li>
                        <li><strong>Game Modes:</strong> Choose your challenge with game lengths set to 1 minute, 2 minutes, 3 minutes, or "Eternity". When the timer runs out (except in Eternity mode), the round ends, and your final score is displayed.</li>
                        <li><strong>Ending a Round:</strong> Wrap up your session at any time by clicking the "End Round" button, and see how well you've done with your final score.</li>
                    </ol>

                    <h3>Scoring System</h3>
                    <h4>Overview</h4>
                    <p>The scoring system is designed to provide a clear metric for player progress and to determine when a player is ready to advance to more complex chords. The system rewards accuracy and penalizes mistakes, with the goal of encouraging careful listening and precise identification of chord components.</p>

                    <h4>Scoring Rules</h4>
                    <ol>
                        <li><strong>Correct Chord Identification:</strong>
                            <ul>
                                <li>Points Awarded: 5 points × number of notes in the chord</li>
                                <li>Example: Correctly identifying a 3-note chord awards 15 points</li>
                            </ul>
                        </li>
                        <li><strong>Incorrect Guess:</strong>
                            <ul>
                                <li>Penalty: 5 points deducted for each incorrect guess</li>
                                <li>This applies to individual note guesses within a chord</li>
                            </ul>
                        </li>
                        <li><strong>Using Reference Pitch:</strong>
                            <ul>
                                <li>Penalty: 5 points deducted each time the reference pitch is played</li>
                            </ul>
                        </li>
                        <li><strong>Skipping a Chord:</strong>
                            <ul>
                                <li>Penalty: 5 points × number of notes in the skipped chord</li>
                                <li>Example: Skipping a 3-note chord results in a 15-point deduction</li>
                            </ul>
                        </li>
                    </ol>

                    <h4>Progression Benchmark</h4>
                    <p>A score of approximately 100 points in a one-minute game is considered a good benchmark for moving to more complex chords. This target encourages players to:</p>
                    <ul>
                        <li>Accurately identify chords</li>
                        <li>Minimize incorrect guesses</li>
                        <li>Use the reference pitch sparingly</li>
                        <li>Avoid skipping chords unless necessary</li>
                    </ul>

                    <h4>Strategy Tips</h4>
                    <ol>
                        <li>Prioritize accuracy over speed. It's better to take time and correctly identify a chord than to make quick, incorrect guesses.</li>
                        <li>Use the reference pitch judiciously. While it can help orient you, frequent use will significantly impact your score.</li>
                        <li>Only skip chords if you're truly stuck. The penalty for skipping is substantial, especially for more complex chords.</li>
                        <li>Focus on identifying the root and quality of the chord first, then work on pinpointing additional notes.</li>
                    </ol>

                    <h4>Examples</h4>
                    <ol>
                        <li>Player correctly identifies a 3-note chord:
                            <ul>
                                <li>Score: +15 points (5 × 3 notes)</li>
                            </ul>
                        </li>
                        <li>Player makes two incorrect guesses before correctly identifying a 4-note chord:
                            <ul>
                                <li>Penalty for incorrect guesses: -10 points (5 × 2 guesses)</li>
                                <li>Score for correct identification: +20 points (5 × 4 notes)</li>
                                <li>Net score: +10 points</li>
                            </ul>
                        </li>
                        <li>Player uses the reference pitch twice and then correctly identifies a 3-note chord:
                            <ul>
                                <li>Penalty for reference use: -10 points (5 × 2 uses)</li>
                                <li>Score for correct identification: +15 points (5 × 3 notes)</li>
                                <li>Net score: +5 points</li>
                            </ul>
                        </li>
                        <li>Player skips a 5-note chord:
                            <ul>
                                <li>Penalty: -25 points (5 × 5 notes)</li>
                            </ul>
                        </li>
                    </ol>

                    <h3>How the Harmonic Ear Trainer Analyzes Chords</h3>
                    <p>The Harmonic Ear Trainer delves into the depths of your chords to find the most stable and harmonically rich combinations:</p>
                    <ul>
                        <li><strong>Chord Generation:</strong> When a new chord is generated, the application seeks out the most stable chord by analyzing the given pitches and their overtones (1, 3, 5, 7, 9, 11, 13).</li>
                        <li><strong>Stability Check:</strong> Chords containing three consecutive half steps are deemed unstable and are marked accordingly.</li>
                        <li><strong>Example Analysis:</strong> If your chord includes the notes E and F#, the trainer will:
                            <ul>
                                <li>Assign E as the root and determine F# as the 9th.</li>
                                <li>Alternatively, assign F# as the root and determine E as the 7th, labeling the chord as F#7.</li>
                            </ul>
                        </li>
                        <li><strong>Preferred Spelling:</strong> To enhance readability, the trainer prefers the spelling (sharp or flat) with fewer accidentals.</li>
                        <li><strong>Result:</strong> The analysis concludes with the root, harmonic functions, and the chord symbol.</li>
                    </ul>

                    <h3>How to Read Chord Symbols</h3>
                    <p>Chord symbols in the Harmonic Ear Trainer are designed to be informative and easy to understand:</p>
                    <ul>
                        <li><strong>Root Note:</strong> The foundational note of the chord.</li>
                        <li><strong>Highest Overtone:</strong> The highest harmonic overtone present in the chord.</li>
                        <li><strong>Sequence of Overtones:</strong> Listed in the order of 1, 3, 5, 7, 9, 11, 13.</li>
                        <li><strong>Missing Overtones:</strong> Indicated with "no". For instance, "C9 no 5" signifies a C9 chord with the 5th omitted.</li>
                        <li><strong>Modifiers:</strong>
                            <ul>
                                <li><strong>Major 7th:</strong> Indicated with a triangle (Δ), e.g., "CΔ7".</li>
                                <li><strong>Minor:</strong> Indicated with "m", e.g., "Cm".</li>
                                <li><strong>Diminished:</strong> Indicated with "°", e.g., "C°".</li>
                                <li><strong>Augmented:</strong> Indicated with "+", e.g., "C+".</li>
                            </ul>
                        </li>
                    </ul>

                    <h3>Tips for Using the Reference Pitch</h3>
                    <p>The key to taking advantage of this app is learning to hear the chords generated in a meaningful context, where the meaning is dependent on locating the correct root. Use the reference pitch C:</p>
                    <ol>
                        <li><strong>Sing the Note C:</strong> Begin by singing the note C from the reference pitch in the context of the question chord and try to see whether it fits somewhere within the question.</li>
                        <li><strong>Example:</strong> If the question contains the notes Ab and Eb, and you sing C, you'll realize you're singing the major third.</li>
                        <li><strong>Chord Roles:</strong> Sometimes the reference pitch will be a chord tone like 1, 3, 5, or even 7. Other times, the reference pitch will feel like a beautiful color of the chord. For example, if the question chord is Bb, D, and F, the reference pitch C would function as the add 9.
                            <ul>
                                <li>In these cases, you can try to resolve the reference pitch a whole step up or down.</li>
                            </ul>
                        </li>
                        <li><strong>Dissonant Context:</strong> In other cases, the reference pitch will feel very dissonant. For example, if the chord given is B, D#, and F#, the reference pitch C would function as a flat 9.
                            <ul>
                                <li>In cases like these, if you can't hear it immediately, try to resolve the reference pitch half a step down and see that you land on the one of B major.</li>
                            </ul>
                        </li>
                    </ol>
                    <p>By using these strategies, you can develop a deeper understanding and sensitivity to the harmonic context of chords.</p>

                    <h3>Settings</h3>
                    <p>The settings dialog allows you to customize various aspects of the Harmonic Ear Trainer to suit your preferences and training needs.</p>
                    <ul>
                        <li><strong>Number of Notes:</strong> Adjusts the number of notes in each chord generated by the app.
                            <ul>
                                <li><strong>Options:</strong> Typically ranges from 1 to 10 notes.</li>
                                <li><strong>Usage:</strong> Increasing the number of notes makes the chords more complex and challenging to identify.</li>
                            </ul>
                        </li>
                        <li><strong>Game Length:</strong> Sets the duration of each round.
                            <ul>
                                <li><strong>Options:</strong> 1 minute, 2 minutes, 3 minutes, and Eternity.</li>
                                <li><strong>Usage:</strong> Choose a shorter duration for quick practice sessions or select Eternity for an unlimited practice session.</li>
                            </ul>
                        </li>
                        <li><strong>Piano Sound:</strong> Toggles the sound of the virtual piano.
                            <ul>
                                <li><strong>Options:</strong> On, Off.</li>
                                <li><strong>Usage:</strong> Turn off the sound if you prefer to practice silently or to avoid disturbing others.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Documentation;