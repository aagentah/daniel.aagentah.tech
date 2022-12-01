import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import { Heading, Copy } from 'next-pattern-library';
import 'intersection-observer';

import Container from '../layout/container';

export default function Shop({}) {
  const [render, setRender] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'free-snap',
    slides: {
      origin: 'center',
      perView: 4,
      spacing: 15
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 500);
  }, []);

  function Arrow(props) {
    const disabeld = props.disabled ? ' arrow--disabled' : '';
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? 'arrow--left' : 'arrow--right'
        } ${disabeld}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  if (render) {
    return (
      <div className="shop">
        <div className="pt6  pb5  tac  white">
          <Container>
            <div className="pb4">
              <Heading
                /* Options */
                htmlEntity="h2"
                text="Shop"
                color="black"
                size="large"
                truncate={null}
                skeleton={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <div className="measure-wide  mla  mra  pb3">
              <Copy
                /* Options */
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                color="black"
                size="medium"
                truncate={null}
                skeleton={null}
              />
            </div>
          </Container>
        </div>

        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1">
            <div className="pb3">
              <img className="shadow2" src="https://dummyimage.com/500x500" />
            </div>

            <Heading
              /* Options */
              htmlEntity="h2"
              text="Buy"
              color="black"
              size="small"
              truncate={null}
              skeleton={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="keen-slider__slide number-slide2">
            <div className="pb3">
              <img className="shadow2" src="https://dummyimage.com/500x500" />
            </div>
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Buy"
              color="black"
              size="small"
              truncate={null}
              skeleton={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="keen-slider__slide number-slide3">
            <div className="pb3">
              <img className="shadow2" src="https://dummyimage.com/500x500" />
            </div>
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Buy"
              color="black"
              size="small"
              truncate={null}
              skeleton={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="keen-slider__slide number-slide4">
            <div className="pb3">
              <img className="shadow2" src="https://dummyimage.com/500x500" />
            </div>
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Buy"
              color="black"
              size="small"
              truncate={null}
              skeleton={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="keen-slider__slide number-slide5">
            <div className="pb3">
              <img className="shadow2" src="https://dummyimage.com/500x500" />
            </div>
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Buy"
              color="black"
              size="small"
              truncate={null}
              skeleton={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="keen-slider__slide number-slide6">
            <div className="pb3">
              <img className="shadow2" src="https://dummyimage.com/500x500" />
            </div>
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Buy"
              color="black"
              size="small"
              truncate={null}
              skeleton={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={e =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={e =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>

        {loaded && instanceRef.current && (
          <div className="dots  mt3">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys()
            ].map(idx => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={`dot${currentSlide === idx ? ' active' : ''}`}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
