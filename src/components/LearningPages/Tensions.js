import React from 'react';

const Tensions = () => {
    return (
        <div className="container">
            <div className="box mt-6">
                <h1 className="title is-3">How to Add Tensions to Chords</h1>

                <h2 className="title is-4">Basic Concept of Tensions in Jazz Harmony</h2>
                <p className="mb-4">
                    Tensions in jazz harmony extend beyond the basic 7th chord to add color and complexity. These tensions are derived from the major scale of the chord's root, raised by an octave.
                </p>

                <h3 className="title is-5">1. 9th (Major 9th)</h3>
                <ul className="mb-4">
                    <li><strong>Concept:</strong> The 9th is the 2nd note of the major scale raised by an octave.</li>
                    <li><strong>Example:</strong> For a C major chord, the 2nd note of the C major scale is D. When raised an octave, it becomes the 9th.</li>
                    <li><strong>Chord:</strong> Cmaj9 includes the notes C, E, G, B, and D.</li>
                </ul>

                <h3 className="title is-5">2. Flat 9 (♭9)</h3>
                <ul className="mb-4">
                    <li><strong>Concept:</strong> The flat 9 is a half step above the root, modifying the 9th.</li>
                    <li><strong>Example:</strong> For a C7 chord, the flat 9 is Db, a half step above C.</li>
                    <li><strong>Chord:</strong> C7♭9 includes C, E, G, Bb, and Db.</li>
                </ul>

                <h3 className="title is-5">3. Sharp 9 (♯9)</h3>
                <ul className="mb-4">
                    <li><strong>Concept:</strong> The sharp 9 is a whole step above the root, modifying the 9th.</li>
                    <li><strong>Example:</strong> For a C7 chord, the sharp 9 is D#, a whole step above C.</li>
                    <li><strong>Chord:</strong> C7♯9 includes C, E, G, Bb, and D#.</li>
                </ul>

                <h3 className="title is-5">4. 11th (Perfect 11th)</h3>
                <ul className="mb-4">
                    <li><strong>Concept:</strong> The 11th is the 4th note of the major scale raised by an octave.</li>
                    <li><strong>Example:</strong> For a C major chord, the 4th note of the C major scale is F. When raised an octave, it becomes the 11th.</li>
                    <li><strong>Chord:</strong> Cmaj11 includes the notes C, E, G, B, D, and F.</li>
                </ul>

                <h3 className="title is-5">5. Sharp 11 (♯11)</h3>
                <ul className="mb-4">
                    <li><strong>Concept:</strong> The sharp 11 is an augmented fourth (or diminished fifth) above the root, modifying the 11th.</li>
                    <li><strong>Example:</strong> For a Cmaj7 chord, the sharp 11 is F#, an augmented fourth above C.</li>
                    <li><strong>Chord:</strong> Cmaj7♯11 includes C, E, G, B, D, and F#.</li>
                </ul>

                <h3 className="title is-5">6. Flat 13 (♭13)</h3>
                <ul className="mb-4">
                    <li><strong>Concept:</strong> The flat 13 is a minor sixth above the root, modifying the 13th.</li>
                    <li><strong>Example:</strong> For a C7 chord, the flat 13 is Ab, a minor sixth above C.</li>
                    <li><strong>Chord:</strong> C7♭13 includes C, E, G, Bb, and Ab.</li>
                </ul>

                <h3 className="title is-5">7. 13th (Major 13th)</h3>
                <ul className="mb-4">
                    <li><strong>Concept:</strong> The 13th is the 6th note of the major scale raised by an octave.</li>
                    <li><strong>Example:</strong> For a C major chord, the 6th note of the C major scale is A. When raised an octave, it becomes the 13th.</li>
                    <li><strong>Chord:</strong> Cmaj13 includes the notes C, E, G, B, D, F, and A.</li>
                </ul>

                <h2 className="title is-4">Summary</h2>
                <ul className="mb-4">
                    <li><strong>9th (Major 9th):</strong> 2nd scale degree raised an octave.</li>
                    <li><strong>Flat 9 (♭9):</strong> Half step above the root.</li>
                    <li><strong>Sharp 9 (♯9):</strong> Whole step above the root.</li>
                    <li><strong>11th (Perfect 11th):</strong> 4th scale degree raised an octave.</li>
                    <li><strong>Sharp 11 (♯11):</strong> Augmented fourth above the root.</li>
                    <li><strong>Flat 13 (♭13):</strong> Minor sixth above the root.</li>
                    <li><strong>13th (Major 13th):</strong> Major sixth above the root.</li>
                </ul>

                <p>
                    This guide should help you understand and apply these tensions in jazz harmony effectively!
                </p>
            </div>
        </div>
    );
};

export default Tensions;
