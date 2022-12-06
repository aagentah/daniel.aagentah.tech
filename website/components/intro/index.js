import useState from 'react-usestateref';
import classNames from 'classnames';

import { useRef, useEffect } from 'react';

import Image from '~/components/elements/image';

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
  //
  modifier,
  marginTop,
  marginBottom,
  styles,
  skeleton
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 420 : 420;
  const imageHeight = app?.deviceSize === 'md' ? null : 400;
  const [inputValue, setInputValue] = useState('');
  const [enteredValue, setEnteredValue] = useState('');
  const [responseValue, setResponseValue] = useState('');
  const [emailInputActive, setEmailInputActive] = useState(false);
  const lastRef = useRef(null);

  useEffect(() => {
    if (app?.deviceSize !== 'md' && lastRef.current) lastRef.current.focus();
  }, []);

  const handleInputBlur = event => {
    if (app?.deviceSize !== 'md' && lastRef.current) lastRef.current.focus();
  };

  const [terminal, setTerminal, terminalRef] = useState([
    <p>init usr login</p>,
    <h1 className="primary-color">daniel.sentien</h1>,
    <p>
      {app?.deviceSize === 'md' ? 'select' : 'type'} "
      <span
        className="underline  cp"
        onClick={() => handleSubmit(null, 'prompts')}
      >
        prompts
      </span>
      "
    </p>
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
                  &nbsp; [
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'projects')}
                  >
                    projects
                  </span>{' '}
                  |{' '}
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'music')}
                  >
                    music
                  </span>{' '}
                  |{' '}
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'posts')}
                  >
                    posts
                  </span>
                  ]
                </span>
                <span className="db">
                  &nbsp; [
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'bio')}
                  >
                    bio
                  </span>{' '}
                  |{' '}
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'links')}
                  >
                    links
                  </span>{' '}
                  |{' '}
                  <span
                    className="underline  cp"
                    onClick={() => handleSubmit(null, 'subscribe')}
                  >
                    subscribe
                  </span>
                  ]
                </span>
              </p>
            );
            break;
          case 'showPrompts':
            nextLines.push('showPrompts');
            break;
          case 'projects':
            nextLines.push('exec projects.render();');
            break;
          case 'subscribe':
            setEmailInputActive(true);
            nextLines.push(
              <p>
                please enter email or{' '}
                <span
                  className="underline  cp"
                  onClick={() => handleSubmit(null, 'cancel')}
                >
                  cancel
                </span>
              </p>
            );
            break;
          case 'cancel':
            setEmailInputActive(false);
            nextLines.push('subscribe cancelled');
            break;
          case 'escape':
            nextLines.push('there is no escape...');
            break;
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
      <article
        className={`
        intro
        ${modifier && `intro--${modifier}`}
        mt${marginTop}
        mb${marginBottom}
      `}
        style={styles}
      >
        <img
          className="intro__image--mobile  db  dn-md"
          src="/images/logo-black.png"
        />

        <div className="intro__barcode  absolute  top  left  ml3">
          <Image
            /* Options */
            src="/images/barcode-black.png"
            placeholder={null}
            alt={null}
            figcaption={null}
            height={75}
            width={null}
            customClass={null}
            skeleton={skeleton}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="intro__terminal  flex  flex-wrap  justify-center  col-24  ph4">
          <div className="intro__image  col-24  col-12-md  justify-center  justify-end-md  ph3  mb3  mb0-md  dn  df-md">
            <Image
              /* Options */
              src="/images/logo-black.png"
              placeholder={null}
              alt={null}
              figcaption={null}
              height={imageHeight}
              width={null}
              customClass={null}
              skeleton={skeleton}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="col-24  col-12-md  flex  align-center  justify-start  justify-start-md  ph0  ph4-md">
            <div className="terminal__prompt__wrapper  db  t-primary">
              {terminal.map((string, i) => (
                <p
                  className={`terminal__prompt  terminal__prompt--${i +
                    1}  tal`}
                >
                  <span className="terminal__prompt__content" />
                  <p className="f5  f4-md  db  pb2  t-primary">$ {string}</p>
                </p>
              ))}

              <p
                className={`terminal__prompt  terminal__prompt--command  ${commandClass}  tal`}
              >
                <p className="f5  f3-md  db  t-primary">
                  ${' '}
                  {
                    // <span className="terminal__prompt__value">{inputValue}</span>
                  }
                  {!inputValue && <span className="dib  blink">_</span>}
                </p>

                <form onSubmit={handleSubmit}>
                  <input
                    ref={lastRef}
                    onBlur={handleInputBlur}
                    maxLength={25}
                    name="terminal"
                    autoFocus
                    className="terminal__input"
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    value={inputValue}
                    placeholder=""
                  />
                </form>
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
