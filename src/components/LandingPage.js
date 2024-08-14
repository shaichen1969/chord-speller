import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';  // Make sure this import is present

const LandingPage = () => {
    const modes = [
        {
            name: 'Learn',
            description: 'Learn the essential theory for scale and chord construction.',
            path: '/learn'
        },
        {
            name: 'Practice',
            description: 'Construct chords and scales at your own pace with instant, personalized feedback.',
            path: '/practice'
        },
        {
            name: 'Quiz',
            description: 'Challenge yourself with timed, graded exercises to gauge and improve your proficiency.',
            path: '/quiz'
        }
    ];

    return (
        <div className="landing-page">
            <h1 className="landing-title">Chord Spelling Master</h1>
            <p className="landing-subtitle">Build Chords. Build Scales. Quickly.</p>
            <div className="landing-card-container">
                {modes.map((mode) => (
                    <Link key={mode.name} to={mode.path} className="landing-card">
                        <h2 className="landing-card-title">{mode.name}</h2>
                        <p className="landing-card-description">{mode.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;