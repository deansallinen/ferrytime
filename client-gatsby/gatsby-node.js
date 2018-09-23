/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { request } = require('graphql-request')
const crypto = require('crypto')
const path = require('path')
const slugify = require('slugify')

module.exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators
  const server = 'http://localhost:4000/graphql'
  const query = `
    {
     routes {
        id
        route_id: id
        route_name
      }
    }
    `
  const data = await request(server, query)
  console.log(data)
  createNodes(createNode, data.routes)
}

const createNodes = (fn, nodes) => {
  nodes.forEach(node => {
    console.log(node)
    const jsonNode = JSON.stringify(node)
    fn({
      id: node.id,
      parent: null,
      field: jsonNode,
      children: [],
      internal: {
        type: 'RoutePage',
        content: jsonNode,
        contentDigest: crypto
          .createHash(`md5`)
          .update(jsonNode)
          .digest('hex'),
      },
    })
  })
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const template = path.resolve(`src/templates/schedule.js`)

    resolve(
      graphql(`
        {
          allRoutePage {
            edges {
              node {
                field
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allRoutePage.edges.forEach(edge => {
          const fields = JSON.parse(edge.node.field)
          createPage({
            path: `${slugify(fields.route_name, {
              remove: /[$*_+~.()'"!\-:@]/g,
            })}`,
            component: template,
            context: {
              slug: `${slugify(fields.route_name, {
                remove: /[$*_+~.()'"!\-:@]/g,
              })}`,
              fields,
            },
          })
        })
      })
    )
  })
}
