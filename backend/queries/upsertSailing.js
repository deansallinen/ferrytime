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

const upsertSailing = `
mutation sailingUpdate(
  $routeId: String
  $scheduledDeparture: String
  $actualDeparture: String
  $eta: String
  $sailingStatus: String
  $vessel: String
  $lastUpdated: String
) {
  updateSailing(
    input: {
      routeId: $routeId
      scheduledDeparture: $scheduledDeparture
      actualDeparture: $actualDeparture
      eta: $eta
      vessel: $vessel
      sailingStatus: $sailingStatus
      lastUpdated: $lastUpdated
    }
  ) {
    routeId
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

module.exports = { upsertSailing, getSailing, addPercentage }