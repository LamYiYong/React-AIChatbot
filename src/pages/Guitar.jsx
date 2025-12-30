import "../style/Guitar.css";
import { useGuitar, STRINGS, CHORDS } from "../hooks/useGuitar";

const frets = 12;

export default function Guitar() {
  const { playNote, playChord } = useGuitar();

  return (
    <div className="guitar-container">
      <h1>🎸 Virtual Guitar</h1>

      {/* Chord Buttons */}
      <div className="chord-buttons">
        {Object.keys(CHORDS).map((chord) => (
          <button key={chord} onClick={() => playChord(chord)}>
            {chord}
          </button>
        ))}
      </div>

      {/* Fretboard */}
      <div className="fretboard">
        {STRINGS.map((string, sIndex) => (
          <div key={sIndex} className="string-row">
            <div className="string-label">{string.name}</div>

            <div
              className="string-line"
              style={{ height: `${string.thickness}px` }}
            />

            {Array.from({ length: frets }).map((_, fret) => {
              const freq = string.freq * Math.pow(2, fret / 12);

              return (
                <div
                  key={fret}
                  className="fret"
                  onClick={() => playNote(freq)}
                >
                  {[3, 5, 7, 9, 12].includes(fret) && (
                    <span className="dot"></span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
