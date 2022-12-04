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
  getPostAndMore,
  getAllPostsTotal
} from '~/lib/sanity/requests';

export default function Post({ siteConfig, post, morePosts, preview }) {
  const router = useRouter();

  useEffect(() => {
    if (!router?.isFallback && !post?.slug) Router.push('/404');
  }, [router?.isFallback, post?.slug]);

  if (!router?.isFallback && post?.slug) {
    return (
      <Layout
        meta={{
          siteConfig,
          title: post.title,
          description: post.excerpt,
          image: post.coverImage
        }}
        preview={preview}
      >
        <Container>
          <article>
            <div className="mt6  mb5">
              <Image
                /* Options */
                src={imageBuilder
                  .image(post.coverImage)
                  .height(500)
                  .width(1080)
                  .url()}
                placeholder={imageBuilder
                  .image(post.coverImage)
                  .height(50)
                  .width(108)
                  .url()}
                alt={post.title}
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
                  text={post.title}
                  color="black"
                  size="large"
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <p className="t-secondary  f7  almost-black  lh-copy  pb4">
                <Date dateString={post.date} />
              </p>

              <div className="post__body  pb4">
                <BlockContent blocks={post.content} />
              </div>
            </section>
          </article>

          {morePosts.length > 0 && (
            <section className="pb3">
              <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
                - More Posts
              </h2>

              <div className="flex  flex-wrap">
                {morePosts.map((p, i) => (
                  <div key={p.slug} className="col-24  col-6-md">
                    <div className="pa3">
                      <CardPost i={i} post={p} />
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
  const data = await getPostAndMore(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      post: data.post || null,
      morePosts: data.morePosts || null
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const data = await getAllPostsTotal();

  return {
    paths:
      data
        .filter(post => post?.slug)
        .map(post => {
          return {
            params: {
              slug: post.slug
            }
          };
        }) || [],
    fallback: true
  };
}