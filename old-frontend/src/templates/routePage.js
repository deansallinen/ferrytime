import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { startOfDay } from 'date-fns';

import Layout from '../components/layout';
import SEO from '../components/seo';
import SailingsLoader from '../components/sailingLoader';
import { RouteInfo, RouteHeader } from '../components/routeInfo';
import SailingsList from '../components/sailingsList';

const GET_ALL_SAILINGS = gql`
  query getOneRoute($route_id: uuid, $today: timestamptz) {
    route(where: { id: { _eq: $route_id } }) {
      id
      route_name
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
        sailing_status
        percent_full
        vessel
      }
    }
  }
`;

function RoutePage(props) {
  const { pageContext } = props;
  return (
    <Layout {...pageContext}>
      <SEO
        title={pageContext.route_name}
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />

      <div className="">
        <Query
          query={GET_ALL_SAILINGS}
          pollInterval={60000}
          variables={{
            route_id: pageContext.id,
            today: startOfDay(new Date()),
          }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <>
                  <RouteInfo {...pageContext} />
                  <SailingsLoader />
                </>
              );

            if (error)
              return (
                <>
                  <RouteInfo {...pageContext} />
                  <div>Error! {error.message}</div>
                  <SailingsLoader />
                </>
              );

            const [route] = data.route;
            const latestSailing = route.sailingsByrouteId.reduce((acc, cur) =>
              cur.actual_departure ? cur : acc
            );
            const current_status = latestSailing.sailing_status;
            return (
              <>
                <RouteHeader {...pageContext} />
                <div className="flex md:flex-row-reverse flex-wrap">
                  <aside className="w-full md:w-1/4 md:pl-4">
                    <RouteInfo
                      {...pageContext}
                      car_waits={route.car_waits}
                      oversize_waits={route.oversize_waits}
                      current_status={current_status}
                    />
                  </aside>
                  <section className="w-full md:w-3/4 md:pr-4">
                    <SailingsList sailings={route.sailingsByrouteId} />
                  </section>
                </div>
              </>
            );
          }}
        </Query>
      </div>
    </Layout>
  );
}

export default RoutePage;
