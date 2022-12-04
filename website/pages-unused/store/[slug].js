import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';

import Button from '~/components/elements/button';
import Heading from '~/components/elements/heading';
import { Icon } from 'next-pattern-library';
import Image from '~/components/elements/image';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardStore from '~/components/card/store';

import {
  imageBuilder,
  getSiteConfig,
  getStoreAndMore,
  getAllStoresTotal
} from '~/lib/sanity/requests';

export default function Store({ siteConfig, store, moreStores, preview }) {
  const router = useRouter();

  useEffect(() => {
    if (!router?.isFallback && !store?.slug) Router.push('/404');
  }, [router?.isFallback, store?.slug]);

  const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
  const buttonIconPlus = <Icon icon={['fas', 'plus']} />;

  if (!router?.isFallback && store?.slug) {
    return (
      <Layout
        meta={{
          siteConfig,
          title: store.title,
          description: store.excerpt,
          image: store.coverImage
        }}
        preview={preview}
      >
        <Container>
          <article className="flex  flex-wrap">
            <section className="col-24  col-12-md">
              <Image
                /* Options */
                src={imageBuilder
                  .image(store.coverImage)
                  .height(1080)
                  .width(1080)
                  .url()}
                placeholder={imageBuilder
                  .image(store.coverImage)
                  .height(108)
                  .width(108)
                  .url()}
                alt={store.title}
                figcaption={null}
                height={500}
                width={null}
                customClass={null}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </section>

            <section className="col-24  col-12-md  ph4  pv3">
              <div className="pb2">
                <Heading
                  /* Options */
                  htmlEntity="h1"
                  text={store.title}
                  color="black"
                  size="large"
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>

              <p className="t-secondary  f7  bg-almost-black  white  pa2  lh-copy  mb4  dib">
                ${store.price}
              </p>

              <div className="post__body  pb4">
                <BlockContent blocks={store.content} />
              </div>

              <div className="flex  flex-wrap  align-center">
                <div className="pr3">
                  <button
                    className="snipcart-add-item"
                    data-item-id={store.slug}
                    data-item-price={store.price}
                    data-item-url={`/store/${store.slug}`}
                    data-item-description={store.excerpt}
                    data-item-image={imageBuilder
                      .image(store.coverImage)
                      .height(1080)
                      .width(1080)
                      .url()}
                    data-item-name={store.title}
                  >
                    <Button
                      /* Options */
                      type="primary"
                      size="medium"
                      text="Add to cart"
                      color="black"
                      fluid={false}
                      icon={buttonIconPlus}
                      iconFloat="left"
                      inverted={false}
                      loading={false}
                      disabled={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </button>
                </div>
              </div>
            </section>
          </article>

          {moreStores.length > 0 && (
            <section className="pb3">
              <h2 className="t-primary  f5  lh-title  grey  tal  pb4">
                - More Stores
              </h2>

              <div className="flex  flex-wrap">
                {moreStores.map((p, i) => (
                  <div key={p.slug} className="col-24  col-6-md">
                    <div className="pa3">
                      <CardStore i={i} store={p} />
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
  const data = await getStoreAndMore(params.slug, preview);

  return {
    props: {
      siteConfig,
      preview,
      store: data.store || null,
      moreStores: data.moreStores || null
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const data = await getAllStoresTotal();

  return {
    paths:
      data
        .filter(store => store?.slug)
        .map(store => {
          return {
            params: {
              slug: store.slug
            }
          };
        }) || [],
    fallback: true
  };
}
