import useState from 'react-usestateref';
import classNames from 'classnames';
import { useEffect } from 'react';
import Wad from 'web-audio-daw';

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

export default function HeroDefault({
  active,
  handleMidiState,
  setPromptActive
}) {
  const app = useApp();

  const [display, setDisplay] = useState('none');
  const [opacity, setOpacity] = useState('0');

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

  const handleTouchStart = e => {
    const attr = e.target.getAttribute('data-audio');

    audioPlaying[attr].play();
  };

  const handleTouchEnd = e => {
    const attr = e.target.getAttribute('data-audio');

    if (attr === 'kick') {
      audioPlaying[attr].stop();
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
                className="intro__midi-button"
                data-audio={string}
                onTouchStart={handleTouchStart}
                onMouseDown={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
              >
                {string}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
