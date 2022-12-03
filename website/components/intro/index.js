import { Heading } from 'next-pattern-library';
import { Parallax } from 'react-scroll-parallax';
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
  const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;

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

        <ParallaxDiv speed={-10}>
          <div className="flex  flex-wrap  col-24">
            {heroImage && (
              <div className="intro__image  col-24">{heroImage}</div>
            )}

            <div className="col-24  flex  justify-center">
              <div className="db  white  tac  t-primary">
                <span className="f3  dib  pr3">$</span>
                <span className="terminal__prompt--typing">
                  <span className="cover cover--gimme-dev" />
                  <h1 className="f3  dib">daniel.sentien</h1>
                  <span className="f3  dib  blink">_</span>
                </span>
              </div>
            </div>
          </div>
        </ParallaxDiv>
      </article>
    </>
  );
}
