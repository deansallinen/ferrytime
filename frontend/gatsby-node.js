/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      ftapi {
        allRoutes {
          id
          routeName
        }
      }
    }
  `);

  data.ftapi.allRoutes.forEach(({ id, routeName }) => {
    const linkPath = routeName
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/g, '')
      .replace(/ /g, '_');

    actions.createPage({
      path: `route/${linkPath}`,
      component: path.resolve('./src/components/ferryRoute.jsx'),
      context: {
        routeId: id,
        routeName,
      },
    });
  });
};
