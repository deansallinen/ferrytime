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
    vessel,
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
      <div className="w-1/4">
        <div className="text-3xl font-bold mb-2">
          {format(scheduled_departure, 'H:mm')}
        </div>
        <SailingStatus {...status} />
      </div>

      <div className="ml-4 pl-4 leading-normal text-grey-dark">
        <div className="">
          {eta && (
            <div className="flex items-center">
              {' '}
              <RightArrow />{' '}
              <span className="text-grey-darkest">
                &nbsp;{format(eta, 'H:mm')}
              </span>
            </div>
          )}
        </div>
        <div className="percent-full text-sm">
          {percent_full && (
            <p>
              <span className="font-bold text-grey-darker">{percent_full}</span>
              % full
            </p>
          )}
        </div>
        <div className="text-xs">
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
  oversize_waits,
  current_status,
}) => {
  return (
    <div className="mb-8 text-white antialiased">
      <div className="relative float-right">
        <Favourite routeName={route_name} />
      </div>
      <div className="mb-2">
        <h1 className="leading-none">{route_name}</h1>
      </div>

      <div className="bg-blue-dark p-4 rounded-lg mt-4 flex justify-between ">
        <div className="">
          <p className="text-xs text-blue-lighter">Duration</p>
          <p>{average_sailing.replace(/ou|utes/g, '')}</p>
        </div>
        <div className="">
          <p className="text-xs text-blue-lighter">Car waits</p>
          <p className="text-right">{car_waits || 0}</p>
        </div>
        <div className="">
          <p className="text-xs text-blue-lighter">Oversize waits</p>
          <p className="text-right">{oversize_waits || 0}</p>
        </div>
        <div className="hidden">
          <p className="text-xs text-blue-lighter">Current Status</p>
          {current_status}
        </div>
      </div>
    </div>
  );
};

function RoutePage(props) {
  const {
    pageContext,
    location: { state },
  } = props;
  return (
    <Layout {...pageContext}>
      <SEO
        title={pageContext.route_name}
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />

      <div className="">
        {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
        <Query
          query={GET_ALL_SAILINGS}
          pollInterval={60000}
          variables={{
            route_id: pageContext.id,
            today: startOfDay(new Date()),
          }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              let current_status;
              let sailings = [];
              if (state && state.sailingsByrouteId) {
                console.log(state);
                const latestSailing = state.sailingsByrouteId.reduce(
                  (acc, cur) => (cur.actual_departure ? cur : acc)
                );
                current_status = latestSailing.sailing_status;
                sailings = state.sailingsByrouteId || [];
              }
              return (
                <>
                  <RouteInfo {...pageContext} current_status={current_status} />
                  <Sailings sailings={sailings} />
                </>
              );
            }
            if (error) return `Error! ${error.message}`;

            const [route] = data.route;
            // console.log(route);
            const latestSailing = route.sailingsByrouteId.reduce((acc, cur) =>
              cur.actual_departure ? cur : acc
            );
            // console.log(latestSailing);
            const current_status = latestSailing.sailing_status;
            return (
              <>
                <RouteInfo
                  {...pageContext}
                  car_waits={route.car_waits}
                  oversize_waits={route.oversize_waits}
                  current_status={current_status}
                />
                <pre className="text-white">
                  {/* {JSON.stringify(route, null, 2)} */}
                  {/* {JSON.stringify(latestSailing, null, 2)} */}
                </pre>
                <Sailings sailings={route.sailingsByrouteId} />
              </>
            );
          }}
        </Query>
      </div>
    </Layout>
  );
}

export default RoutePage;
