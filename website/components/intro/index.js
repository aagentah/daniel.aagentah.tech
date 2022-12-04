import useState from 'react-usestateref';
import classNames from 'classnames';

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';

import GridProject from '~/components/grid/project';

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

  const [terminal, setTerminal, terminalRef] = useState([
    <p>init usr login</p>,
    <h1>daniel.sentien</h1>,
    <p>
      type "
      <span
        className="underline  cp"
        onClick={() => handleSubmit(null, 'prompts')}
      >
        prompts
      </span>
      "
    </p>
  ]);

  const terminalClass = classNames({
    hide: enteredValue === 'projects'
  });

  const gridPostsClass = classNames({
    show: enteredValue === 'projects'
  });

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

    const val = prompt || inputValue;
    const nextLines = [];
    let filterTerminal = terminalRef.current;

    if (!val) {
      nextLines.push('');
    } else if (emailInputActive && validateEmail(val)) {
      nextLines.push(val);

      setEmailInputActive(false);
      nextLines.push('subscribe succesful');
    } else {
      nextLines.push(val);

      switch (val) {
        case 'prompts':
          nextLines.push(
            <p>
              available prompts:{' '}
              <span className="db">
                [
                <span
                  className="underline  cp"
                  onClick={() => handleSubmit(null, 'projects')}
                >
                  projects
                </span>{' '}
                |{' '}
                <span
                  className="underline  cp"
                  onClick={() => handleSubmit(null, 'subscribe')}
                >
                  subscribe
                </span>{' '}
                |{' '}
                <span
                  className="underline  cp"
                  onClick={() => handleSubmit(null, 'escape')}
                >
                  escape
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
              please enter your email or{' '}
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
          nextLines.push('there is no escape.');
          break;
        default:
          nextLines.push(`unknown: "${val}"`);
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

    // if (inputValue === 'projects') {
    //   setResponseValue('return');
    //   Router.push('/projects');
    // }
  };

  const heroImage = (
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
  );

  const heroTitle = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={null}
      color="black"
      size="large"
      truncate={null}
      skeleton={skeleton}
      /* Children */
      withLinkProps={null}
    />
  );

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
        <div className="absolute  top  left  mt3  ml3">
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

        <div
          className={`intro__terminal  ${terminalClass}  flex  flex-wrap  justify-center  col-24  ph4`}
        >
          <div className="intro__image  col-24  col-12-md  flex  justify-center  justify-end-md  ph3  mb3  mb0-md">
            {heroImage}
          </div>

          <div className="col-24  col-12-md  flex  align-center  justify-start  justify-start-md  ph0  ph4-md">
            <div className="terminal__prompt__wrapper  db  t-primary">
              {terminal.map((string, i) => (
                <p
                  className={`terminal__prompt  terminal__prompt--${i +
                    1}  tal`}
                >
                  <span className="terminal__prompt__content" />
                  <p className="f5  f3-md  db  pb2  t-primary">
                    {
                      // $ {renderTerminalLine(string, i)}
                    }
                    $ {string}
                  </p>
                </p>
              ))}

              <p
                className={`terminal__prompt  terminal__prompt--command  ${commandClass}  tal`}
              >
                <p className="f5  f3-md  db  t-primary">
                  ${' '}
                  <span className="terminal__prompt__value">{inputValue}</span>
                  {!inputValue && <span className="dib  blink">_</span>}
                </p>

                <form onSubmit={handleSubmit}>
                  <input
                    maxLength={25}
                    name="terminal"
                    autoFocus
                    className="terminal__input"
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    value={inputValue}
                  />
                </form>
              </p>
            </div>
          </div>
        </div>

        <div className={`intro__grid-posts  ${gridPostsClass}  mt6  mb5`}>
          <GridProject />
        </div>
      </article>
    </>
  );
}
