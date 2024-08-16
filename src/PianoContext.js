import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Tone from 'tone';
import * as pianoSounds from './assets/media/piano/index.js';

const PianoContext = createContext();

export const usePiano = () => useContext(PianoContext);

export const PianoProvider = ({ children }) => {
    const [sampler, setSampler] = useState(null);
    const notes = Object.keys(pianoSounds).filter(note => note !== 'C1'); // Exclude C1 which is a click sound

    useEffect(() => {
        const samplerUrls = {};
        notes.forEach(note => {
            samplerUrls[note] = pianoSounds[note];
        });

        const volume = new Tone.Volume(-12).toDestination(); // -6dB is approximately half volume

        const newSampler = new Tone.Sampler({
            urls: samplerUrls,
            baseUrl: "",
            onload: () => {
                setSampler(newSampler);
            }
        }).connect(volume); // Connect the sampler to the volume node

        return () => {
            if (newSampler) {
                newSampler.dispose();
            }
            volume.dispose();
        };
    }, []);

    const playNote = (note, duration = '2n') => {
        if (sampler) {
            sampler.triggerAttackRelease(note, duration);
        }
    };

    const playChord = (chord) => {
        if (sampler) {
            sampler.triggerAttackRelease(chord, '2n');
        }
    };

    return (
        <PianoContext.Provider value={{ sampler, playNote, playChord, notes }}>
            {children}
        </PianoContext.Provider>
    );
};
