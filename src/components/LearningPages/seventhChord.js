import React from 'react';

const SeventhChordLearning = () => {
    return (
        <div className="container">
            <div className="box mt-6">
                <h1 className="title is-3">How to Build 7th Chords</h1>

                <p className="mb-4">
                    Building 7th chords builds upon your knowledge of triads. You already know how to form major, minor, diminished, and augmented triads. To transform a triad into a 7th chord, you need to add a 7th degree note above the root.
                </p>

                <h2 className="title is-4">Types of 7th Chords:</h2>
                <ol className="mb-4">
                    <li>Major 7th Chord (Maj7 or Δ7)</li>
                    <li>Dominant 7th Chord (7)</li>
                    <li>Minor 7th Chord (m7)</li>
                    <li>Half-Diminished 7th Chord (m7♭5 or ø7)</li>
                    <li>Fully Diminished 7th Chord (dim7 or o7)</li>
                </ol>

                <h2 className="title is-4">Building Major 7th Chords</h2>
                <p className="mb-2"><strong>Major 7th Chord (Maj7 or Δ7)</strong></p>
                <ul className="mb-4">
                    <li>Built by adding the major 7th (7th degree of the major scale) to a major triad.</li>
                    <li>Example: C Major 7th (CΔ7) = C (1), E (3), G (5), B (7)</li>
                    <li>Note: The triangle (Δ) symbol sometimes alone signifies a Major 7th chord, with the "7" omitted.</li>
                </ul>

                <h2 className="title is-4">Building Dominant 7th Chords</h2>
                <p className="mb-2"><strong>Dominant 7th Chord (7)</strong></p>
                <ul className="mb-4">
                    <li>Built by adding a minor 7th (♭7, one whole step below the octave) to a major triad.</li>
                    <li>Example: C Dominant 7th (C7) = C (1), E (3), G (5), B♭ (♭7)</li>
                </ul>

                <h2 className="title is-4">Building Minor 7th Chords</h2>
                <p className="mb-2"><strong>Minor 7th Chord (m7)</strong></p>
                <ul className="mb-4">
                    <li>Built by adding a minor 7th (♭7) to a minor triad.</li>
                    <li>Example: C Minor 7th (Cm7) = C (1), E♭ (♭3), G (5), B♭ (♭7)</li>
                </ul>

                <h2 className="title is-4">Building Half-Diminished 7th Chords</h2>
                <p className="mb-2"><strong>Half-Diminished 7th Chord (m7♭5 or ø7)</strong></p>
                <ul className="mb-4">
                    <li>Built by adding a minor 7th (♭7) to a diminished triad.</li>
                    <li>Example: C Half-Diminished 7th (Cø7) = C (1), E♭ (♭3), G♭ (♭5), B♭ (♭7)</li>
                </ul>

                <h2 className="title is-4">Building Fully Diminished 7th Chords</h2>
                <p className="mb-2"><strong>Fully Diminished 7th Chord (dim7 or o7)</strong></p>
                <ul className="mb-4">
                    <li>Built by adding a diminished 7th (♭♭7, also known as a major 6th from the root) to a diminished triad.</li>
                    <li>Example: C Fully Diminished 7th (Co7) = C (1), E♭ (♭3), G♭ (♭5), B♭♭ (♭♭7 or A)</li>
                </ul>

                <h2 className="title is-4">Comparative Harmonic Function Chart</h2>
                <div className="table-container">
                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Chord Type</th>
                                <th>Root (1)</th>
                                <th>Third</th>
                                <th>Fifth</th>
                                <th>Seventh</th>
                                <th>Harmonic Functions</th>
                                <th>Typical Chord Symbol</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Major 7th (Maj7, Δ7)</td>
                                <td>1</td>
                                <td>3</td>
                                <td>5</td>
                                <td>7</td>
                                <td>1 - 3 - 5 - 7</td>
                                <td>CΔ7, CMaj7, CΔ</td>
                            </tr>
                            <tr>
                                <td>Dominant 7th (7)</td>
                                <td>1</td>
                                <td>3</td>
                                <td>5</td>
                                <td>♭7</td>
                                <td>1 - 3 - 5 - ♭7</td>
                                <td>C7</td>
                            </tr>
                            <tr>
                                <td>Minor 7th (m7)</td>
                                <td>1</td>
                                <td>♭3</td>
                                <td>5</td>
                                <td>♭7</td>
                                <td>1 - ♭3 - 5 - ♭7</td>
                                <td>Cm7</td>
                            </tr>
                            <tr>
                                <td>Half-Diminished 7th (ø7)</td>
                                <td>1</td>
                                <td>♭3</td>
                                <td>♭5</td>
                                <td>♭7</td>
                                <td>1 - ♭3 - ♭5 - ♭7</td>
                                <td>Cø7, Cm7♭5</td>
                            </tr>
                            <tr>
                                <td>Fully Diminished 7th (o7)</td>
                                <td>1</td>
                                <td>♭3</td>
                                <td>♭5</td>
                                <td>♭♭7 (major 6th)</td>
                                <td>1 - ♭3 - ♭5 - ♭♭7</td>
                                <td>Co7, Cdim7</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2 className="title is-4 mt-6">Abbreviations</h2>
                <ul className="mb-4">
                    <li><strong>Major 7th</strong>: Maj7, Δ7</li>
                    <li><strong>Dominant 7th</strong>: 7</li>
                    <li><strong>Minor 7th</strong>: m7</li>
                    <li><strong>Half-Diminished 7th</strong>: m7♭5, ø7</li>
                    <li><strong>Fully Diminished 7th</strong>: dim7, o7</li>
                </ul>

                <h2 className="title is-4">Shortcut for Finding the 7th</h2>
                <p className="mb-2">To quickly find the 7th note of a chord:</p>
                <ul className="mb-4">
                    <li><strong>Major 7th</strong>: One half-step below the root note's octave.</li>
                    <li><strong>Minor 7th (♭7)</strong>: One whole step below the root note's octave.</li>
                    <li><strong>Diminished 7th (♭♭7)</strong>: One and a half steps (minor third) below the root note's octave.</li>
                </ul>

                <h3 className="title is-5">Example with C Major:</h3>
                <ul className="mb-4">
                    <li><strong>C Major 7th (CΔ7)</strong>: Root is C. Major 7th is B (one half-step below C's octave).</li>
                    <li><strong>C Dominant 7th (C7)</strong>: Root is C. Minor 7th is B♭ (one whole step below C's octave).</li>
                    <li><strong>C Fully Diminished 7th (Co7)</strong>: Root is C. Diminished 7th is A (one and a half steps below C's octave).</li>
                </ul>

                <p className="mt-6">
                    By understanding these principles, you can easily build any type of 7th chord from the triads you've already learned. The comparative chart and shortcuts will help you quickly determine the notes needed for each 7th chord type.
                </p>
            </div>
        </div>
    );
};

export default SeventhChordLearning;