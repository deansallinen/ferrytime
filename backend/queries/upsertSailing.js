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
  mutation upsertSailing(
    $routeId: Int
    $scheduledDeparture: String
    $actualDeparture: String
    $eta: String
    $sailingStatus: String
    $vessel: String
    $lastUpdated: String
  ) {
    insert_sailing(
      objects: [
        {
          routeId: $routeId
          scheduled_departure: $scheduledDeparture
          actualDeparture: $actualDeparture
          eta: $eta
          vessel: $vessel
          sailingStatus: $sailingStatus
          lastUpdated: $lastUpdated
        }
      ]
      on_conflict: {
        constraint: sailing_pkey
        update_columns: [
          actualDeparture
          eta
          lastUpdated
          percentFull
          sailingStatus
          scheduled_departure
        ]
      }
    ) {
      returning {
        id
      }
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
