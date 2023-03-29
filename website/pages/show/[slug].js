import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import Iframe from 'react-iframe';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';
import Button from '~/components/elements/button';

import SubscribeBanner from '~/components/subscribe-banner';
import Container from '~/components/layout/container';

import Date from '~/components/date';
import { useApp } from '~/context-provider/app';

import {
  imageBuilder,
  getSiteConfig,
  getShowAndMore,
  getAllShowsTotal,
} from '~/lib/sanity/requests';

export default function Show({ siteConfig, show, moreShows, preview }) {
  const router = useRouter();
  const app = useApp();

  useEffect(() => {
    if (!router?.isFallback && !show?.slug) Router.push('/404');
  }, [router?.isFallback, show?.slug]);

  const serializers = {
    types: {
      codeBlock: ({ node }) => {
        const { language, code } = node;

        return (
          <div className="code-block">
            <span className="code-block__language">{language}</span>
            <SyntaxHighlighter language={language || 'text'} style={atomDark}>
              {code}
            </SyntaxHighlighter>
          </div>
        );
      },
      iframeEmbedBlock: ({ node }) => {
        const { iframeUrl, iframeHeightMobile, iframeHeightDesktop } = node;

        return (
          <div className="w-100  db  mla  mra  mb4  ph3">
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

  if (!router?.isFallback && show?.slug) {
    return (
      <>
        <Container>
          {show.coverImage && (
            <div className="measure-wide  mla  mra">
              <Image
                /* Options */
                src={imageBuilder.image(show.coverImage).width(1960).url()}
                placeholder={imageBuilder
                  .image(show.coverImage)
                  .width(108)
                  .url()}
                alt={show.title}
                figcaption={null}
                height={null}
                width={null}
                customClass={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>
          )}

          <article className="">
            <section className="measure-wide  mla  mra">
              <div className="pb2  pt4">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text={show.title}
                  color="black"
                  size="large"
                  truncate={null}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <p className="t-secondary  f7  almost-black  lh-copy  pb4">
                <Date dateString={show.date} />
              </p>

              {show.content && show.content.length > 0 && (
                <div className="richtext  show__body  pb3">
                  <BlockContent
                    blocks={show.content}
                    serializers={serializers}
                  />
                </div>
              )}

              {show?.url && (
                <div className="pb4">
                  <Button
                    /* Options */
                    type="primary"
                    size="medium"
                    text="Event"
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
                      href: show?.url,
                      target: '_blank',
                    }}
                  />
                </div>
              )}
            </section>
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
  const data = await getShowAndMore(params.slug, preview);
  console.log('data', data);

  return {
    props: {
      siteConfig,
      preview,
      show: data.show || null,
      moreShows: data.moreShows || null,
      morePosts: data.morePosts || null,
      layout: {
        preview,
        meta: {
          title: data.show?.title || null,
          description: data.show?.excerpt || null,
          image: data.show?.coverImage || null,
          pageClass: 'show',
        },
      },
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const data = await getAllShowsTotal();

  return {
    paths:
      data
        .filter((show) => show?.slug)
        .map((show) => {
          return {
            params: {
              slug: show.slug,
            },
          };
        }) || [],
    fallback: true,
  };
}
