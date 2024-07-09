import React, { useState } from 'react';
import '../styles/NavBar.css';
import { Settings, Music } from 'lucide-react';

const Navbar = ({ numNotes, setNumNotes, pianoSound, setPianoSound }) => {
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
                                            <label className="label has-text-light">Notes in Chord:</label>
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
                                            <label className="label has-text-light">Piano Sound:</label>
                                            <div className="control">
                                                <button
                                                    className={`button is-fullwidth ${pianoSound ? 'is-success' : 'is-danger'}`}
                                                    onClick={() => setPianoSound(!pianoSound)}
                                                >
                                                    <span className="icon">
                                                        <Music size={18} />
                                                    </span>
                                                    <span>{pianoSound ? 'On' : 'Off'}</span>
                                                </button>
                                            </div>
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