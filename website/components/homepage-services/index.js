import { useState } from 'react';
import { Heading, Copy } from 'next-pattern-library';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';

import Container from '../layout/container';

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

export default function Intro({ ref }) {
  const app = useApp();
  // const [inView, setInView] = useState(false);
  const [inView, setInView] = useState(false);

  const handleIntersect = event => setInView(event.isIntersecting);
  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  // useEffect(() => {
  //   setTimeout(() => {
  //     set
  //   }, 1000)
  // }, []);

  return (
    <div className="services">
      <div className="pt6  pb5  tac  white">
        <Container>
          <div className="pb4">
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Services"
              color="black"
              size="large"
              truncate={null}
              skeleton={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="measure-wide  mla  mra  pb5">
            <Copy
              /* Options */
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.."
              color="black"
              size="medium"
              truncate={null}
              skeleton={null}
            />
          </div>
        </Container>

        <Observer {...observer}>
          <Container>
            <div className={`flex  services__cards  ${inView && 'active'}`}>
              <div className="services__card  col-8  flex  flex-wrap  justify-center  align-center">
                <div className="ph4">
                  <img
                    className="br-100  mb3  shadow2"
                    src="https://dummyimage.com/500x500"
                  />

                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text="Lorem"
                    color="black"
                    size="small"
                    truncate={null}
                    skeleton={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>

              <div className="services__card  col-8  flex  flex-wrap  justify-center  align-center">
                <div className="ph4">
                  <img
                    className="br-100  mb3  shadow2"
                    src="https://dummyimage.com/500x500"
                  />

                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text="Ipsum"
                    color="black"
                    size="small"
                    truncate={null}
                    skeleton={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>

              <div className="services__card  col-8  flex  flex-wrap  justify-center  align-center">
                <div className="ph4">
                  <img
                    className="br-100  mb3  shadow2"
                    src="https://dummyimage.com/500x500"
                  />

                  <Heading
                    /* Options */
                    htmlEntity="h2"
                    text="Dolor"
                    color="black"
                    size="small"
                    truncate={null}
                    skeleton={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>
            </div>
          </Container>
        </Observer>
      </div>
    </div>
  );
}
