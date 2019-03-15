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
    <div className="mb-12">
      <h2 className="text-white text-lg font-semibold antialiased">
        Favourites
      </h2>
      {edges
        .filter(each => /^\/route/.test(each.node.path))
        .filter(each => favourites.includes(each.node.context.route_name))
        .map(({ node }) => (
          <Route {...node} key={node.context.id} />
        ))}
    </div>
  ) : null;
};

const Route = ({ path, context, state }) => {
  const { route_name, id } = context;
  const [departureTerminal, arrivalTerminal] = route_name.split(' to ');
  return (
    <div
      className="my-4 bg-white rounded-lg px-4 py-4 shadow border-b-4 border-blue-light"
      key={id}
    >
      <Link
        to={path}
        key={id}
        state={state}
        className="no-underline hover:underline text-grey-darkest text-xl"
      >
        <div className="font-bold pb-1">{departureTerminal}</div>
        <div className="text-grey-dark text-lg">to {arrivalTerminal}</div>
      </Link>
    </div>
  );
};

function IndexPage({ data: { allSitePage } }) {
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />

      <div className="">
        <Favourites {...allSitePage} />
        <h2 className="text-white text-lg font-semibold antialiased">
          All routes
        </h2>
        <Query
          query={GET_ALL_ROUTES}
          variables={{ today: startOfDay(new Date()) }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return allSitePage.edges.map(({ node }) => {
                return <Route {...node} key={node.context.id} />;
              });
            if (error) return `Error! ${error.message}`;

            return allSitePage.edges.map(({ node }) => {
              const [routeInfo] = data.route.filter(
                route => route.id === node.context.id
              );
              return (
                <Route {...node} state={routeInfo} key={node.context.id} />
              );
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
