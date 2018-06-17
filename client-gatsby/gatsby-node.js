/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type)
}

// exports.createPages = ({ boundActionCreators, graphql }) => {
//   const { createPage } = boundActionCreators

//   return new Promise((resolve, reject) => {
//     const scheduleTemplate = path.resolve(`src/templates/schedule.js`)
//     fetch('/api/routes').then(result => {
//       if (result.errors) {
//         reject(result.errors)
//       }
//       result.forEach(route => {
//         createPage({
//           path,
//           component: scheduleTemplate,
//         })
//       })
//     })
//   })
// }
