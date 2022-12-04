import { useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import LazyLoad from 'react-lazyload';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import Image from '~/components/elements/image';

import { imageBuilder } from '~/lib/sanity/requests';
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

export default function Carousel({
  items,
  padding,
  marginTop,
  marginBottom,
  modifier
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;

  if (!app?.deviceSize) {
    return;
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: app?.deviceSize === 'md' ? 1 : items.length,
      spacing: 15
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  const Arrow = props => {
    const disabeld = props.disabled ? ' carousel__arrow--disabled' : '';
    return (
      <svg
        onClick={props.onClick}
        className={`carousel__arrow ${
          props.left ? 'carousel__arrow--left' : 'carousel__arrow--right'
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
  };

  return (
    <LazyLoad once offset={150} height="200">
      <div
        className={`
          carousel
          ${modifier && `carousel--${modifier}`}
          pv${padding}
          mt${marginTop}
          mb${marginBottom}
        `}
      >
        <div ref={sliderRef} className="keen-slider">
          {items.map(i => (
            <div className="keen-slider__slide  flex  flex-wrap  justify-center">
              {i?.image && (
                <Image
                  /* Options */
                  src={imageBuilder
                    .image(i.image)
                    .width(125)
                    .height(125)
                    .fit('crop')
                    .crop('top')
                    .auto('format')
                    .url()}
                  placeholder={null}
                  alt={null}
                  figcaption={null}
                  height={125}
                  width={125}
                  customClass="carousel__image"
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              )}

              {i?.description && (
                <div className="carousel__description">
                  <BlockContent blocks={i.description} />
                </div>
              )}
            </div>
          ))}
        </div>

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={e => e.stopPropagation() || instanceRef.current?.next()}
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </LazyLoad>
  );
}
