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
  getAllProjectsTotal,
} from '~/lib/sanity/requests';

export default function Project({
  siteConfig,
  project,
  moreProjects,
  preview,
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

  if (!router?.isFallback && project?.slug) {
    return (
      <>
        <div className="container  mla  mra  pt3  pt0-md">
          <div className="project__header">
            <Image
              /* Options */
              src={imageBuilder.image(project.coverImage).width(1960).url()}
              placeholder={imageBuilder
                .image(project.coverImage)
                .width(108)
                .url()}
              alt={project.title}
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
                  text={project.title}
                  color="white"
                  size="large"
                  truncate={null}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <p className="t-secondary  f7  almost-white  lh-copy  pb4">
                <Date dateString={project.date} />
              </p>

              <div className="richtext  project__body  pb4">
                <BlockContent
                  blocks={project.content}
                  serializers={serializers}
                />
              </div>

              {project?.childPosts?.length > 0 && (
                <section className="pb4">
                  <h2 className="t-primary  ph3  f5  lh-title  blck  tal  pb3">
                    &gt; Blog posts for {project.title}
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
          image: data.project?.coverImage,
          pageClass: 'project',
        },
      },
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const data = await getAllProjectsTotal();

  return {
    paths:
      data
        .filter((project) => project?.slug)
        .map((project) => {
          return {
            params: {
              slug: project.slug,
            },
          };
        }) || [],
    fallback: true,
  };
}
