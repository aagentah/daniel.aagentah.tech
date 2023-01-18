import useState from 'react-usestateref';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';

import { useApp } from '~/context-provider/app';

/**
 * @param {string} image [required]
 * @param {string} title [required]
 * @param {string} description
 * @param {string} heroButtonText
 * @param {string} link
 * @param {string} marginTop [required]
 * @param {string} marginBottom [required]
 * @param {string} modifier
 * @param {string} skeleton [required]
 **/

export default async function HeroDefault({
  active,
  handleMidiState,
  setPromptActive
}) {
  const app = useApp();
  const Wad = (await import('web-audio-daw')).default;

  const [display, setDisplay] = useState('none');
  const [opacity, setOpacity] = useState('0');
  const [activeInstruments, setActiveInstruments] = useState([]);
  const activeInstrumentsRef = useRef([]);

  const macros = {
    1: 'kick',
    2: 'snare',
    3: 'synth',
    4: 'wob',
    5: 'hat',
    6: 'perc',
    7: 'pad',
    8: 'atmos'
  };

  useEffect(() => {
    if (active) {
      setDisplay('block');
      setTimeout(() => {
        setOpacity(1);
        // audioPlaying.pad.play();
        // audioPlaying.atmos.play();
      }, 300);
    } else {
      setOpacity(0);
      setTimeout(() => {
        setDisplay('none');
        audioPlaying.pad.stop();
        audioPlaying.atmos.stop();
      }, 300);
    }
  }, [active]);

  useEffect(() => {
    if (active) {
      // let shouldHandleKeyDown = true;
      // document.onkeydown = function(e) {
      //   if (!shouldHandleKeyDown) return;
      //   shouldHandleKeyDown = false;
      //   handleTouchStart(e);
      // };
      // document.onkeyup = function(e) {
      //   shouldHandleKeyDown = true;
      // };

      // window.addEventListener('keydown', handleTouchStart);

      document.addEventListener('keydown', e => {
        if (e.repeat) return;
        handleTouchStart(e);
      });

      document.addEventListener('keyup', e => {
        if (e.repeat) return;
        handleTouchEnd(e);
      });

      // window.addEventListener('keyup', handleTouchEnd);
    }
  }, [active]);

  const wadEnv = {
    attack: 0.0,
    decay: 0.0,
    sustain: 1.0,
    hold: -1.0,
    release: 0.3
  };

  const instruments = [
    'kick',
    'snare',
    'synth',
    'wob',
    'hat',
    'perc',
    'pad',
    'atmos'
  ];

  const [audioPlaying, setAudioPlaying] = useState({
    kick: new Wad({
      source: `/audio/kick.wav`,
      env: wadEnv
    }),
    snare: new Wad({
      source: `/audio/snare.wav`,
      env: wadEnv
    }),
    synth: new Wad({
      source: `/audio/synth.wav`,
      env: wadEnv
    }),
    wob: new Wad({
      source: `/audio/wob.wav`,
      env: wadEnv
    }),
    hat: new Wad({
      source: `/audio/hat.wav`,
      env: wadEnv
    }),
    perc: new Wad({
      source: `/audio/perc.wav`,
      env: wadEnv
    }),
    pad: new Wad({
      source: `/audio/pad.wav`,
      env: wadEnv
    }),
    atmos: new Wad({
      source: `/audio/atmos.wav`,
      env: wadEnv
    })
  });

  const midiWrapperClass = classNames({
    active
  });

  // And create our custom function in place of the original setActivePoint
  function _setActiveInstruments(val) {
    activeInstrumentsRef.current = val; // Updates the ref
    setActiveInstruments(val);
  }

  const handleTouchStart = e => {
    let attr;
    let int;

    if (e?.type === 'keydown') {
      attr = macros[e.key];
      int = Number(e.key);
    } else {
      attr = e.target.getAttribute('data-audio');
      int = Number(e.target.getAttribute('data-i'));
    }

    if (attr && int) {
      if (!activeInstrumentsRef.current.includes(int)) {
        _setActiveInstruments([...activeInstrumentsRef.current, int]);
        if (audioPlaying[attr]) audioPlaying[attr].play();
      }
    }
  };

  const handleTouchEnd = e => {
    let attr;
    let int;

    if (e?.type === 'keyup') {
      attr = macros[e.key];
      int = Number(e.key);
    } else {
      attr = e.target.getAttribute('data-audio');
      int = Number(e.target.getAttribute('data-i'));
    }

    if (attr && int) {
      _setActiveInstruments(
        activeInstrumentsRef.current.filter(item => item !== int)
      );
      if (audioPlaying[attr]) audioPlaying[attr].stop();
    }
  };

  return (
    <>
      <div
        className="intro__midi__wrapper"
        style={{
          transition: 'opacity 0.3s ease-in-out',
          opacity,
          display
        }}
      >
        {' '}
        <div className="flex  flex-wrap  pr0  pr6-md">
          {instruments.map((string, i) => (
            <div className="col-12  pa2">
              <div
                className={`intro__midi-button  ${
                  activeInstrumentsRef.current.includes(i + 1) ? 'active' : ''
                }`}
                data-i={i + 1}
                data-audio={string}
                // onTouchStart={handleTouchStart}
                onMouseDown={handleTouchStart}
                // onTouchEnd={handleTouchEnd}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
              >
                <span className="intro__midi-button__number">{i + 1}</span>
                {string}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
