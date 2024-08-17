import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Tone from 'tone';
import * as pianoSounds from './assets/media/piano/index.js';

const PianoContext = createContext();

export const usePiano = () => useContext(PianoContext);

export const PianoProvider = ({ children }) => {
    const [sampler, setSampler] = useState(null);
    const notes = Object.keys(pianoSounds).filter(note => note !== 'C1');

    useEffect(() => {
        const samplerUrls = {};
        notes.forEach(note => {
            samplerUrls[note] = pianoSounds[note];
        });

        const volume = new Tone.Volume(-12).toDestination();
        const limiter = new Tone.Limiter(-3).connect(volume);

        const newSampler = new Tone.Sampler({
            urls: samplerUrls,
            baseUrl: "",
            attack: 0.005,
            release: 0.1,
            curve: 'exponential',
            onload: () => {
                setSampler(newSampler);
            }
        }).connect(limiter);

        return () => {
            if (newSampler) {
                newSampler.dispose();
            }
            volume.dispose();
            limiter.dispose();
        };
    }, []);

    const playNote = (note, duration = '8n') => {
        if (sampler) {
            Tone.context.resume().then(() => {
                const now = Tone.now();
                sampler.triggerAttack(note, now, 0.5);
                sampler.triggerRelease(note, now + Tone.Time(duration).toSeconds());
            });
        }
    };

    const playChord = (chord) => {
        if (sampler) {
            Tone.context.resume().then(() => {
                const now = Tone.now();
                chord.forEach(note => {
                    sampler.triggerAttack(note, now, 0.5);
                    sampler.triggerRelease(note, now + 2);
                });
            });
        }
    };

    return (
        <PianoContext.Provider value={{ sampler, playNote, playChord, notes }}>
            {children}
        </PianoContext.Provider>
    );
};