import React, { useState } from 'react';
import '../styles/NavBar.css';
import { Settings } from 'lucide-react';

const GameLengths = {
    ONE_MINUTE: 60,
    TWO_MINUTES: 120,
    THREE_MINUTES: 180,
    ETERNITY: Infinity
};

const Navbar = ({ numNotes, setNumNotes, pianoSound, setPianoSound, gameLength, setGameLength }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    return (
        <nav className="navbar is-dark" aria-label="main navigation">
            <div className="navbar-brand">
                <span className="navbar-item">
                    <strong className="is-size-4">HARMONIC EAR TRAINER</strong>
                </span>
            </div>

            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className={`dropdown is-right ${isSettingsOpen ? 'is-active' : ''}`}>
                            <div className="dropdown-trigger">
                                <button
                                    className="button is-dark"
                                    aria-haspopup="true"
                                    aria-controls="settings-menu"
                                    onClick={toggleSettings}
                                >
                                    <span className="icon is-small">
                                        <Settings size={18} />
                                    </span>
                                    <span>Settings</span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="settings-menu" role="menu">
                                <div className="dropdown-content has-background-dark">
                                    <div className="dropdown-item">
                                        <div className="field">
                                            <label className="label has-text-light">Chord Complexity</label>
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select
                                                        value={numNotes}
                                                        onChange={(e) => setNumNotes(Number(e.target.value))}
                                                    >
                                                        {[...Array(10)].map((_, i) => (
                                                            <option key={i + 1} value={i + 1}>
                                                                {i + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown-item">
                                        <div className="field">
                                            <label className="label has-text-light">Game Length</label>
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select
                                                        value={gameLength}
                                                        onChange={(e) => setGameLength(Number(e.target.value))}
                                                    >
                                                        <option value={GameLengths.ONE_MINUTE}>1 Minute</option>
                                                        <option value={GameLengths.TWO_MINUTES}>2 Minutes</option>
                                                        <option value={GameLengths.THREE_MINUTES}>3 Minutes</option>
                                                        <option value={GameLengths.ETERNITY}>Eternity</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown-item">
                                        <button
                                            className={`button piano-sound-btn ${pianoSound ? 'is-active' : ''}`}
                                            onClick={() => setPianoSound(!pianoSound)}
                                        >
                                            Piano Sound
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;