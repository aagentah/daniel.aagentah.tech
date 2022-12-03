import { useRouter } from 'next/router';

import Layout from '~/components/layout';
import RenderComponents from '~/helpers/render-components';

import {
  getSiteConfig,
  getSubPageBySlug,
  getAllSubPagesTotal
} from '~/lib/sanity/requests';

export default function Page({ siteConfig, page, preview }) {
  const router = useRouter();

  if (!router?.isFallback && !page?.slug) {
    return false; // TODO: error page
  }

  if (!router?.isFallback && page?.slug) {
    return (
      <Layout
        meta={{
          siteConfig,
          title: page.title,
          description: page.description,
          image: null
        }}
        navWhite={page?.slug.current === 'home'}
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
  const page = await getSubPageBySlug({
    page: params?.page,
    subpage: params?.subpage
  });

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
  const data = await getAllSubPagesTotal();

  return {
    paths:
      data
        .filter(page => page?.slug)
        .map(page => {
          return {
            params: {
              page: page.slug,
              subpage: page.slug
            }
          };
        }) || [],
    fallback: true
  };
}
