import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import Iframe from 'react-iframe';
import SyntaxHighlighter from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';

import SubscribeBanner from '~/components/subscribe-banner';
import Container from '~/components/layout/container';

import Date from '~/components/date';
import CardPost from '~/components/card/post';
import { useApp } from '~/context-provider/app';

import {
  imageBuilder,
  getSiteConfig,
  getProjectAndMore,
  getAllProjectsTotal
} from '~/lib/sanity/requests';

export default function Project({
  siteConfig,
  project,
  moreProjects,
  preview
}) {
  const router = useRouter();
  const app = useApp();

  useEffect(() => {
    if (!router?.isFallback && !project?.slug) Router.push('/404');
  }, [router?.isFallback, project?.slug]);

  const serializers = {
    types: {
      codeBlock: ({ node }) => {
        const { language, code } = node;

        return (
          <div className="code-block">
            <SyntaxHighlighter language={language || 'text'} style={atomDark}>
              {code}
            </SyntaxHighlighter>
          </div>
        );
      },
      iframeEmbedBlock: ({ node }) => {
        const { iframeUrl, iframeHeightMobile, iframeHeightDesktop } = node;

        return (
          <div className="w-100  db  mla  mra  mb4">
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
      }
    }
  };

  if (!router?.isFallback && project?.slug) {
    return (
      <Container>
        <article>
          <Image
            /* Options */
            src={imageBuilder
              .image(project.coverImage)
              .height(500)
              .width(1080)
              .url()}
            placeholder={imageBuilder
              .image(project.coverImage)
              .height(50)
              .width(108)
              .url()}
            alt={project.title}
            figcaption={null}
            height={500}
            width={null}
            customClass="br4  shadow2"
            onClick={null}
            /* Children */
            withLinkProps={null}
          />

          <section className="measure-wide  mla  mra">
            <div className="pb2  pt4">
              <Heading
                /* Options */
                htmlEntity="h1"
                text={project.title}
                color="black"
                size="large"
                truncate={0}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </div>

            <p className="t-secondary  f7  almost-black  lh-copy  pb4">
              <Date dateString={project.date} />
            </p>

            <div className="richtext  project__body  pb4">
              <BlockContent
                blocks={project.content}
                serializers={serializers}
              />
            </div>

            <div className="pb4  tac">
              <div className="pb3">
                <Heading
                  /* Options */
                  htmlEntity="h2"
                  text="Keep in touch <3"
                  color="black"
                  size="large"
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
              <SubscribeBanner />
            </div>
          </section>
        </article>

        {project?.childPosts?.length > 0 && (
          <section className="pb3">
            <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
              - Related Posts
            </h2>

            <div className="flex  flex-wrap">
              {project.childPosts.map((p, i) => (
                <div key={p.slug} className="col-24  col-12-md">
                  <div className="pa3">
                    <CardPost i={i} item={p.post} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const data = await getProjectAndMore(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      project: data.project || null,
      moreProjects: data.moreProjects || null,
      morePosts: data.morePosts || null,
      layout: {
        preview,
        meta: {
          title: data.project?.title,
          description: data.project?.excerpt,
          image: data.project?.coverImage
        }
      }
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const data = await getAllProjectsTotal();

  return {
    paths:
      data
        .filter(project => project?.slug)
        .map(project => {
          return {
            params: {
              slug: project.slug
            }
          };
        }) || [],
    fallback: true
  };
}
