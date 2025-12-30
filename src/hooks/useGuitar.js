import { useRef } from "react";

export const STRINGS = [
    { name: "E", freq: 329.63, thickness: 1 }, // High E
    { name: "B", freq: 246.94, thickness: 1.5 },
    { name: "G", freq: 196.0, thickness: 2 },
    { name: "D", freq: 146.83, thickness: 2.5 },
    { name: "A", freq: 110.0, thickness: 3 },
    { name: "E", freq: 82.41, thickness: 3.5 }, // Low E
];

export const CHORDS = {
    C: [null, 1, 0, 2, 3, null],
    G: [3, 3, 0, 0, 2, 3],
    Am: [null, 1, 2, 2, 0, null],
};

export function useGuitar() {
    const audioCtxRef = useRef(null);

    function getCtx() {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioCtxRef.current;
    }

    function playNote(freq, duration = 1.2) {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.value = freq;

        osc.connect(gain);
        gain.connect(ctx.destination);

        gain.gain.setValueAtTime(0.8, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }

    function playStringFret(stringIndex, fret) {
        const baseFreq = STRINGS[stringIndex].freq;
        const freq = baseFreq * Math.pow(2, fret / 12);
        playNote(freq);
    }

    function playChord(chordName) {
        const chord = CHORDS[chordName];
        if (!chord) return;

        chord.forEach((fret, index) => {
            if (fret !== null) {
                playStringFret(index, fret);
            }
        });
    }

    return { playNote, playStringFret, playChord };
}
