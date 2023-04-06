import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import Iframe from 'react-iframe';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';
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
  getPostAndMore,
  getAllPostsTotal,
} from '~/lib/sanity/requests';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('markdown', markdown);

const prism = require('prismjs');
require('prismjs/components/prism-javascript');

export default function Post({ siteConfig, post, morePosts, preview }) {
  const router = useRouter();
  const app = useApp();

  useEffect(() => {
    if (!router?.isFallback && !post?.slug) Router.push('/404');
  }, [router?.isFallback, post?.slug]);

  const serializers = {
    types: {
      codeBlock: ({ node }) => {
        const { language, code } = node;
        const myHtml = hljs.highlight(code, { language }).value;

        return (
          <div className="code-block">
            <span className="code-block__language">{language}</span>
            <pre>
              <code dangerouslySetInnerHTML={{ __html: myHtml }} />
            </pre>
          </div>
        );
      },
      iframeEmbedBlock: ({ node }) => {
        const { iframeUrl, iframeHeightMobile, iframeHeightDesktop } = node;

        return (
          <div className="w-100  db  mla  mra  mb4  mt3  ph3">
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
        <div className="container  mla  mra  pt3  pt0-md">
          <div className="post__header">
            <Image
              /* Options */
              src={imageBuilder.image(post.coverImage).width(1960).url()}
              placeholder={imageBuilder.image(post.coverImage).width(108).url()}
              alt={post.title}
              figcaption={null}
              height={app?.deviceSize === 'md' ? 250 : 500}
              width={null}
              customClass={null}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </div>

        <Container>
          <article className="">
            <section className="measure-wide  mla  mra">
              <div className="pb2  pt4">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text={post.title}
                  color="white"
                  size="large"
                  truncate={null}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <p className="t-secondary  f7  almost-white  lh-copy  pb4">
                <Date dateString={post.date} />
              </p>

              <div className="richtext  post__body  pb4">
                <BlockContent blocks={post.content} serializers={serializers} />
              </div>
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
  const data = await getPostAndMore(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      post: data.post || null,
      morePosts: data.morePosts || null,
      layout: {
        preview,
        meta: {
          title: data.post?.title,
          description: data.post?.excerpt,
          image: data.post?.coverImage,
        },
      },
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const data = await getAllPostsTotal();

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
