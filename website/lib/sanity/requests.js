import sanityImage from '@sanity/image-url';
import client, { previewClient } from './config';

const getUniquePosts = posts => {
  const slugs = new Set();
  return posts.filter(post => {
    if (slugs.has(post.slug)) {
      return false;
    }
    slugs.add(post.slug);
    return true;
  });
};

const postFields = `
  name,
  title,
  date,
  excerpt,
  'slug': slug.current,
  'coverImage': coverImage.asset->url,
  'author': author->{name, 'picture': picture.asset->url},
`;

const storeFields = `
  name,
  title,
  date,
  excerpt,
  'slug': slug.current,
  'coverImage': coverImage.asset->url,
  ...,
`;

const productFields = `
  name,
  title,
  price,
  excerpt,
  'slug': slug.current,
  'coverImage': coverImage.asset->url,
`;

const getClient = preview => (preview ? previewClient : client);

export const imageBuilder = sanityImage(client);

export async function getSiteConfig() {
  const data = await client.fetch(`*[_type == "siteSettings"] [0] {
    ...,
    'menu': menu[]->{ ..., }
   }`);
  return data;
}

export async function getPageBySlug(slug) {
  const data = await client.fetch(
    `*[_type == "page" && slug.current == $slug] [0] {
      ...,
     }`,
    { slug }
  );

  return data;
}

export async function getSubPageBySlug({ page, subpage }) {
  const data = await client.fetch(
    `*[_type == "page" && slug.current == $page] [0] {
      ...,
     }`,
    { page, subpage }
  );

  if (data?.childPages?.length) {
    for (let i = 0; i < data.childPages.length; i++) {
      const childPage = data.childPages[i];
      if (childPage.slug.current === subpage) {
        return childPage;
      }
    }
  }

  return false;
}

export async function getAllPagesTotal() {
  const data = await client.fetch(
    `*[_type == "page"] {
      ...,
      'slug': slug.current,
     }`
  );

  return data;
}

export async function getAllSubPagesTotal() {
  const data = await client.fetch(
    `*[_type == "page"] {
      ...,
      'slug': slug.current,
     }`
  );

  const subpages = [];

  if (data?.childPages?.length) {
    for (let i = 0; i < data.childPages.length; i++) {
      subpages.push(data.childPages[i]);
    }

    return subpages;
  }

  return [];
}

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(date desc){
      ${postFields}
      content
    }`,
    { slug }
  );
  return data[0];
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(
    '*[_type == "post"]{ \'slug\': slug.current }'
  );
  return data;
}

export async function getPostWithSearch(slug) {
  const data = await client.fetch(
    `*[_type == "post" && title match $slug || _type == "post" && excerpt match $slug]{
      ${postFields}
     }`,
    { slug }
  );
  return data;
}

export async function getAllStore(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "store"] | order(date desc, _updatedAt desc) {
      ${storeFields}
    }`);
  return getUniquePosts(results);
}

export async function getAllPosts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(date desc, _updatedAt desc) {
      ${postFields}
    }`);

  return getUniquePosts(results);
}

export async function getAllProducts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "product"] | order(date desc, _updatedAt desc){
      ${productFields}
    }`);
  return getUniquePosts(results);
}

export async function getPostAndMore(slug, preview) {
  const curClient = getClient(preview);
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        content,
      }`,
        { slug }
      )
      .then(res => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc){
        ${postFields}
        content,
      }[0...4]`,
      { slug }
    )
  ]);
  return { post, morePosts: getUniquePosts(morePosts) };
}

export async function getAllPostsTotal() {
  const data = await client.fetch(
    `*[_type == "post"] {
      ${postFields}
      content,
     }`
  );

  return data;
}

export async function getAllProjects(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "project"] | order(date desc, _updatedAt desc) {
      ${postFields}
    }`);
  return getUniquePosts(results);
}

export async function getProjectAndMore(slug, preview) {
  const curClient = getClient(preview);
  const [project, moreProjects] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "project" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        content,
        'childPosts': childPosts[] {
          'post': *[_id == ^._ref] [0] {
            ${postFields}
          },
        },
      }`,
        { slug }
      )
      .then(res => res?.[0]),
    curClient.fetch(
      `*[_type == "project" && slug.current != $slug] | order(date desc, _updatedAt desc){
        ${postFields}
        content,
      }[0...4]`,
      { slug }
    )
  ]);
  return { project, moreProjects: getUniquePosts(moreProjects) };
}

export async function getAllProjectsTotal() {
  const data = await client.fetch(
    `*[_type == "project"] {
      ${postFields}
      content,
     }`
  );

  return data;
}

export async function getAllStoresTotal() {
  const data = await client.fetch(
    `*[_type == "store"] {
      ${storeFields}
      ...,
     }`
  );

  return data;
}

export async function getPreviewProductBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "product" && slug.current == $slug] | order(date desc){
      ${productFields}
      content,
    }`,
    { slug }
  );
  return data[0];
}

export async function getStoreAndMore(slug, preview) {
  const curClient = getClient(preview);
  const [store, moreStores] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "store" && slug.current == $slug] | order(_updatedAt desc) {
          ${storeFields}
        ...,
        content,
      }`,
        { slug }
      )
      .then(res => res?.[0]),
    curClient.fetch(
      `*[_type == "store" && slug.current != $slug] | order(date desc, _updatedAt desc){
        ${storeFields}
        ...,
        content,
      }[0...4]`,
      { slug }
    )
  ]);

  return { store, moreStores: getUniquePosts(moreStores) };
}

export async function getAllProductsTotal() {
  const data = await client.fetch(
    `*[_type == "product"] {
      ${postFields}
      productFields,
     }`
  );

  return data;
}
