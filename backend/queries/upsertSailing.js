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
        update_columns: [scheduled_departure, actual_departure]
      }
    ) {
      affected_rows
    }
  }
`;

const addPercentage = `
mutation addPercentage(
  $routeId: String
  $scheduledDeparture: String
  $percentFull: Int
) {
  updateSailing(
    input: {
      routeId: $routeId
      scheduledDeparture: $scheduledDeparture
      percentFull: $percentFull
    }
  ) {
    routeId
    scheduledDeparture
    vessel
  }
}
`;

module.exports = { upsertSailing, getSailing, addPercentage };
