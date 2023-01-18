import useState from 'react-usestateref';
import classNames from 'classnames';
import { useRef, useEffect } from 'react';

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

export default function Prompt({
  //
  active,
  setMidiActive,
  setPromptActive
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageHeight = app?.deviceSize === 'md' ? null : 400;
  const [inputValue, setInputValue] = useState('');
  const [enteredValue, setEnteredValue] = useState('');
  const [responseValue, setResponseValue] = useState('');
  const [emailInputActive, setEmailInputActive] = useState(false);
  const [display, setDisplay] = useState('block');
  const [opacity, setOpacity] = useState('1');
  const isInProgress = true;

  const lastRef = useRef(null);

  useEffect(() => {
    if (active) {
      setDisplay('block');
      setTimeout(() => {
        setOpacity(1);
      }, 300);
    } else {
      setOpacity(0);
      setTimeout(() => {
        setDisplay('none');
      }, 300);
    }
  }, [active]);

  useEffect(() => {
    if (app?.deviceSize !== 'md' && lastRef.current) lastRef.current.focus();
  }, []);

  const handleInputBlur = event => {
    if (app?.deviceSize !== 'md' && lastRef.current) lastRef.current.focus();
  };

  const [terminal, setTerminal, terminalRef] = useState([
    <p>init exo:navigator</p>,
    <h1 className="primary-color">
      <span className="black">usr</span>&nbsp;daniel.aagentah
    </h1>,
    <p>TERMINAL IN PROG_</p>
    // <p>
    //   {app?.deviceSize === 'md' ? 'select' : 'type'} "
    //   <span
    //     className="underline  cp"
    //     onClick={() => handleSubmit(null, 'prompts')}
    //   >
    //     prompts
    //   </span>
    //   "
    // </p>
  ]);

  const commandClass = classNames({
    email: emailInputActive
  });

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInputChange = event => {
    let value = event.target.value;

    setInputValue(value);
  };

  const handleSubmit = (e, prompt) => {
    if (e) {
      e.preventDefault();
    }

    let val = prompt || inputValue;
    val = val.toLowerCase();

    const firstLines = [];
    const nextLines = [];
    let filterTerminal = terminalRef.current;

    if (val) {
      firstLines.push(val);

      for (let i = 0; i < terminalRef.current.length; i++) {
        if (filterTerminal.length > 7) {
          filterTerminal = filterTerminal.filter((item, i) => i !== 0);
        } else {
          break;
        }
      }

      setTerminal([...filterTerminal, ...firstLines]);
      setInputValue('');
      setEnteredValue(val);
    }

    setTimeout(() => {
      filterTerminal = terminalRef.current;

      if (emailInputActive && validateEmail(val)) {
        setEmailInputActive(false);
        nextLines.push('subscribe succesful');
      } else {
        switch (val) {
          case 'prompts':
            nextLines.push(
              <p>
                available prompts:
                <span className="db">
                  &nbsp; "
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'planet.midi')}
                  >
                    planet.midi
                  </span>
                  "
                  <br />
                  &nbsp; "
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'planet.switch')}
                  >
                    planet.switch
                  </span>
                  "
                  <br />
                  &nbsp; "
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'planet.data')}
                  >
                    planet.data
                  </span>
                  "
                </span>
              </p>
            );
            break;
          case 'planet.midi':
            setPromptActive(false);

            setTimeout(() => {
              setMidiActive(true);
            }, 300);
            nextLines.push('showPrompts');
            break;
          // case 'projects':
          //   nextLines.push('exec projects.render();');
          //   break;
          // case 'subscribe':
          //   setEmailInputActive(true);
          //   nextLines.push(
          //     <p>
          //       please enter email or{' '}
          //       <span
          //         className="underline  cp"
          //         onClick={() => handleSubmit(null, 'cancel')}
          //       >
          //         "cancel"
          //       </span>
          //     </p>
          //   );
          //   break;
          // case 'cancel':
          //   setEmailInputActive(false);
          //   nextLines.push('subscribe cancelled');
          //   break;
          // case 'escape':
          //   nextLines.push('there is no escape...');
          //   break;
          default:
            if (val) {
              nextLines.push(`unknown: "${val}"`);
            } else {
              nextLines.push('');
            }
        }
      }

      for (let i = 0; i < terminalRef.current.length; i++) {
        if (filterTerminal.length > 7) {
          filterTerminal = filterTerminal.filter((item, i) => i !== 0);
        } else {
          break;
        }
      }

      setTerminal([...filterTerminal, ...nextLines]);
      setInputValue('');
      setEnteredValue(val);
    }, 300);
  };

  return (
    <>
      <div
        className="intro__prompt__wrapper  db  t-primary"
        style={{
          transition: 'opacity 0.3s ease-in-out',
          opacity,
          display
        }}
      >
        {terminal.map((string, i) => (
          <p className={`intro__prompt  intro__prompt--${i + 1}  tal`}>
            <span className="intro__prompt__content" />
            <p className="f5  f4-md  db  pb2  t-primary">$ {string}</p>
          </p>
        ))}

        {
          // <p
          //   className={`intro__prompt  intro__prompt--command  ${commandClass}  tal`}
          // >
          //   <p className="f5  f3-md  db  t-primary">
          //     ${' '}
          //     {
          //       // <span className="intro__prompt__value">{inputValue}</span>
          //     }
          //     {!inputValue && <span className="dib  blink">_</span>}
          //   </p>
          //
          //   <form onSubmit={handleSubmit}>
          //     <input
          //       ref={lastRef}
          //       onBlur={handleInputBlur}
          //       maxLength={25}
          //       name="terminal"
          //       autoFocus
          //       className="intro__input"
          //       type="text"
          //       name="name"
          //       onChange={handleInputChange}
          //       value={inputValue}
          //       placeholder=""
          //     />
          //   </form>
          // </p>
        }
      </div>
    </>
  );
}
