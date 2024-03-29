import { useState, useEffect } from 'react';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardPost from '~/components/card/post';

import Heading from '~/components/elements/heading';

import { getSiteConfig, getPostWithSearch } from '~/lib/sanity/requests';

export default function Post({ siteConfig, params }) {
  const [posts, setPosts] = useState(null);
  const [postsLength, setPostsLength] = useState(12);

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await getPostWithSearch(params.slug);
      setPostsLength(postsData.length);
      setPosts(postsData);
    };

    getPosts();
  }, [params.slug]);

  return (
    <Layout
      meta={{
        siteConfig,
        title: 'Search',
        description: 'This is the Search page.',
        image: null,
      }}
      preview={null}
    >
      <Container>
        <div className="pt4  pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Search"
            color="white"
            size="large"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        {postsLength === 0 && (
          <section className="pb3">
            <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
              - No Results for &quot;
              {params.slug}
              &quot;
            </h2>
          </section>
        )}

        {postsLength > 0 && (
          <section className="pb3">
            <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
              - Results for &quot;
              {params.slug}
              &quot;
            </h2>

            <div className="flex  flex-wrap">
              {[...Array(postsLength)].map((iteration, i) => (
                <div key={iteration} className="col-24  col-6-md">
                  <div className="pa3">
                    <CardPost i={i} post={posts && posts[i]} />
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

export async function getServerSideProps({ params, preview = false }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig,
      params,
    },
  };
}
