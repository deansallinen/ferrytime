import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// import {Link} from 'gatsby'
import { format } from 'date-fns';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Favourite from '../components/addFavourite';

const GET_ALL_SAILINGS = gql`
  query getAllSailings($route_id: uuid) {
    todays_sailings(
      where: { route_id: { _eq: $route_id } }
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
`;

const Sailing = ({ sailing }) => {
  const {
    scheduled_departure,
    actual_departure,
    eta,
    percent_full,
    sailing_status,
    vessel
  } = sailing;
  return (
    <div className="pb-4 mb-4">
      <div className="card flex">
        <div className="w-24 text-right">
          <div className="text-3xl font-bold">
            {format(scheduled_departure, 'H:mm')}
          </div>
          {eta && <span> &rarr; {format(eta, 'H:mm')}</span>}
        </div>
        <div className="ml-4 border-l-2 border-grey-lighter pl-4 leading-normal">
          <div className="text-grey-dark text-sm" />
          {percent_full && (
            <div>
              <span className="font-bold">{percent_full}</span> percent full
            </div>
          )}
          <div>{sailing_status}</div>
          <div className="text-xs text-grey-dark">
            {vessel}
            {actual_departure &&
              ` departed at ${format(actual_departure, 'H:mm')}`}
          </div>
        </div>
      </div>
    </div>
  );
};

const Sailings = ({ sailings }) => {
  return (
    <div className="my-6">
      <h2 className="mb-4 text-lg font-normal ">Sailings</h2>
      {sailings.map(sailing => (
        <Sailing sailing={sailing} key={sailing.id} />
      ))}
    </div>
  );
};

const RouteInfo = ({
  route_name,
  average_sailing,
  car_waits,
  oversize_waits
}) => {
  return (
    <div className="rounded-lg bg-white">
      <h1>{route_name}</h1>
      <p>{average_sailing}</p>
      <div className="my-2">
        <p>Car waits: {car_waits || 0}</p>
        <p>Oversize waits: {oversize_waits || 0}</p>
      </div>
      <Favourite routeName={route_name} />
    </div>
  );
};

function RoutePage(props) {
  const {
    pageContext,
    location: { state }
  } = props;
  return (
    <Layout>
      <SEO
        title={pageContext.route_name}
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />

      <div className="">
        {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre>
        <pre>{JSON.stringify(state, null, 2)}</pre> */}
        <Query
          query={GET_ALL_SAILINGS}
          pollInterval={60000}
          variables={{ route_id: pageContext.id }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <>
                  <RouteInfo {...pageContext} />
                  <Sailings
                    sailings={
                      state.sailingsByrouteId ? state.sailingsByrouteId : []
                    }
                  />
                </>
              );
            if (error) return `Error! ${error.message}`;

            return (
              <>
                <RouteInfo {...pageContext} />
                <Sailings sailings={data.todays_sailings} />
              </>
            );
          }}
        </Query>
      </div>
    </Layout>
  );
}

export default RoutePage;
