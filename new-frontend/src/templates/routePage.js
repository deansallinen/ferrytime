import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
// import {Link} from 'gatsby'
import { format } from 'date-fns'

import Layout from "../components/layout";
import SEO from "../components/seo";

const GET_ALL_SAILINGS = gql`
  query getAllSailings($route_id: uuid) {
    todays_sailings(where: { route_id: { _eq: $route_id } } order_by:{scheduled_departure: asc}) {
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
  const {scheduled_departure, actual_departure, eta, percent_full, sailing_status, vessel} = sailing
  return (
    <div className='mb-6'>
      <div className='text-xl'>{format(scheduled_departure, "HH:mm")}</div>
      <div>{actual_departure && format(actual_departure, "HH:mm")}</div>
      <div>{percent_full && `${percent_full} percent full`}</div>
      <div>{eta && format(eta, "HH:mm")}</div>
      <div>{sailing_status}</div>
      <div>{vessel}</div>

    </div>
  );
};

//             <pre>
// {JSON.stringify(sailing, null, 2)}
//       </pre>


const Sailings = ({ sailings }) => {
  return (
    <div className='my-6'>
      <h2>Sailings</h2>
        {sailings.map(sailing => <Sailing sailing={sailing} key={sailing.id} />)}
    </div>
  );
};

const RouteInfo = ({props}) => {
  const {route_name, average_sailing, car_waits, oversize_waits} = props
  return <div className='rounded-lg bg-white'>
    <h1>{route_name}</h1>
    <p>{average_sailing}</p>
    <p>Car waits: {car_waits || 0}</p>
    <p>Oversize waits: {oversize_waits || 0}</p>
  </div>
}

function RoutePage(props) {
  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />

      <div className="">
        <RouteInfo props={props.location.state}/>

        <Query
          query={GET_ALL_SAILINGS}
          pollInterval={60000}
          variables={{ route_id: props.pathContext.id }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Sailings sailings={props.location.state.sailingsByrouteId} />
              );
            if (error) return `Error! ${error.message}`;

            return <Sailings sailings={data.todays_sailings} />;
          }}
        </Query>
      </div>
    </Layout>
  );
}

export default RoutePage;
