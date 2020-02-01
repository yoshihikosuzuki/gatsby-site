const queries = [
  {
    query: `
        {
          allMarkdownRemark {
            edges {
              node {
                excerpt
                frontmatter {
                  title
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `,
    transformer: ({ data }) =>
      data.allMarkdownRemark.edges.map(
        ({
          node: {
            excerpt,
            frontmatter: { title },
            fields: { slug }
          }
        }) => ({
          title,
          description: excerpt,
          path: slug
        })
      )
  }
];

module.exports = queries;
