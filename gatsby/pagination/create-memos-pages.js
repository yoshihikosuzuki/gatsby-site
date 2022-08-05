'use strict';

const path = require('path');
const siteConfig = require('../../config.js');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { template: { eq: "memo" } } }
      ) { totalCount }
    }
  `);

  const { memosPerPage } = siteConfig;
  const numPages = Math.ceil(result.data.allMarkdownRemark.totalCount / memosPerPage);

  for (let i = 0; i < numPages; i += 1) {
    createPage({
      path: i === 0 ? '/memos' : `/memos/${i}`,
      component: path.resolve('./src/templates/memos-template.js'),
      context: {
        currentPage: i,
        postsLimit: memosPerPage,
        postsOffset: i * memosPerPage,
        prevPagePath: i <= 1 ? '/memos' : `/memos/${i - 1}`,
        nextPagePath: `/memos/${i + 1}`,
        hasPrevPage: i !== 0,
        hasNextPage: i !== numPages - 1
      }
    });
  }
};
