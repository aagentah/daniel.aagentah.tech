import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import RenderComponents from '~/helpers/render-components';

import { getSiteConfig, getPageBySlug } from '~/lib/sanity/requests';

export default function Page({ siteConfig, page, preview }) {
  const router = useRouter();

  useEffect(() => {
    if (!router?.isFallback && !page?.slug) Router.push('/404');
  }, [router?.isFallback, page?.slug]);

  if (!router?.isFallback && page?.slug) {
    return (
      <>
        {page?.components?.length > 0 && (
          <RenderComponents components={page.components} />
        )}
      </>
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
      layout: {
        preview,
        meta: {
          title: page?.title,
          description: page?.description,
          image: null
        }
      }
    },
    revalidate: 1
  };
}
