import { useState } from 'react';
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
  const imageHeight = app?.deviceSize === 'md' ? 420 : 420;
  const [inputValue, setInputValue] = useState('');
  const [enteredValue, setEnteredValue] = useState('');
  const [responseValue, setResponseValue] = useState('');

  const [terminal, setTerminal] = useState([
    <p>init usr login</p>,
    <h1>daniel.sentien</h1>,
    'get prompts'
  ]);

  const terminalClass = classNames({
    hide: enteredValue === 'projects'
  });

  const gridPostsClass = classNames({
    show: enteredValue === 'projects'
  });

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

    if (!val) {
      nextLines.push('');
    } else {
      switch (val) {
        case 'prompts':
          nextLines.push('available prompts');
          break;
        case 'projects':
          nextLines.push('exec projects.render();');
          break;
        case 'escape':
          nextLines.push('there is no escape.');
          break;
        default:
          nextLines.push(`unknown: "${val}"`);
      }
    }

    const filterTerminal =
      terminal.length > 6 ? terminal.filter((item, i) => i !== 0) : terminal;

    setTerminal([...filterTerminal, ...nextLines]);
    setInputValue('');
    setEnteredValue(val);

    // if (inputValue === 'projects') {
    //   setResponseValue('return');
    //   Router.push('/projects');
    // }
  };

  const renderTerminalLine = v => {
    let el = null;

    switch (v) {
      case 'get prompts':
        el = (
          <p>
            type "
            <span
              className="underline"
              onClick={() => handleSubmit(null, 'prompts')}
            >
              prompts
            </span>
            "
          </p>
        );
        break;
      case 'available prompts':
        el = (
          <p>
            available prompts: [
            <span
              className="underline"
              onClick={() => handleSubmit(null, 'projects')}
            >
              projects
            </span>{' '}
            |{' '}
            <span
              className="underline"
              onClick={() => handleSubmit(null, 'escape')}
            >
              escape
            </span>
            ]
          </p>
        );
        break;
      default:
        el = v;
    }

    return el;
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
          <div className="intro__image  col-24  col-12-md  flex  justify-end">
            {heroImage}
          </div>

          <div className="col-24  col-12-md  flex  align-center  justify-start  tal  ph4">
            <div className="db  tac  t-primary">
              {terminal.map((string, i) => (
                <p
                  className={`terminal__prompt  terminal__prompt--${i +
                    1}  tal  pb2`}
                >
                  <span className="terminal__prompt__content" />
                  <p className="f3  db  t-primary">
                    $ {renderTerminalLine(string)}
                  </p>
                </p>
              ))}

              <p className="terminal__prompt  terminal__prompt--command  tal">
                <span className="terminal__prompt__content" />

                <p className="f3  db  t-primary">
                  $ {inputValue}
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
