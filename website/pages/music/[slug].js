import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import Iframe from 'react-iframe';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/a11y-light.css';

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';

import SubscribeBanner from '~/components/subscribe-banner';
import Container from '~/components/layout/container';

import Date from '~/components/date';
import { useApp } from '~/context-provider/app';

import {
  imageBuilder,
  getSiteConfig,
  getMusicAndMore,
  getAllMusicsTotal,
} from '~/lib/sanity/requests';

hljs.registerLanguage('javascript', javascript);

const prism = require('prismjs');
require('prismjs/components/prism-javascript');

const IconFacebook = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconFacebook)
);

const IconInstagram = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconInstagram)
);

const IconYoutube = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconYoutube)
);

const IconSoundcloud = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconSoundcloud)
);

const IconWebLink = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconWebLink)
);

const IconHeart = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconHeart)
);

const IconSpotify = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconSpotify)
);

export default function Post({ siteConfig, post, morePosts, preview }) {
  const router = useRouter();
  const app = useApp();

  console.log('post', post);

  useEffect(() => {
    if (!router?.isFallback && !post?.slug) Router.push('/404');
  }, [router?.isFallback, post?.slug]);

  const renderItemType = (item) => {
    let service;
    let icon;
    let url = item.url;
    let target = '_blank';

    if (item?.documentInternal) {
      const doc = item.documentInternal.document;
      target = '_self';

      switch (doc._type) {
        case 'post':
          url = `/article/${doc.slug.current}`;
          break;
        default:
          url = null;
      }
    }

    switch (item.type) {
      case 'facebook':
        service = 'Facebook';
        icon = <IconFacebook color="white" size={16} />;
        break;
      case 'instagram':
        service = 'Instagram';
        icon = <IconInstagram color="white" size={16} />;
        break;
      case 'youtube':
        service = 'YouTube';
        icon = <IconYoutube color="white" size={16} />;
        break;
      case 'spotify':
        service = 'Spotify';
        icon = <IconSpotify color="white" size={16} />;
        break;
      case 'soundcloud':
        service = 'SoundCloud';
        icon = <IconSoundcloud color="white" size={16} />;
        break;
      case 'bandcamp':
        service = 'Bandcamp';
        icon = <IconWebLink color="white" size={16} />;
        break;
      case 'apple-music':
        service = 'Apple Music';
        icon = <IconWebLink color="white" size={16} />;
        break;
      case 'web':
        service = 'View Web Link';
        icon = <IconWebLink color="white" size={16} />;
        break;
      default:
        break;
    }

    return (
      <div className="flex  flex-wrap  mb3  cp">
        <a
          href={url}
          rel="noopener noreferrer"
          target={target}
          className="w-100  mla  mra  flex  justify-center  align-center  ph3  pv3  br3  bg-black  shadow2  link  ba  bc-white  white"
        >
          <div className="pr3">{icon}</div>
          <p className="t-secondary  f4">{service}</p>
        </a>
      </div>
    );
  };

  const serializers = {
    types: {
      codeBlock: ({ node }) => {
        const { language, code } = node;
        const myHtml = hljs.highlight(code, { language }).value;

        return (
          <pre className="">
            <code dangerouslySetInnerHTML={{ __html: myHtml }} />
          </pre>
        );
      },
      iframeEmbedBlock: ({ node }) => {
        const { iframeUrl, iframeHeightMobile, iframeHeightDesktop } = node;

        return (
          <div className="w-100  db  mla  mra  mb4  mt3">
            <Iframe
              url={iframeUrl}
              width="100%"
              height={
                app?.deviceSize === 'md'
                  ? iframeHeightMobile
                  : iframeHeightDesktop
              }
              display="initial"
              position="relative"
            />
          </div>
        );
      },
    },
  };
  if (!router?.isFallback && post?.slug) {
    return (
      <>
        <Container>
          <article>
            <div className="flex  flex-wrap  pb5  pt3  pt0-md">
              <div className="col-24  col-12-md  ph4  ph3-md  pb3  pb0-md">
                <div className="project__header">
                  <Image
                    /* Options */
                    src={imageBuilder.image(post.coverImage).width(1080).url()}
                    placeholder={imageBuilder
                      .image(post.coverImage)
                      .width(108)
                      .url()}
                    alt={post.title}
                    figcaption={null}
                    height={400}
                    width={null}
                    customClass={null}
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
              </div>

              <div className="col-24  col-12-md  ph0  ph3-md">
                <section className="measure-wide  mla  mra  tac  tal-md">
                  <div className="pb2">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text={post.title}
                      color="white"
                      size="large"
                      truncate={0}
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <p className="t-secondary  f7  almost-white  lh-copy  pb3  tac  tal-md">
                    <Date dateString={post.date} />
                  </p>

                  {post?.smartLink.items?.length &&
                    post.smartLink.items.map((item, i) => (
                      <div key={i._key} className="col-24">
                        {renderItemType(item)}
                      </div>
                    ))}
                </section>
              </div>
            </div>
          </article>
        </Container>

        <SubscribeBanner />
      </>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const data = await getMusicAndMore(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      post: data.item || null,
      morePosts: data.moreItems || null,
      layout: {
        preview,
        meta: {
          title: data.item?.title,
          description: data.item?.excerpt,
          image: data.item?.coverImage,
        },
      },
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const data = await getAllMusicsTotal();

  return {
    paths:
      data
        .filter((post) => post?.slug)
        .map((post) => {
          return {
            params: {
              slug: post.slug,
            },
          };
        }) || [],
    fallback: true,
  };
}
