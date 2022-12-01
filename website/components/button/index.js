import { Button } from 'next-pattern-library';
import LazyLoad from 'react-lazyload';

import Container from '../layout/container';

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

export default function ButtonBlock({
  text,
  href,
  padding,
  marginTop,
  marginBottom,
  modifier
}) {
  return (
    <LazyLoad once offset={150} height="200">
      <div
        className={`
          button-block
          ${modifier && `text-block--${modifier}`}
          pv${padding}
          mt${marginTop}
          mb${marginBottom}
        `}
      >
        <Container>
          <div className="flex  justify-center">
            <Button
              /* Options */
              type="primary"
              size="medium"
              text={text}
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              skeleton={false}
              onClick={null}
              /* Children */
              withLinkProps={{
                type: 'external',
                href,
                target: null,
                routerLink: null,
                routerLinkProps: null
              }}
            />
          </div>
        </Container>
      </div>
    </LazyLoad>
  );
}
