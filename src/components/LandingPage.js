import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const modes = [
        {
            name: 'Learn',
            description: 'Explore interactive lessons on chord construction',
            path: '/learn',
            topics: ['Triads', '7th Chords', 'Chord Variations']
        },
        {
            name: 'Practice',
            description: 'Build chords at your own pace with instant feedback',
            path: '/practice',
            features: ['Untimed exercises', 'Immediate feedback']
        },
        {
            name: 'Quiz',
            description: 'Test your skills with timed challenges',
            path: '/quiz',
            features: ['Timed sessions', 'Progress tracking']
        }
    ];

    return (
        <div className="landing-content">
            <h1 className="title">Build scales. Build chords. Quickly.</h1>
            <p className="subtitle"></p>
            
            <div className="app-overview">
                <p>
                    Chord Spelling Master provides tools for learning and practicing chord and scale construction. Choose from three modes to enhance your skills:
                </p>
            </div>

            <div className="mode-container">
                {modes.map((mode) => (
                    <div key={mode.name} className="mode-card">
                        <h2>{mode.name} Mode</h2>
                        <p>{mode.description}</p>
                        <ul>
                            {mode.topics && mode.topics.map(topic => <li key={topic}>{topic}</li>)}
                            {mode.features && mode.features.map(feature => <li key={feature}>{feature}</li>)}
                        </ul>
                        <Link to={mode.path} className="mode-button">
                            Enter {mode.name} Mode
                        </Link>
                    </div>
                ))}
            </div>

            <div className="usage-guide">
                <h3>How to Use</h3>
                <ul>
                    <li><strong>Learning Mode:</strong> The essential theory of chord construction.</li>
                    <li><strong>Practice Mode:</strong> For hands-on practice and skill development.</li>
                    <li><strong>Quiz Mode:</strong> For graded proficiency under time constraints.</li>
                    <li><strong>It's highly recomended to have a strong grasp of major scales before attempting to build chords.</strong></li>
                </ul>
            </div>
        </div>
    );
};

export default LandingPage;