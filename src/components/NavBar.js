import React from 'react';
import '../styles/NavBar.css';

const Navbar = ({ numNotes, setNumNotes }) => {
    return (
        <nav className="navbar is-link" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <strong className="is-size-3">zzHARMONIC EAR TRAINER</strong>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label has-text-white">Notes in Chord:</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <div className="select">
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
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;