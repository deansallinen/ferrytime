import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link, graphql } from 'gatsby';
import { startOfDay } from 'date-fns';
import Layout from '../components/layout';
import SEO from '../components/seo';

const GET_ALL_ROUTES = gql`
  query getAllRoutes($today: timestamptz) {
    route(order_by: { route_name: asc }) {
      id
      route_name
      average_sailing
      car_waits
      oversize_waits
      sailingsByrouteId(
        where: { scheduled_departure: { _gt: $today } }
        order_by: { scheduled_departure: asc }
      ) {
        id
        scheduled_departure
        actual_departure
        eta
        percent_full
        sailing_status
        vessel
      }
    }
  }
`;

const Favourites = ({ edges }) => {
  const favourites =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('favourites')) || []
      : [];

  return favourites.length ? (
    <div>
      <h2>Favourites</h2>
      {edges
        .filter(each => /^\/route/.test(each.node.path))
        .filter(each => favourites.includes(each.node.context.route_name))
        .map(({ node }) => (
          <Route {...node} />
        ))}
    </div>
  ) : null;
};

const Route = ({ path, context, state }) => (
  <div className="my-4" key={context.id}>
    <Link
      to={path}
      key={context.id}
      state={state}
      className="no-underline hover:underline text-grey-darkest text-xl"
    >
      {context.route_name}
    </Link>
  </div>
);

function IndexPage({ data: { allSitePage } }) {
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />

      <div className="">
        <Favourites {...allSitePage} />
        <h2>All routes</h2>
        <Query
          query={GET_ALL_ROUTES}
          variables={{ today: startOfDay(new Date()) }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return allSitePage.edges.map(({ node }) => {
                return <Route {...node} />;
              });
            if (error) return `Error! ${error.message}`;

            return allSitePage.edges.map(({ node }) => {
              const [routeInfo] = data.route.filter(
                route => route.id === node.context.id
              );
              return <Route {...node} state={routeInfo} />;
            });
          }}
        </Query>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query Home {
    allSitePage(
      filter: { path: { regex: "/^/route/" } }
      sort: { fields: path, order: ASC }
    ) {
      edges {
        node {
          path
          context {
            id
            route_name
            average_sailing
          }
        }
      }
    }
  }
`;

export default IndexPage;
