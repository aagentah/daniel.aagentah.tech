import { useParallax } from 'react-scroll-parallax';
import { useState } from 'react';

import Heading from '~/components/elements/heading';
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
  const imageHeight = app?.deviceSize === 'md' ? 420 : 420;
  // const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;
  const [terminal, setTerminal] = useState([
    'init usr login',
    'daniel.sentien',
    'type "prompts"'
  ]);
  const [inputValue, setInputValue] = useState('');
  const [responseValue, setResponseValue] = useState('');

  const onChangeHandler = event => {
    let value = event.target.value;

    setInputValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const nextLines = [];

    switch (inputValue) {
      case 'prompts':
        nextLines.push('available prompts: [projects | escape]');
        break;
      default:
        nextLines.push(inputValue);
    }

    const filterTerminal =
      terminal.length > 5 ? terminal.filter((item, i) => i !== 0) : terminal;

    setTerminal([...filterTerminal, ...nextLines]);
    setInputValue('');

    // if (inputValue === 'projects') {
    //   setResponseValue('return');
    //   Router.push('/projects');
    // }
  };

  const l = useParallax({
    translateX: [0, -20],
    opacity: [1, 0],
    startScroll: 0,
    endScroll: 200
  });

  const r = useParallax({
    translateX: [0, 20],
    opacity: [1, 0],
    startScroll: 0,
    endScroll: 200
  });

  const heroImage = (
    <Image
      /* Options */
      src="/images/logo-white.png"
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
        {
          // <div className="hero__dialog">
          //   {heroTitle && <div className="hero__title">{heroTitle}</div>}
          //   {heroCopy && <p className="hero__description">{heroCopy}</p>}
          //   {heroButton && <div className="hero__heroButton">{heroButton}</div>}
          // </div>
        }

        <div className="absolute  top  left  mt3  ml3">
          <Image
            /* Options */
            src="/images/barcode.png"
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

        <div className="flex  flex-wrap  justify-center  col-24  ph4">
          <div className="intro__image  col-24  col-12-md  flex  justify-end">
            <div ref={l.ref}>{heroImage}</div>
          </div>

          <div className="col-24  col-12-md  flex  align-center  justify-start  tal  ph4">
            <div ref={r.ref}>
              <div className="db  white  tac  t-primary">
                {terminal.map((string, i) => (
                  <p
                    className={`terminal__prompt  terminal__prompt--${i +
                      1}  tal  pb2`}
                  >
                    <span className="terminal__prompt__content" />
                    <p className="f3  db  t-primary">$ {string}</p>
                  </p>
                ))}

                <p className="terminal__prompt  terminal__prompt--command  tal">
                  <span className="terminal__prompt__content" />

                  <p className="f3  db  t-primary">
                    $ {inputValue}
                    {!inputValue && <span className="f3  dib  blink">_</span>}
                  </p>

                  <form onSubmit={handleSubmit}>
                    <input
                      maxLength={25}
                      name="terminal"
                      autoFocus
                      className="terminal__input"
                      type="text"
                      name="name"
                      onChange={onChangeHandler}
                      value={inputValue}
                    />
                  </form>
                </p>

                {
                  // {responseValue && (
                  //   <p className="terminal__prompt  terminal__prompt--1  tal">
                  //     <span className="terminal__prompt__content" />
                  //     <h1 className="f3  db  t-primary">
                  //       $ exec {inputValue}.redir();
                  //     </h1>
                  //   </p>
                  // )}
                }
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
