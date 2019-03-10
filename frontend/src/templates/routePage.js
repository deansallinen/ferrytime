import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// import {Link} from 'gatsby'
import { format, isWithinRange, startOfDay } from 'date-fns';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Favourite from '../components/addFavourite';
import SailingStatus from '../components/sailingStatus';

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

const RightArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
    >
      <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
    </svg>
  );
};

const Sailing = ({ sailing }) => {
  const {
    scheduled_departure,
    actual_departure,
    eta,
    percent_full,
    sailing_status,
    vessel
  } = sailing;
  const isCancelled = sailing_status === 'Cancelled';
  const isOnTime = sailing_status === 'On Time';
  const isDelayed = !['On Time', 'Cancelled', '', null, undefined].includes(
    sailing_status
  );
  const status = { isCancelled, isDelayed, isOnTime };

  const isCurrent = ({ sailing_status, eta, actual_departure }) =>
    eta &&
    actual_departure &&
    !['Cancelled', '', null, undefined].includes(sailing_status) &&
    isWithinRange(new Date(), new Date(actual_departure), new Date(eta));

  return (
    <div
      className={`flex my-1 py-4 px-4 bg-white ${
        isDelayed
          ? 'bg-yellow-lightest border-t-4 -mt-1 -mb-1 border-b-4 border-yellow-lighter'
          : ''
      }${
        isCancelled
          ? 'bg-red-lightest border-t-4 -mt-1 -mb-1 border-b-4 border-red-lighter'
          : ''
      }`}
    >
      <div className="">
        <div className="text-3xl font-bold mb-2">
          {format(scheduled_departure, 'H:mm')}
        </div>
        <SailingStatus {...status} />
      </div>

      <div className="ml-4 pl-4 leading-normal">
        <div className="">
          {eta && (
            <div className="flex items-center">
              {' '}
              <RightArrow /> <span>&nbsp;{format(eta, 'H:mm')}</span>
            </div>
          )}
        </div>
        <div className="text-grey-dark text-sm" />
        {percent_full && (
          <div>
            <span className="font-bold">{percent_full}</span>% full
          </div>
        )}
        <div className="text-xs text-grey-dark">
          {isDelayed && <div>{sailing_status}</div>} {vessel}
          {actual_departure && (
            <div>
              departed at{' '}
              <span className="text-grey-darker">
                {format(actual_departure, 'H:mm')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Sailings = ({ sailings }) => {
  const [showCompleted, setShowCompleted] = useState(true);
  const toggleShowCompleted = () => setShowCompleted(!showCompleted);

  return (
    <div className="my-6">
      <div className="flex justify-between items-baseline">
        <h2 className="mb-4 text-xl font-semibold text-white antialiased ">
          Sailings
        </h2>
        {showCompleted ? (
          <button
            className="underline text-xs text-white antialiased"
            onClick={toggleShowCompleted}
          >
            Hide completed
          </button>
        ) : (
          <button
            className="underline text-xs text-white antialiased"
            onClick={toggleShowCompleted}
          >
            Show completed
          </button>
        )}
      </div>
      <div className="bg-white border-b-4 border-t-2 border-white rounded-lg shadow">
        <div className="bg-blue-lightest">
          {showCompleted
            ? sailings.map(sailing => (
                <Sailing sailing={sailing} key={sailing.id} />
              ))
            : sailings
                .filter(sailing => {
                  return !(new Date(sailing.eta) < new Date()) || !sailing.eta;
                })
                .map(sailing => <Sailing sailing={sailing} key={sailing.id} />)}
        </div>
      </div>
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
    <div className="rounded-lg bg-white px-4 py-4 shadow mb-12">
      <div className="relative float-right">
        <Favourite routeName={route_name} />
      </div>
      <div className="mb-2">
        <h1 className="leading-none">{route_name}</h1>
      </div>
      <div className="">
        <div className="mt-2">
          <p className="text-xs text-grey-dark ">Duration</p>
          {average_sailing}
        </div>
        <div className="mt-2">
          <p className="text-xs text-grey-dark ">Sailing waits</p>
          Car: <span className="mr-2 font-bold">{car_waits || 0}</span>
          Oversize:{' '}
          <span className="mr-2 font-bold">{oversize_waits || 0}</span>
        </div>
      </div>
    </div>
  );
};

function RoutePage(props) {
  const {
    pageContext,
    location: { state }
  } = props;
  return (
    <Layout {...pageContext}>
      <SEO
        title={pageContext.route_name}
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />

      <div className="">
        {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
        <Query
          query={GET_ALL_SAILINGS}
          pollInterval={60000}
          variables={{
            route_id: pageContext.id,
            today: startOfDay(new Date())
          }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <>
                  <RouteInfo {...pageContext} />
                  <Sailings
                    sailings={
                      state && state.sailingsByrouteId
                        ? state.sailingsByrouteId
                        : []
                    }
                  />
                </>
              );
            if (error) return `Error! ${error.message}`;

            return (
              <>
                <RouteInfo
                  {...pageContext}
                  car_waits={data.route[0].car_waits}
                  oversize_waits={data.route[0].oversize_waits}
                />
                <pre className="text-white">
                  {/* {JSON.stringify(props, null, 2)} */}
                  {/* {JSON.stringify(data, null, 2)} */}
                </pre>
                <Sailings sailings={data.route[0].sailingsByrouteId} />
              </>
            );
          }}
        </Query>
      </div>
    </Layout>
  );
}

export default RoutePage;
