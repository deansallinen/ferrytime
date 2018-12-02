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
          .filter(each => each.node.context.routeName)
          .map(each => (
            <Link to={each.node.path} key={each.node.context.routeId}>
              <li>{each.node.context.routeName}</li>
            </Link>
          ))}
      </ul>
    )}
  />
)
