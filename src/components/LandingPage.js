import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const modes = [
        {
            name: 'Learn',
            description: 'learn the essential theory for scale and chord construction.',
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
        <div className="landing-content">
            <h1 className="title">Chord Spelling Master</h1>
            <p className="subtitle">Build Chords. Build Scales. Quickly.</p>
            <div className="card-container">
                {modes.map((mode) => (
                    <Link key={mode.name} to={mode.path} className="card">
                        <div className="card-content">
                            <h2 className="card-title">{mode.name}</h2>
                            <p className="card-description">{mode.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;