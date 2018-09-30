import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { request } from 'graphql-request';

const URL = 'https://server-sphnxiurqx.now.sh/graphql';
// const URL = 'http://localhost:4000/graphql';

const Index = props => (
  <div>
    <h1>Ferrytracker</h1>
    <ul>
      {props.allRoutes.map(route => (
        <li key={route.id}>
          <Link
            as={`/r/${route.routeName}`}
            href={`/post?id=${route.routeName}`}
          >
            <a>{route.routeName}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Index.getInitialProps = async function() {
  const query = `{
    allRoutes {
      id
      routeName
    }
  }`;
  const res = await request(URL, query);
  console.log(`All routes fetched. Count: ${res.allRoutes.length}`);
  return res;
};

export default Index;
