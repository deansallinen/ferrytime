import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import {
  Ancestor, Parent, Child, Columns, Column,
} from './helpers';

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
      <Columns>
        <Ancestor>
          <Column>
            {data.allSitePage.edges
              .filter(each => /^\/route/.test(each.node.path))
              .map(each => (
                <Parent>
                  <Link to={each.node.path} key={each.node.context.routeId}>
                    <Child className="box">
                      <h5 className="title is-5">

                        {each.node.context.routeName}
                      </h5>
                    </Child>
                  </Link>
                </Parent>
              ))}
          </Column>
        </Ancestor>
      </Columns>
    )}
  />
);
