import React from 'react';

const TriadsLearning = () => {
  return (
    <div className="container">
      <div className="box mt-6">
        <h1 className="title is-3">How to Build Triads</h1>
        
        <p className="mb-4">
          A triad is a chord made up of three notes. The most basic and commonly used triads are major triads. To build a triad, you use the first (root), third, and fifth notes of the scale.
        </p>

        <h2 className="title is-4">Major Triads</h2>
        <p className="mb-2">Harmonic Functions for Major Triads: 1 - 3 - 5</p>
        <ul className="mb-4">
          <li><strong>Root Note (1):</strong> The first note of the major scale.</li>
          <li><strong>Major Third (3):</strong> The third note of the major scale.</li>
          <li><strong>Perfect Fifth (5):</strong> The fifth note of the major scale.</li>
        </ul>

        <p className="mb-4">
          For example, to build a C major triad:
          <ul>
            <li>The root note is C (1).</li>
            <li>The major third is E (3), the third note in the C major scale.</li>
            <li>The perfect fifth is G (5), the fifth note in the C major scale.</li>
          </ul>
          So, the C major triad consists of the notes C, E, and G (1 - 3 - 5).
        </p>

        <h2 className="title is-4">Minor Triads</h2>
        <p className="mb-2">
          A minor triad is similar to a major triad but has a minor third instead of a major third. To build a minor triad from a major triad, you lower the third note by one half-step (semitone).
        </p>
        <p className="mb-2">Harmonic Functions for Minor Triads: 1 - ♭3 - 5</p>
        <ul className="mb-4">
          <li><strong>Root Note (1):</strong> The first note of the major scale.</li>
          <li><strong>Minor Third (♭3):</strong> Lower the third note of the major scale by one half-step.</li>
          <li><strong>Perfect Fifth (5):</strong> The fifth note of the major scale.</li>
        </ul>

        <h2 className="title is-4">Diminished Triads</h2>
        <p className="mb-2">
          A diminished triad is formed by lowering both the third and the fifth of a major triad by one half-step (semitone).
        </p>
        <p className="mb-2">Harmonic Functions for Diminished Triads: 1 - ♭3 - ♭5</p>
        <ul className="mb-4">
          <li><strong>Root Note (1):</strong> The first note of the major scale.</li>
          <li><strong>Minor Third (♭3):</strong> Lower the third note of the major scale by one half-step.</li>
          <li><strong>Diminished Fifth (♭5):</strong> Lower the fifth note of the major scale by one half-step.</li>
        </ul>

        <h2 className="title is-4">Augmented Triads</h2>
        <p className="mb-2">
          An augmented triad is formed by raising the fifth of a major triad by one half-step (semitone).
        </p>
        <p className="mb-2">Harmonic Functions for Augmented Triads: 1 - 3 - ♯5</p>
        <ul className="mb-4">
          <li><strong>Root Note (1):</strong> The first note of the major scale.</li>
          <li><strong>Major Third (3):</strong> The third note of the major scale.</li>
          <li><strong>Augmented Fifth (♯5):</strong> Raise the fifth note of the major scale by one half-step.</li>
        </ul>

        <h2 className="title is-4">Comparative Harmonic Function Chart</h2>
        <div className="table-container">
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Triad Type</th>
                <th>Root (1)</th>
                <th>Third</th>
                <th>Fifth</th>
                <th>Harmonic Functions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Major</td>
                <td>1</td>
                <td>3</td>
                <td>5</td>
                <td>1 - 3 - 5</td>
              </tr>
              <tr>
                <td>Minor</td>
                <td>1</td>
                <td>♭3</td>
                <td>5</td>
                <td>1 - ♭3 - 5</td>
              </tr>
              <tr>
                <td>Diminished</td>
                <td>1</td>
                <td>♭3</td>
                <td>♭5</td>
                <td>1 - ♭3 - ♭5</td>
              </tr>
              <tr>
                <td>Augmented</td>
                <td>1</td>
                <td>3</td>
                <td>♯5</td>
                <td>1 - 3 - ♯5</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="title is-4 mt-6">Extended Examples</h2>
        <p className="mb-4">
          Let's explore examples of each triad type using different major scale keys:
        </p>

        <h3 className="title is-5">1. Major Triads</h3>
        <ul className="mb-4">
          <li><strong>C Major:</strong> C - E - G (1 - 3 - 5 in C major scale)</li>
          <li><strong>F Major:</strong> F - A - C (1 - 3 - 5 in F major scale)</li>
          <li><strong>G Major:</strong> G - B - D (1 - 3 - 5 in G major scale)</li>
          <li><strong>B♭ Major:</strong> B♭ - D - F (1 - 3 - 5 in B♭ major scale)</li>
        </ul>

        <h3 className="title is-5">2. Minor Triads</h3>
        <ul className="mb-4">
          <li><strong>A Minor:</strong> A - C - E (1 - ♭3 - 5 in A major scale)</li>
          <li><strong>D Minor:</strong> D - F - A (1 - ♭3 - 5 in D major scale)</li>
          <li><strong>E Minor:</strong> E - G - B (1 - ♭3 - 5 in E major scale)</li>
          <li><strong>G Minor:</strong> G - B♭ - D (1 - ♭3 - 5 in G major scale)</li>
        </ul>

        <h3 className="title is-5">3. Diminished Triads</h3>
        <ul className="mb-4">
          <li><strong>B Diminished:</strong> B - D - F (1 - ♭3 - ♭5 in B major scale)</li>
          <li><strong>C♯ Diminished:</strong> C♯ - E - G (1 - ♭3 - ♭5 in C♯ major scale)</li>
          <li><strong>F♯ Diminished:</strong> F♯ - A - C (1 - ♭3 - ♭5 in F♯ major scale)</li>
          <li><strong>A Diminished:</strong> A - C - E♭ (1 - ♭3 - ♭5 in A major scale)</li>
        </ul>

        <h3 className="title is-5">4. Augmented Triads</h3>
        <ul className="mb-4">
          <li><strong>C Augmented:</strong> C - E - G♯ (1 - 3 - ♯5 in C major scale)</li>
          <li><strong>E♭ Augmented:</strong> E♭ - G - B (1 - 3 - ♯5 in E♭ major scale)</li>
          <li><strong>F♯ Augmented:</strong> F♯ - A♯ - C𝄪 (1 - 3 - ♯5 in F♯ major scale)</li>
          <li><strong>A Augmented:</strong> A - C♯ - E♯ (1 - 3 - ♯5 in A major scale)</li>
        </ul>

        <p className="mb-4">
          Note: In these examples, we're using the major scale of the root note as a reference point for building each triad. Remember that:
        </p>
        <ul className="mb-4">
          <li>Major triads use the 1st, 3rd, and 5th degrees of the major scale.</li>
          <li>Minor triads lower the 3rd degree by a half-step.</li>
          <li>Diminished triads lower both the 3rd and 5th degrees by a half-step.</li>
          <li>Augmented triads raise the 5th degree by a half-step.</li>
        </ul>
        <p>
          Practice building these triads in different keys to become familiar with their structure and sound.
        </p>
      </div>
    </div>
  );
};

export default TriadsLearning;