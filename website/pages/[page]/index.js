import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import Layout from '~/components/layout';
import RenderComponents from '~/helpers/render-components';

import {
  getSiteConfig,
  getPageBySlug,
  getAllPagesTotal
} from '~/lib/sanity/requests';

export default function Page({ siteConfig, page, preview }) {
  const router = useRouter();

  useEffect(() => {
    if (!router?.isFallback && !page?.slug) Router.push('/404');
  }, [router?.isFallback, page?.slug]);

  if (!router?.isFallback && page?.slug) {
    return (
      <Layout
        meta={{
          siteConfig,
          title: page.title,
          description: page.description,
          image: null
        }}
        // navWhite={page?.slug.current === 'home'}
        preview={preview}
      >
        {page?.components?.length > 0 && (
          <RenderComponents components={page.components} />
        )}
      </Layout>
    );
  }

  return false;
}

export async function getStaticProps({ params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const page = await getPageBySlug(params?.page);

  return {
    props: {
      siteConfig,
      preview,
      page
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const data = await getAllPagesTotal();

  return {
    paths:
      data
        .filter(page => page?.slug)
        .map(page => {
          return {
            params: {
              page: page.slug
            }
          };
        }) || [],
    fallback: true
  };
}
