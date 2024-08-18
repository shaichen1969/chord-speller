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
                    <p>In Learn mode, you can learn the essential theory required for constructing chords and scales.</p>

                    <h4>2. Practice Mode</h4>
                    <p>Practice mode allows you to apply your knowledge in a low-pressure environment:</p>
                    <ul>
                        
                        <li>Receive immediate feedback. </li>
                        <li>Score points for correct chord constructions. </li>
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
                        <li>Build the chordin the correct order starting with the riit and movibg upwards in the harmonic tree shown on the right</li>
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
                        <li>Correct chord: +5 points per note in the chord</li>
                        <li>Incorrect chord: No points deducted, try again</li>
                        <li>Skipping a chord: -5 points per note in the skipped chord</li>
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
                        <li>Progress to triads.</li>
                        <li>Move on to seventh chords (major 7th, dominant 7th, minor 7th, half-diminished, fully diminished).</li>
                        <li>Explore extended chords and tensions (9ths, 11ths, 13ths).</li>
                    </ol>

                    <h3>Tips for Success</h3>
                    <ul>
                        <li>Master scales firs</li>
                        <li>Work in rhe order of 1 3 5 7 9 11 13 as needed/</li>
                        <li>Use the harmonic tree to visualy understand the relationship between notes in the chord.</li>
                    </ul>

                    <p>Happy practicing, may the fourth (and the third) be with you...</p>
                </div>
            </div>
        </div>
    );
};

export default Documentation;