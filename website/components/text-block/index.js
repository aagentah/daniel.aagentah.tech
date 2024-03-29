import BlockContent from '@sanity/block-content-to-react';
import isObject from 'lodash/isObject';
import LazyLoad from 'react-lazyload';

import Copy from '~/components/elements/copy';
import Heading from '~/components/elements/heading';

import Container from '../layout/container';
import componentTextAlign from '~/functions/componentTextAlign';

import { useApp } from '~/context-provider/app';

/**
 * @param {string} title [required]
 * @param {string} description
 * @param {string} textColour [required]
 * @param {string} backgroundColour [required]
 * @param {string} textAlign [required]
 * @param {string} padding [required]
 * @param {string} marginTop [required]
 * @param {string} marginBottom [required]
 * @param {string} modifier
 **/

export default function TextBlock({
  title,
  description,
  backgroundColour,
  textColour,
  textAlign,
  padding,
  marginTop,
  marginBottom,
  modifier,
}) {
  const app = useApp();

  const textAlignClass = componentTextAlign(textAlign);

  const blockTitle = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={title}
      color={textColour}
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
      color="white"
      size="medium"
      truncate={null}
      skeleton={null}
    />
  );

  return (
    <LazyLoad once offset={150} height="200">
      <div
        className={`
          text-block
          ${modifier && `text-block--${modifier}`}
          bg-${backgroundColour}
          ${textColour}
          ${textAlignClass}
          pv${padding}
          mt${marginTop}
          mb${marginBottom}
        `}
      >
        <Container>
          <div className="text-block__title">{blockTitle}</div>
          {description && (
            <div className="text-block__description">{blockCopy}</div>
          )}
        </Container>
      </div>
    </LazyLoad>
  );
}
