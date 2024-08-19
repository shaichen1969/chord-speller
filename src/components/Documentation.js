import React from 'react';
import '../styles/Documentation.css';

const Documentation = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="documentation-overlay">
            <div className="documentation-content">
                <h2>Chord Spelling Master Documentation</h2>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="documentation-text">
                    <h3>Introduction</h3>
                    <p>Welcome to Chord Spelling Master, an interactive application designed to enhance your understanding of chord construction and harmony. This app offers three main modes to help you master chord spelling: Learn, Practice, and Quiz.</p>

                    <h3>Application Modes</h3>
                    
                    <h4>1. Learn Mode</h4>
                    <p>In Learn mode, you can learn the essential theory required for constructing chords and scales. This mode provides detailed explanations and visual aids to help you understand the building blocks of harmony.</p>

                    <h4>2. Practice Mode</h4>
                    <p>Practice mode allows you to apply your knowledge in a low-pressure environment:</p>
                    <ul>
                        <li>Receive immediate feedback on your chord constructions.</li>
                        <li>Score points for correct chord constructions.</li>
                    </ul>

                    <h4>3. Quiz Mode</h4>
                    <p>Test your skills and track your progress in Quiz mode:</p>
                    <ul>
                        <li>Build chords under timed conditions.</li>
                        <li>Earn points for correct chord constructions.</li>
                    </ul>

                    <h3>How to Play (Quiz Mode)</h3>
                    <ol>
                        <li>Click the "Go" button to start a new round.</li>
                        <li>Read the chord symbol or description provided.</li>
                        <li>Build the chord by clicking on the virtual piano keys.</li>
                        <li>Build the chord in the correct order starting with the root and moving upwards in the harmonic tree shown on the right.</li>
                        <li>Continue building chords until the time runs out or you choose to end the round.</li>
                    </ol>

                    <h3>Game Modes</h3>
                    <p>Choose from different time-based modes:</p>
                    <ul>
                        <li>1 minute</li>
                        <li>2 minutes</li>
                        <li>3 minutes</li>
                        <li>Eternity (unlimited time)</li>
                    </ul>

                    <h3>Scoring System</h3>
                    <p>Points are awarded based on correct chord construction:</p>
                    <ul>
                        <li>Correct chord: +10 points per note in the chord (awarded only when the entire chord is correctly identified)</li>
                        <li>Incorrect guess: -5 points (only in quiz mode)</li>
                        <li>Skipping a chord: No direct penalty implemented in the provided code</li>
                    </ul>

                    <p>Additional scoring details:</p>
                    <ul>
                        <li>Points are awarded only when the entire chord is correctly identified, not for individual correct notes.</li>
                        <li>In practice mode, there's no penalty for incorrect guesses.</li>
                        <li>The score cannot go below 0.</li>
                        <li>Enharmonic equivalents (e.g., C♯ and D♭) are recognized as correct answers.</li>
                        <li>Notes must be identified in the correct order, starting from the root and moving upwards in the harmonic tree.</li>
                    </ul>

                    <h3>Settings</h3>
                    <p>Customize your experience with these settings:</p>
                    <ul>
                        <li>Game length</li>
                        <li>Piano sound on/off</li>
                    </ul>

                    <h3>Learning Path Recommendation</h3>
                    <p>To get the most out of Chord Spelling Master, we recommend this learning path:</p>
                    <ol>
                        <li>Start with major and minor triads to build a strong foundation.</li>
                        <li>Progress to augmented and diminished triads.</li>
                        <li>Move on to seventh chords (major 7th, dominant 7th, minor 7th, half-diminished, fully diminished).</li>
                        <li>Explore extended chords and tensions (9ths, 11ths, 13ths).</li>
                    </ol>

                    <h3>Tips for Success</h3>
                    <ul>
                        <li>Memorize the structure of common chord types.</li>
                        <li>Practice identifying the root and quality of the chord from the symbol.</li>
                        <li>Use the harmonic tree to understand the relationship between notes in the chord.</li>
                        <li>Gradually increase chord complexity as you improve.</li>
                        <li>Happy practicing, may the fourth (and the third) be with you...</li>
                    </ul>
                    <h3>Contact</h3>
                    <p>For any questions, support, or feedback, please email us at: <a href="mailto:musicq264@gmail.com">musicq264@gmail.com</a></p>
                </div>
            </div>
        </div>
    );
};

export default Documentation;