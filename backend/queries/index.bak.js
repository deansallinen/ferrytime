const gql = require('graphql-tag');

const upsertRouteMutation = gql`
  mutation upsertRoute(
    $routeName: String!
    $averageSailing: String!
    $sailingDate: String
  ) {
    insert_route(
      objects: [
        {
          route_name: $routeName
          average_sailing: $averageSailing
          sailing_date: $sailingDate
        }
      ]
      on_conflict: {
        constraint: route_route_name_key
        update_columns: [
          average_sailing
          car_waits
          oversize_waits
          sailing_date
        ]
      }
    ) {
      returning {
        id
      }
    }
  }
`;

/* GraphQL */

const getRouteIDbyName = gql`
  query getRouteID($route_name: String!) {
    route(where: { route_name: { _ilike: $route_name } }) {
      id
    }
  }
`;

const addWaits = gql`
  mutation addWaitsToRoute(
    $route_name: String!
    $car_waits: Int
    $oversize_waits: Int
  ) {
    update_route(
      where: { route_name: { _ilike: $route_name } }
      _set: { car_waits: $car_waits, oversize_waits: $oversize_waits }
    ) {
      returning {
        id
      }
    }
  }
`;

const getSailing = `
query oneSailing($routeId: String, $scheduledDeparture: String){
    sailing(routeId: $routeId, scheduledDeparture: $scheduledDeparture){
      id
      scheduledDeparture
      sailingStatus
      vessel
    }
  }
`;

const upsertSailing = gql`
  mutation upsertManySailings($objects: [sailing_insert_input!]!) {
    insert_sailing(
      objects: $objects
      on_conflict: {
        constraint: sailing_pkey
        update_columns: [
          scheduled_departure
          actual_departure
          eta
          sailing_status
          vessel
          
        ]
      }
    ) {
      affected_rows
    }
  }
`;

const addPercentage = gql`
  mutation addPercentage(
    $route_id: uuid
    $scheduled_departure: date
    $percent_full: Int
  ) {
    update_sailing(
      where: {
        route_id: { _eq: $route_id }
        scheduled_departure: { _eq: $scheduled_departure }
      }
      _set: { percent_full: $percent_full }
    ) {
      returning {
        route_id
        scheduled_departure
        percent_full
      }
    }
  }
`;

module.exports = {
  upsertRouteMutation,
  addWaits,
  getRouteIDbyName,
  upsertSailing,
  getSailing,
  addPercentage
};
