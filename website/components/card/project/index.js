import Link from 'next/link';
// import LazyLoad from 'react-lazyload';

import { Icon } from 'next-pattern-library';
import Copy from '~/components/elements/copy';
import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';
import Label from '~/components/elements/label';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function CardPost({ item, placeholder }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 1080 : 1080;
  const imageHeight = app?.deviceSize === 'md' ? 140 : 100;
  const buttonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;

  const image = (
    <Image
      /* Options */
      src={
        item &&
        imageBuilder
          .image(item?.coverImage)
          .width(imageUrlWidth * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={placeholder}
      alt={item?.title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={!item}
      onClick={null}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/project/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/project/${item?.slug}`,
          scroll: false,
        },
      }}
    />
  );

  const labels = (
    <Label
      /* Options */
      customClass=""
      text="Blog"
      color="black"
      backgroundColor="white"
      skeleton={!item}
      onClick={null}
      /* Children */
      withLinkProps={null}
    />
  );

  const heading = (
    <Heading
      /* Options */
      htmlEntity="h2"
      text={item?.title}
      color="white"
      size="small"
      truncate={null}
      skeleton={!item}
      /* Children */
      withLinkProps={{
        type: 'next',
        href: '/project/[slug]',
        target: null,
        routerLink: Link,
        routerLinkProps: {
          as: `/project/${item?.slug}`,
          scroll: false,
        },
      }}
    />
  );

  const copy = (
    <Copy
      /* Options */
      text={item?.excerpt}
      color="white"
      size="medium"
      truncate={null}
      skeleton={!item}
    />
  );

  // const button = (
  //   <Button
  //     /* Options */
  //     type="secondary"
  //     size="small"
  //     text="View"
  //     color="white"
  //     fluid={false}
  //     icon={buttonIcon}
  //     iconFloat={null}
  //     inverted={false}
  //     loading={false}
  //     disabled={false}
  //     skeleton={false}
  //     onClick={null}
  //     /* Children */
  //     withLinkProps={{
  //       type: 'next',
  //       href: '/project/[slug]',
  //       target: null,
  //       routerLink: Link,
  //       routerLinkProps: {
  //         as: `/project/${item?.slug}`,
  //         scroll: false
  //       }
  //     }}
  //   />
  // );

  // <LazyLoad once offset={150} height={imageHeight}>
  //   </LazyLoad>

  return (
    <article className="card  card--project  flex  flex-wrap">
      {image && <div className="col-24  col-4-md  card__image">{image}</div>}

      <div className="col-24  col-20-md  ph3  card__dialog">
        {labels?.length && <div className="card__labels">{[...labels]}</div>}
        {heading && <div className="card__title">{heading}</div>}
        {copy && <div className="card__description">{copy}</div>}
        {
          // button && <div className="card__button">{button}</div>
        }
      </div>
    </article>
  );
}
