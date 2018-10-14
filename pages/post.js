import Link from 'next/link';
import { withRouter } from 'next/router';
import { request } from 'graphql-request';
import React from 'react';
import Sailing from '../components/sailing';
import Page from '../layouts/main';

const URL = 'https://ferrytrackerserver.now.sh/graphql';
// const URL = 'http://localhost:4000/graphql';

const Post = withRouter(props => (
  <Page>
    <h1>{props.route.routeName}</h1>
      {props.route.sailings.map(sailing => {
        return (
            <Sailing {...sailing }key={sailing.id} />
        );
      })}
  </Page>
));

Post.getInitialProps = async function(context) {
  const routeName = context.query.id;
  const gqlq = `{
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
  const res = await request(URL, gqlq);
  console.log(`Route info fetched. Sailings: ${res.route.sailings.length}`);
  return res;
};

export default Post;
