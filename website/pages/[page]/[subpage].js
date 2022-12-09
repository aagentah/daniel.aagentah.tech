import { useRouter } from 'next/router';

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
      <>
        {page?.components?.length > 0 && (
          <RenderComponents components={page.components} />
        )}
      </>
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
