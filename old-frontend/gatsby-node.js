/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    {
      ftapi {
        route {
          id
          route_name
          average_sailing
        }
      }
    }
  `)

  data.ftapi.route.forEach(({ id, route_name, average_sailing }) => {
    const linkPath = route_name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/g, '')
      .replace(/ /g, '_')

    actions.createPage({
      path: `route/${linkPath}`,
      component: path.resolve('./src/templates/routePage.js'),
      context: {
        id,
        route_name,
        average_sailing,
      },
    })
  })
}
