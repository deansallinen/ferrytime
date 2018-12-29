
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

module.exports = { upsertSailing }