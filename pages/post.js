import Link from 'next/link';
import { request } from 'graphql-request';
import { format, parse } from 'date-fns';

const URL = 'https://server-sphnxiurqx.now.sh/graphql';
// const URL = 'http://localhost:4000/graphql';

const formatSailingTime = time =>
  time ? format(new Date(time).getTime(), 'HH:mm') : time;

const Post = props => (
  <div>
    <h1>{props.route.routeName}</h1>
    <ul>
      {props.route.sailings.map(sailing => {
        return (
          <li key={sailing.id}>
            {sailing.vessel} -{' '}
            <h1>{formatSailingTime(sailing.scheduledDeparture)}</h1>
            {sailing.sailingStatus} -{sailing.lastUpdated}
          </li>
        );
      })}
    </ul>
  </div>
);

Post.getInitialProps = async function(context) {
  const routeName = context.query.id;
  const gqlq = `{
      route(routeName: "${routeName}"){
          routeName
          sailings {
              id
              vessel
              scheduledDeparture
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
