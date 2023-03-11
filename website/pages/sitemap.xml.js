import React from 'react';

import {
  getAllPosts,
  getAllProjects,
  getAllPagesTotal,
  getAllMusicsTotal,
} from '~/lib/sanity/requests';

const sitemapXml = (allPosts, allProjects, allPages, allMusic) => {
  let postsXML = '';
  let projectsXML = '';
  let pagesXML = '';
  let musicXML = '';

  allPages.map((page) => {
    const url = `${process.env.SITE_URL}/${page.slug}`;
    const date = Date.parse(page._updatedAt);

    pagesXML += `
      <url>
        <loc>${url}</loc>
        <lastmod>${date}</lastmod>
        <priority>1.00</priority>
      </url>`;

    return true;
  });

  allPosts.map((post) => {
    const url = `${process.env.SITE_URL}/posts/${post.slug}`;
    const date = Date.parse(post.date);

    postsXML += `
      <url>
        <loc>${url}</loc>
        <lastmod>${date}</lastmod>
        <priority>0.50</priority>
      </url>`;

    return true;
  });

  allProjects.map((project) => {
    const url = `${process.env.SITE_URL}/project/${project.slug}`;
    const date = Date.parse(project.date);

    projectsXML += `
      <url>
        <loc>${url}</loc>
        <lastmod>${date}</lastmod>
        <priority>0.50</priority>
      </url>`;

    return true;
  });

  allMusic.map((music) => {
    const url = `${process.env.SITE_URL}/music/${music.slug}`;
    const date = Date.parse(music.date);

    musicXML += `
      <url>
        <loc>${url}</loc>
        <lastmod>${date}</lastmod>
        <priority>0.50</priority>
      </url>`;

    return true;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.SITE_URL}</loc>
        <lastmod>0</lastmod>
        <priority>1.00</priority>
      </url>
      ${pagesXML}
      ${postsXML}
      ${projectsXML}
      ${musicXML}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const allPosts = await getAllPosts();
    const allProjects = await getAllProjects();
    const allPages = await getAllPagesTotal();
    const allMusic = await getAllMusicsTotal();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(allPosts, allProjects, allPages, allMusic));
    res.end();
  }
}

export default Sitemap;
