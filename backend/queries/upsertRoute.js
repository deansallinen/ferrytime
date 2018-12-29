const upsertRoute = `
mutation updateRoute(
  $routeName: String
  $averageSailing: String
  $sailingDate: String
) {
  updateRoute(
    input: {
      routeName: $routeName
      averageSailing: $averageSailing
      sailingDate: $sailingDate
    }
  ) {
    id
    routeName
    averageSailing
  }
}`;

module.exports = { upsertRoute }