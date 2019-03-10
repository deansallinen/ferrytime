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

/* GraphQL */

const getRouteIDbyName = gql`
query getRouteID($route_name: String!) {
  route(where: {route_name: {_ilike: $route_name}}) {
    id
  }
}
`

const addWaits = gql`
mutation addWaitsToRoute($route_name: String!, $car_waits:Int, $oversize_waits: Int){
  update_route(where:{route_name:{_ilike: $route_name}} _set:{car_waits: $car_waits, oversize_waits:$oversize_waits}){
    returning{
      id
    }
  }
}
`;

module.exports = { upsertRouteMutation, addWaits, getRouteIDbyName};
