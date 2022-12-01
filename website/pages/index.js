import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import Layout from '~/components/layout';
import RenderComponents from '~/helpers/render-components';

import {
  getSiteConfig,
  getPageBySlug,
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
          image: null,
        }}
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

export async function getStaticProps({ preview = false }) {
  const siteConfig = await getSiteConfig();
  const page = await getPageBySlug('home');

  return {
    props: {
      siteConfig,
      preview,
      page,
    },
    revalidate: 1,
  };
}
