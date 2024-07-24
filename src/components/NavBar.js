import React, { useState } from 'react';
import { Settings, HelpCircle, Menu } from 'lucide-react';
import '../styles/NavBar.css';

const Navbar = ({ numNotes, setNumNotes, pianoSound, setPianoSound, gameLength, setGameLength, openDocumentation }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    return (
        <nav className="navbar is-dark" aria-label="main navigation">
            <div className="navbar-brand">
                <span className="navbar-item">
                    <strong className="is-size-4">HARMONIC EAR TRAINER</strong>
                </span>
                <span className="navbar-burger" onClick={toggleMenu}>
                    <Menu size={24} color="#fff" />
                </span>
            </div>

            <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
                <div className="navbar-end">
                    <div className="navbar-item" onClick={openDocumentation}>
                        <span className="icon is-small">
                            <HelpCircle size={18} />
                        </span>
                        <span>Help</span>
                    </div>
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
                                                        <option value={60}>1 Minute</option>
                                                        <option value={120}>2 Minutes</option>
                                                        <option value={180}>3 Minutes</option>
                                                        <option value={Infinity}>Eternity</option>
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
