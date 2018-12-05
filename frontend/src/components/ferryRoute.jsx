import React, {useState, useEffect} from 'react';
import { Link, graphql } from 'gatsby';
import { request } from 'graphql-request';

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

const URL = 'https://ferrytrackerserver.now.sh/graphql';


const FerryRoute = (props) => {
  const { route } = props.data.ftapi;
  const {routeName, averageSailing} = route
  const [sailings, setSailings] = useState(route.sailings)
  
  useEffect(() => {
    // console.log(`testing: ${routeName}`)
  const query = `{
      route(routeName: "${routeName}"){
          routeName
          sailings {
              id
              vessel
              scheduledDeparture
              actualDeparture
              eta
              sailingStatus
              lastUpdated
          }
      }
  }`;
  request(URL, query).then(
    res => {
    // console.log(`Route info fetched.  ${Object.keys(res.route.sailings)}`)
    console.log(res.route.sailings)
    setSailings(res.route.sailings)
    }
    )
  // return res;
  }, [])
  
  return (
    <Layout>
      <section className="hero">
        <div className="hero-body">
          <Container>
            <H1>{routeName}</H1>
            <H2>{averageSailing}</H2>
          </Container>
        </div>
      </section>
      <div className="section">
        <div className="container">

          <h3 className="title is-3">Sailings</h3>
          <Ancestor className="is-vertical">
            {sailings.map(sailing => (
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
