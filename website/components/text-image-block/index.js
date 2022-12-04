import BlockContent from '@sanity/block-content-to-react';
import isObject from 'lodash/isObject';
import LazyLoad from 'react-lazyload';

import Copy from '~/components/elements/copy';
import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';

import Container from '../layout/container';
import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

/**
 * @param {string} title [required]
 * @param {string} description
 * @param {string} image [required]
 * @param {string} align [required]
 * @param {string} padding [required]
 * @param {string} marginTop [required]
 * @param {string} marginBottom [required]
 * @param {string} modifier
 **/

export default function TextImageBlock({
  title,
  description,
  image,
  align,
  padding,
  marginTop,
  marginBottom,
  modifier
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 720 : 1080;
  const imageHeight = app?.deviceSize === 'md' ? 300 : 450;

  const blockTitle = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={title}
      color="black"
      size="large"
      truncate={null}
      skeleton={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const blockCopy = isObject(description) ? (
    <BlockContent blocks={description} />
  ) : (
    <Copy
      /* Options */
      text={description}
      color="black"
      size="medium"
      truncate={null}
      skeleton={null}
    />
  );

  const blockImage = (
    <Image
      /* Options */
      src={
        image &&
        imageBuilder
          .image(image)
          .width(imageUrlWidth * scale)
          .height(imageHeight * scale)
          .fit('crop')
          .crop('top')
          .auto('format')
          .url()
      }
      placeholder={null}
      alt={null}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={false}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const renderImage = () => {
    return (
      <div className="text-image-block__image  mb4  mb5-md  relative">
        {blockImage}
      </div>
    );
  };

  const renderDialog = () => {
    return (
      <>
        <div className="text-image-block__title">{blockTitle}</div>
        <div className="text-image-block__description">{blockCopy}</div>
      </>
    );
  };

  return (
    <LazyLoad once offset={150} height={imageHeight}>
      <div
        className={`
          text-image-block
          text-image-block--${align}
          ${modifier ? `text-image-block--${modifier}` : ''}
          pv${padding} mt${marginTop}
          mb${marginBottom}
        `}
      >
        <Container>
          <div
            className={`
              flex
              flex-wrap
              ${align === 'left' ? 'flex-row' : 'flex-row-reverse'}
            `}
          >
            <div className="col-24  col-12-md  flex  align-center  justify-center">
              {renderImage()}
            </div>
            <div className="text-image-block__dialog  col-24  col-12-md  flex  flex-column  align-center  justify-center">
              {renderDialog()}
            </div>
          </div>
        </Container>
      </div>
    </LazyLoad>
  );
}
