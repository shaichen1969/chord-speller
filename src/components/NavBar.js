import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, HelpCircle, Home, Menu } from 'lucide-react';
import '../styles/NavBar.css';

const Navbar = ({ openDocumentation, pianoSound, setPianoSound, gameLength, setGameLength }) => {
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
                <Link to="/" className="navbar-item">
                    <strong className="is-size-4">CHORD SPELLING MASTER</strong>
                </Link>
                <a
                    role="button"
                    className={`navbar-burger burger ${isMenuOpen ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded="false"
                    onClick={toggleMenu}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <Link to="/learn" className="navbar-item">
                        Learn
                    </Link>
                    <Link to="/practice" className="navbar-item">
                        Practice
                    </Link>
                    <Link to="/quiz" className="navbar-item">
                        Quiz
                    </Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <button className="button is-dark" onClick={openDocumentation}>
                            <span className="icon is-small">
                                <HelpCircle size={18} />
                            </span>
                            <span>Help</span>
                        </button>
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
                                <div className="dropdown-content">
                                    <div className="dropdown-item">
                                        <p>Piano Sound</p>
                                        <div className="control">
                                            <label className="radio">
                                                <input
                                                    type="radio"
                                                    name="pianoSound"
                                                    checked={pianoSound}
                                                    onChange={() => setPianoSound(true)}
                                                />
                                                On
                                            </label>
                                            <label className="radio">
                                                <input
                                                    type="radio"
                                                    name="pianoSound"
                                                    checked={!pianoSound}
                                                    onChange={() => setPianoSound(false)}
                                                />
                                                Off
                                            </label>
                                        </div>
                                    </div>
                                    <div className="dropdown-item">
                                        <p>Game Length</p>
                                        <div className="select">
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
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;