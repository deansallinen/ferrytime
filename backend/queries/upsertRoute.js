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

const addWaits = `
mutation addWaits(
  $routeName: String!
  $carWaits: Int
  $oversizeWaits: Int
) {
  updateRoute(
    input: {
      carWaits: $carWaits 
      oversizeWaits: $oversizeWaits 
      routeName: $routeName
    }
  ) {
    id
    routeName
    averageSailing
    carWaits
    oversizeWaits
  }
}`;

module.exports = { upsertRoute, addWaits }