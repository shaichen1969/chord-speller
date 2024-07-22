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
                    <p>Start a Round: Kick off your training session by clicking the "Go" button. This sets the game in motion, initializing the game, setting your score to zero, and generating a fresh chord question.</p>
                    <p>Answering Questions: Listen carefully to the chord and identify the notes by selecting the correct keys on the piano. Each correct note will be marked, and your score will increase.</p>
                    <p>Game Modes: Choose your challenge with game lengths set to 1 minute, 2 minutes, 3 minutes, or "Eternity". When the timer runs out (except in Eternity mode), the round ends, and your final score is displayed.</p>
                    <p>Ending a Round: Wrap up your session at any time by clicking the "End Round" button, and see how well you've done with your final score.</p>

                    <h3>Scoring System</h3>
                    <h4>Overview</h4>
                    <p>The scoring system is designed to provide a clear metric for player progress and to determine when a player is ready to advance to more complex chords. The system rewards accuracy and penalizes mistakes, with the goal of encouraging careful listening and precise identification of chord components.</p>

                    <h4>Scoring Rules</h4>
                    <p>Correct Chord Identification:</p>
                    <ul>
                        <li>Points Awarded: 5 points × number of notes in the chord</li>
                        <li>Example: Correctly identifying a 3-note chord awards 15 points</li>
                    </ul>
                    <p>Incorrect Guess:</p>
                    <ul>
                        <li>Penalty: 5 points × number of notes in the chord, deducted for each incorrect guess</li>
                        <li>This applies to individual note guesses within a chord</li>
                    </ul>
                    <p>Using Reference Pitch:</p>
                    <ul>
                        <li>Penalty: 5 points deducted each time the reference pitch is played</li>
                    </ul>
                    <p>Skipping a Chord:</p>
                    <ul>
                        <li>Penalty: 5 points × number of notes in the skipped chord</li>
                        <li>Example: Skipping a 3-note chord results in a 15-point deduction</li>
                    </ul>

                    <h4>Progression Benchmark</h4>
                    <p>A score of approximately 100 points in a one-minute game is considered a good benchmark for moving to more complex chords. This target encourages you to:</p>
                    <ul>
                        <li>Accurately identify chords</li>
                        <li>Minimize incorrect guesses</li>
                        <li>Use the reference pitch sparingly</li>
                        <li>Avoid skipping chords unless necessary</li>
                    </ul>

                    <h4>Strategy Tips</h4>
                    <p>Prioritize accuracy over speed. It's better to take time and correctly identify a chord than to make quick, incorrect guesses.</p>
                    <p>Use the reference pitch judiciously. While it can help orient you, frequent use will significantly impact your score.</p>
                    <p>Only skip chords if you're truly stuck. The penalty for skipping is substantial, especially for more complex chords.</p>
                    <p>Focus on identifying the root and quality of the chord first, then work on pinpointing additional notes.</p>

                    <h4>Examples</h4>
                    <p>Player correctly identifies a 3-note chord:</p>
                    <ul>
                        <li>Score: +15 points (5 × 3 notes)</li>
                    </ul>
                    <p>Player makes two incorrect guesses before correctly identifying a 4-note chord:</p>
                    <ul>
                        <li>Penalty for incorrect guesses: -40 points (5 × 4 notes × 2 guesses)</li>
                        <li>Score for correct identification: +20 points (5 × 4 notes)</li>
                        <li>Net score: -20 points</li>
                    </ul>
                    <p>Player uses the reference pitch twice and then correctly identifies a 3-note chord:</p>
                    <ul>
                        <li>Penalty for reference use: -10 points (5 × 2 uses)</li>
                        <li>Score for correct identification: +15 points (5 × 3 notes)</li>
                        <li>Net score: +5 points</li>
                    </ul>
                    <p>Player skips a 5-note chord:</p>
                    <ul>
                        <li>Penalty: -25 points (5 × 5 notes)</li>
                    </ul>

                    <h3>How the Harmonic Ear Trainer Analyzes Chords</h3>
                    <p>The Harmonic Ear Trainer performs a comprehensive analysis of chords to identify the most stable combinations:</p>
                    <p>Chord Generation: When a new chord is generated, the application analyzes the given pitches and their potential overtones (1, 3, 5, 7, 9, 11, 13).</p>
                    <p>Multiple Root Analysis: The trainer considers each note of the chord as a potential root, creating multiple harmonic interpretations.</p>
                    <p>Stability Check: Chords containing three consecutive half steps are deemed unstable and are marked accordingly.</p>
                    <p>Overtone Analysis: For each potential root, the trainer calculates the harmonic functions of the other notes in relation to that root.</p>
                    <p>Scoring: Each interpretation is scored based on the complexity and stability of the resulting harmonic functions.</p>
                    <p>Selection: The interpretation with the lowest score (indicating the most stable and simple harmonic structure) is chosen as the preferred analysis.</p>
                    <p>Preferred Spelling: To enhance readability, the trainer selects the spelling (sharp or flat) with fewer accidentals.</p>

                    <h4>Example Analysis: C, D, and E</h4>
                    <p>Let's consider a chord consisting of the notes C, D, and E. The trainer will analyze this chord from three perspectives:</p>
                    <p>C as root:</p>
                    <ul>
                        <li>C = 1 (root)</li>
                        <li>D = 9 (major 2nd)</li>
                        <li>E = 3 (major 3rd)</li>
                        <li>Interpretation: CMaj(9)</li>
                    </ul>
                    <p>D as root:</p>
                    <ul>
                        <li>D = 1 (root)</li>
                        <li>E = 9 (major 2nd)</li>
                        <li>C = ♭7 (minor 7th)</li>
                        <li>Interpretation: D7(9)</li>
                    </ul>
                    <p>E as root:</p>
                    <ul>
                        <li>E = 1 (root)</li>
                        <li>C = ♭6 (minor 6th)</li>
                        <li>D = ♭7 (minor 7th)</li>
                        <li>Interpretation: E7(♭13)</li>
                    </ul>
                    <p>The trainer would likely choose the first interpretation (C as root) as it provides the most stable harmonic structure with the simplest functions (1, 3, 9).</p>

                    <h3>Understanding the Harmonic Tree</h3>
                    <p>The Harmonic Tree is a visual representation of the chord's structure based on the overtone series. It helps users understand the harmonic relationships within the chord:</p>
                    <p>Root: The base of the tree, representing the fundamental note of the chord.</p>
                    <p>Levels: Each level of the tree corresponds to an overtone in the series (1, 3, 5, 7, 9, 11, 13).</p>
                    <p>Filled Circles: Indicate the presence of a particular harmonic function in the chord.</p>
                    <p>Empty Circles: Represent potential overtones that are not present in the current chord.</p>
                    <p>Harmonic Functions: Labels next to each circle show the specific function of each note (e.g., 1, ♭3, 5, ♭7).</p>
                    <p>The Harmonic Tree provides a quick visual reference for understanding the chord's structure, making it easier to grasp complex harmonic relationships at a glance.</p>
                    <p>Result: The analysis concludes with the determined root, harmonic functions of each note, and the chord symbol that best describes the harmonic structure.</p>
                    <p>This approach allows the Harmonic Ear Trainer to provide a comprehensive analysis of any given chord, offering insights into its structure from multiple perspectives and presenting the most musically relevant interpretation.</p>

                    <h3>How to Read Chord Symbols</h3>
                    <p>Chord symbols in the Harmonic Ear Trainer are designed to be informative easy to understand and denote missing overtones within chords:</p>
                    <p>Root Note: The foundational note of the chord.</p>
                    <p>Highest Overtone: The highest harmonic overtone present in the chord.</p>
                    <p>Sequence of Overtones: Listed in the order of 1, 3, 5, 7, 9, 11, 13.</p>
                    <p>Missing Overtones: Indicated with "no". For instance, "C9 no 5" signifies a C9 chord with the 5th omitted.</p>
                    <p>Modifiers:</p>
                    <ul>
                        <li>Major 7th: Indicated with a triangle (Δ), e.g., "CΔ7".</li>
                        <li>Minor: Indicated with "m", e.g., "Cm".</li>
                        <li>Diminished: Indicated with "°", e.g., "C°".</li>
                        <li>Augmented: Indicated with "+", e.g., "C+".</li>
                    </ul>

                    <h3>Tips for Using the Reference Pitch</h3>
                    <p>The key to taking advantage of this app is learning to hear the chords generated in a meaningful context, where the meaning is dependent on locating the correct root. Use the reference pitch C:</p>
                    <p>Sing the Note C: Begin by singing the note C from the reference pitch in the context of the question chord and try to see whether it fits somewhere within the question.</p>
                    <p>Example: If the question contains the notes Ab and Eb, and you sing C, you'll realize you're singing the major third.</p>
                    <p>Chord Roles: Sometimes the reference pitch will be a chord tone like 1, 3, 5, or even 7. Other times, the reference pitch will feel like a beautiful color of the chord. For example, if the question chord is Bb, D, and F, the reference pitch C would function as the add 9.</p>
                    <ul>
                        <li>In these cases, you can try to resolve the reference pitch a whole step up or down.</li>
                    </ul>
                    <p>Dissonant Context: In other cases, the reference pitch will feel very dissonant. For example, if the chord given is B, D#, and F#, the reference pitch C would function as a flat 9.</p>
                    <ul>
                        <li>In cases like these, if you can't hear it immediately, try to resolve the reference pitch half a step down and see that you land on the one of B major.</li>
                    </ul>
                    <p>By using these strategies, you can develop a deeper understanding and sensitivity to the harmonic context of chords.</p>

                    <h3>Settings</h3>
                    <p>The settings dialog allows you to customize various aspects of the Harmonic Ear Trainer to suit your preferences and training needs.</p>
                    <p>Number of Notes: Adjusts the number of notes in each chord generated by the app.</p>
                    <ul>
                        <li>Options: Ranges from 1 to 10 notes.</li>
                        <li>Usage: Increasing the number of notes makes the chords more complex and challenging to identify.</li>
                        <li>Note: The Harmonic Tree is only available for chords with up to five notes because chords with six or more notes are often harmonically unstable.</li>
                    </ul>
                    <p>Game Length: Sets the duration of each round.</p>
                    <ul>
                        <li>Options: 1 minute, 2 minutes, 3 minutes, and Eternity.</li>
                        <li>Usage: Choose a shorter duration for quick practice sessions or select Eternity for an unlimited practice session.</li>
                    </ul>
                    <p>Piano Sound: Toggles the sound of the virtual piano.</p>
                    <ul>
                        <li>Options: On, Off.</li>
                        <li>Usage: Turn off the sound if you prefer to practice silently or to avoid disturbing others.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Documentation;