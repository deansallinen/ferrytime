import Link from 'next/link';
import { withRouter } from 'next/router';
import { request } from 'graphql-request';
import { format, parse } from 'date-fns';
import React from 'react';
import Sailing from '../components/sailing';
import Route from '../layouts/route';

const URL = 'https://ferrytracker.now.sh/graphql';
// const URL = 'http://localhost:4000/graphql';

const formatSailingTime = time =>
  time ? format(new Date(time).getTime(), 'HH:mm') : time;

const Post = withRouter(props => (
  <Route>
    <h1>{props.route.routeName}</h1>
    <ul>
      {props.route.sailings.map(sailing => {
        return (
          <li key={sailing.id}>
            <Sailing {...sailing} />
          </li>
        );
      })}
    </ul>
  </Route>
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
