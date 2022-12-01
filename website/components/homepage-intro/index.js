import zenscroll from 'zenscroll';
import { useState, useRef } from 'react';
import 'intersection-observer';
import { Parallax } from 'react-scroll-parallax';

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

export default function Intro({}) {
  const app = useApp();
  const [inView, setInView] = useState(false);
  const refAboutUs = useRef(null);
  const refServices = useRef(null);
  const refShop = useRef(null);

  const handleIntersect = event => setInView(event.isIntersecting);
  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  // useEffect(() => {
  //   setTimeout(() => {
  //     set
  //   }, 1000)
  // }, []);

  return (
    <div className="intro">
      <div className="intro__menu">
        <div className="reveal">
          <div
            className="reveal__content active  black  tar"
            onClick={() => zenscroll.to(refAboutUs.current)}
          >
            About us
          </div>
        </div>

        <div className="reveal">
          <div
            className="reveal__content active  black  tar"
            onClick={() => zenscroll.to(refServices.current)}
          >
            Services
          </div>
        </div>

        <div className="reveal">
          <div
            className="reveal__content active  black  tar"
            onClick={() => zenscroll.to(refShop.current)}
          >
            Shop
          </div>
        </div>
      </div>

      <div className="intro__logo">
        <Parallax speed={-10} disabled={app.deviceSize === 'md'}>
          <div className="reveal">
            <div className="reveal__content  active">
              <img className="" src="/images/logo.png" />
            </div>
          </div>
        </Parallax>
      </div>

      <div className="intro__tree__wrapper">
        <Parallax speed={10} disabled={app.deviceSize === 'md'}>
          <img className="intro__tree" src="/images/tree.png" />
        </Parallax>
      </div>

      <img className="intro__skyline" src="/images/skyline.jpg" />
    </div>
  );
}
