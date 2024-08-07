import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const questionModes = [
        { name: 'Standard', description: 'Practice with standard chord spellings', path: '/play/standard' },
        { name: 'Triad Plus Tension', description: 'Identify triads with added tensions', path: '/play/triad-plus-tension' },
        { name: 'Advanced', description: 'Challenge yourself with complex chord structures', path: '/play/advanced' },
    ];

    return (
        <div className="landing-page">
            <h1 className="title">Chord Spelling Master</h1>
            <p className="subtitle">Choose your practice mode</p>
            <div className="card-container">
                {questionModes.map((mode) => (
                    <Link to={mode.path} key={mode.name} className="card">
                        <h2>{mode.name}</h2>
                        <p>{mode.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;