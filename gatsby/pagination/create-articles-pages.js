'use strict';

const path = require('path');
const siteConfig = require('../../config.js');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "article" }, draft: { ne: true } } }
      ) { totalCount }
    }
  `);

  const { articlesPerPage } = siteConfig;
  const numPages = Math.ceil(result.data.allMarkdownRemark.totalCount / articlesPerPage);

  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? '/articles' : `/articles/${i}`,
      component: path.resolve('./src/templates/articles-template.js'),
      context: {
        currentPage: i,
        postsLimit: articlesPerPage,
        postsOffset: i * articlesPerPage,
        prevPagePath: i <= 1 ? '/' : `/article/${i - 1}`,
        nextPagePath: `/article/${i + 1}`,
        hasPrevPage: i !== 0,
        hasNextPage: i !== numPages - 1
      }
    });
  }
};
