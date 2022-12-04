import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';

import Heading from '~/components/elements/heading';
import Image from '~/components/elements/image';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';

import Date from '~/components/date';
import CardPost from '~/components/card/post';

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

  useEffect(() => {
    if (!router?.isFallback && !project?.slug) Router.push('/404');
  }, [router?.isFallback, project?.slug]);

  if (!router?.isFallback && project?.slug) {
    return (
      <Layout
        meta={{
          siteConfig,
          title: project.title,
          description: project.excerpt,
          image: project.coverImage
        }}
        preview={preview}
      >
        <Container>
          <article>
            <div className="mt6  mb5">
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
            </div>

            <section className="measure-wide  mla  mra">
              <div className="pb2">
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

              <div className="project__body  pb4">
                <BlockContent blocks={project.content} />
              </div>
            </section>
          </article>

          {project.childPosts.length > 0 && (
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
      </Layout>
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
      moreProjects: data.moreProjects || null
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