const gql = require('graphql-tag');

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
        update_columns: [scheduled_departure, actual_departure, eta, sailing_status, vessel]
      }
    ) {
      affected_rows
    }
  }
`;

const addPercentage = gql`
mutation addPercentage($route_id: uuid, $scheduled_departure: date, $percent_full: Int) {
  update_sailing(where: {route_id: {_eq: $route_id}, scheduled_departure: {_eq: $scheduled_departure}}, _set: {percent_full: $percent_full}) {
    returning {
      route_id
      scheduled_departure
      percent_full
    }
  }
}

`;

module.exports = { upsertSailing, getSailing, addPercentage };
