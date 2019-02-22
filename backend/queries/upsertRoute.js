const gql = require('graphql-tag');

const upsertRouteMutation = gql`
  mutation upsertRoute(
    $routeName: String!
    $averageSailing: String
    $sailingDate: String
  ) {
    insert_route(
      objects: [
        {
          routeName: $routeName
          averageSailing: $averageSailing
          sailingDate: $sailingDate
        }
      ]
      on_conflict: {
        constraint: route_routeName_key
        update_columns: [averageSailing, carWaits, oversizeWaits, sailingDate]
      }
    ) {
      returning {
        id
      }
    }
  }
`;

const addWaits = gql`
  mutation addWaits($routeName: String!, $carWaits: Int, $oversizeWaits: Int) {
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
  }
`;

module.exports = { upsertRouteMutation, addWaits };
