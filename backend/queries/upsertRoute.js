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
        update_columns: [average_sailing, car_waits, oversize_waits, sailing_date]
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
