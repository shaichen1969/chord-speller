import React from 'react';
import CircleOfFifths from '../../assets/icons/Circle Of Fifths.svg';

const MajorScales = () => {
    return (
        <div className="container">
            <div className="box mt-6">
                <h1 className="title is-3">Building Major Scales using the Circle of Fifths</h1>

                <p className="mb-4">
                    To build major scales using the Circle of Fifths and understand sharps or flats, follow these guidelines:
                </p>

                {/* Add the Circle of Fifths diagram here */}
                <div className="has-text-centered mb-4">
                    <img src={CircleOfFifths} alt="Circle of Fifths" style={{ maxWidth: '900px', width: '100%' }} />
                </div>

                <p className="mb-4">
                    The Circle of Fifths diagram above shows the relationships between the 12 major scales. Moving clockwise adds sharps, while moving counterclockwise adds flats.
                </p>

                <h2 className="title is-4">Order of Sharps and Flats</h2>
                <ul className="mb-4">
                    <li><strong>Order of Sharps:</strong> F#, C#, G#, D#, A#, E#</li>
                    <li><strong>Order of Flats:</strong> Bb, Eb, Ab, Db, Gb, Cb</li>
                </ul>
                <p className="mb-4">When adding sharps or flats to a key, follow these orders.</p>

                <h2 className="title is-4">Using the Circle of Fifths</h2>

                <h3 className="title is-5">1. Clockwise (Sharps)</h3>
                <ul className="mb-4">
                    <li>Each step clockwise on the Circle of Fifths adds one sharp.</li>
                    <li>Start at <strong>C major</strong> (no sharps or flats).</li>
                    <li><strong>G major</strong> adds 1 sharp (F#).</li>
                    <li><strong>D major</strong> adds 2 sharps (F#, C#).</li>
                    <li><strong>A major</strong> adds 3 sharps (F#, C#, G#).</li>
                    <li><strong>E major</strong> adds 4 sharps (F#, C#, G#, D#).</li>
                    <li><strong>B major</strong> adds 5 sharps (F#, C#, G#, D#, A#).</li>
                    <li><strong>F# major</strong> adds 6 sharps (F#, C#, G#, D#, A#, E#).</li>
                </ul>

                <h3 className="title is-5">2. Counterclockwise (Flats)</h3>
                <ul className="mb-4">
                    <li>Each step counterclockwise adds one flat.</li>
                    <li>Start at <strong>C major</strong> (no sharps or flats).</li>
                    <li><strong>F major</strong> adds 1 flat (Bb).</li>
                    <li><strong>Bb major</strong> adds 2 flats (Bb, Eb).</li>
                    <li><strong>Eb major</strong> adds 3 flats (Bb, Eb, Ab).</li>
                    <li><strong>Ab major</strong> adds 4 flats (Bb, Eb, Ab, Db).</li>
                    <li><strong>Db major</strong> adds 5 flats (Bb, Eb, Ab, Db, Gb).</li>
                    <li><strong>Gb major</strong> adds 6 flats (Bb, Eb, Ab, Db, Gb, Cb).</li>
                </ul>

                <h2 className="title is-4">Counting Sharps and Flats</h2>
                <ul className="mb-4">
                    <li>Each key's position on the Circle of Fifths tells you how many sharps or flats it has.</li>
                    <li>Count the number of steps from <strong>C major</strong> to your target key in either direction. This will tell you how many sharps (if moving clockwise) or flats (if moving counterclockwise) you need.</li>
                    <li>Add the sharps or flats in their respective order. For example, if you're in <strong>D major</strong>, which has 2 sharps, you'll add F# and C# in that order.</li>
                </ul>

                <p className="mb-4">
                    This method teaches how to build all 12 major scales using the Circle of Fifths.
                </p>
            </div>
        </div>
    );
};

export default MajorScales;