import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

export default () => (
  <StaticQuery
    query={graphql`
      query Menu {
        allSitePage {
          edges {
            node {
              path
              context {
                routeId
                routeName
              }
            }
          }
        }
      }
    `}
    render={data => (
      <ul>
        {data.allSitePage.edges
          .filter(each => /^\/route/.test(each.node.path))
          .map(each => (
            <Link to={each.node.path} key={each.node.context.routeId}>
              <li>{each.node.context.routeName}</li>
            </Link>
          ))}
      </ul>
    )}
  />
)
