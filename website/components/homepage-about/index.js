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
    <div className="about-us">
      <div className="pt6  pb5  tac  white">
        <Container>
          <div className="pb4">
            <Heading
              /* Options */
              htmlEntity="h2"
              text="About us"
              color="white"
              size="large"
              truncate={null}
              skeleton={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="measure-wide  mla  mra  pb4">
            <Copy
              /* Options */
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.."
              color="white"
              size="medium"
              truncate={null}
              skeleton={null}
            />
          </div>
        </Container>
      </div>
      <Observer {...observer}>
        <Container>
          <div className="flex  flex-wrap">
            <div className="col-8  tac  pt6">
              <div className="reveal">
                <div className={`reveal__content ${inView && 'active'}  white`}>
                  Hand-sawn...
                </div>
              </div>
            </div>

            <div className="col-8">
              <div className={`stack ${inView && 'active'}`}>
                <div className="content card">
                  <img src="https://i.ibb.co/5W20jXT/New-Project.png" />
                </div>
                <div className="content card">
                  <img src="https://i.ibb.co/5W20jXT/New-Project.png" />
                </div>
                <div className="content card">
                  <img src="https://i.ibb.co/5W20jXT/New-Project.png" />
                </div>
                <div className="content card">
                  <img src="https://i.ibb.co/5W20jXT/New-Project.png" />
                </div>
                <div className="content card">
                  <img src="https://i.ibb.co/5W20jXT/New-Project.png" />
                </div>
              </div>
            </div>

            <div className="col-8  tac  pt6">
              <div className="reveal">
                <div className={`reveal__content ${inView && 'active'}  white`}>
                  ...Bespoke-cuts
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Observer>
    </div>
  );
}
