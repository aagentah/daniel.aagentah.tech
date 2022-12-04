import BlockContent from '@sanity/block-content-to-react';
import isObject from 'lodash/isObject';
import { useParallax } from 'react-scroll-parallax';

import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Heading from '~/components/elements/heading';
import { Icon } from 'next-pattern-library';
import Image from '~/components/elements/image';

import { imageBuilder } from '~/lib/sanity/requests';
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
  image,
  title,
  description,
  heroButtonText,
  link,
  marginTop,
  marginBottom,
  modifier,
  //
  skeleton
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 720 : 1080;
  const imageHeight = app?.deviceSize === 'md' ? 400 : 500;
  const heroButtonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;
  let heroCopy;
  let linkProps;
  let heroButton;
  let parallax;

  if (modifier === 'home') {
    parallax = useParallax({
      opacity: [1, 0],
      startScroll: 50,
      endScroll: 600
    });
  }

  const styles = {
    height: `${imageHeight}px`
  };

  if (link) {
    linkProps = {
      type: 'external',
      href: link
    };
  }

  const heroImage = (
    <Image
      /* Options */
      src={
        image &&
        imageBuilder
          .image(image)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={
        image &&
        imageBuilder
          .image(image)
          .height(imageHeight / 10)
          .width(imageUrlWidth / 10)
          .auto('format')
          .fit('clip')
          .blur('20')
          .url()
      }
      alt={title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={skeleton}
      onClick={null}
      /* Children */
      withLinkProps={linkProps}
    />
  );

  const heroTitle = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={title}
      color="black"
      size="large"
      truncate={null}
      skeleton={skeleton}
      /* Children */
      withLinkProps={linkProps}
    />
  );

  if (description) {
    heroCopy = isObject(description) ? (
      <BlockContent blocks={description} />
    ) : (
      <Copy
        /* Options */
        text={description || ''}
        color="black"
        size="medium"
        truncate={null}
        skeleton={skeleton}
      />
    );
  }

  if (heroButtonText && linkProps) {
    heroButton = (
      <Button
        /* Options */
        type="secondary"
        size="small"
        text={heroButtonText}
        color="black"
        fluid={false}
        icon={heroButtonIcon}
        iconFloat={null}
        inverted={false}
        loading={false}
        disabled={false}
        skeleton={skeleton}
        onClick={null}
        /* Children */
        withLinkProps={linkProps}
      />
    );
  }
  return (
    <>
      <article
        className={`
        hero
        ${modifier && `hero--${modifier}`}
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

        {heroImage && <div className="hero__image">{heroImage}</div>}
      </article>
    </>
  );
}
