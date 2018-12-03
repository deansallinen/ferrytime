import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from './layout';
import Sailing from './sailing';
import {
  H1,
  H2,
  Ancestor,
  Parent,
  Child,
  Container,

} from './helpers';

const FerryRoute = (props) => {
  const { route } = props.data.ftapi;

  return (
    <Layout>
      <section className="hero">
        <div className="hero-body">
          <Container>
            <H1>{route.routeName}</H1>
            <H2>{route.averageSailing}</H2>
          </Container>
        </div>
      </section>
      <div className="section">
        <div className="container">

          <h3 className="title is-3">Sailings</h3>
          <Ancestor className="is-vertical">
            {route.sailings.map(sailing => (
              <Parent key={sailing.id}>
                <Child>
                  <Sailing {...sailing} />
                </Child>
              </Parent>
            ))}
          </Ancestor>
          <Link to="/">Go back to the homepage</Link>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PageQuery($routeName: String) {
    ftapi {
      route(routeName: $routeName) {
        id
        routeName
        averageSailing
        sailingDate
        sailings {
          id
          scheduledDeparture
          actualDeparture
          eta
          sailingStatus
          vessel
          lastUpdated
        }
      }
    }
  }
`;

export default FerryRoute;
