const upsertRoute = /* GraphQL */ `
  mutation upsertRoute(
    $route_name: String!
    $average_sailing: String!
    $sailing_date: String
    $oversize_waits: Int
    $car_waits: Int
  ) {
    insert_route(
      objects: [
        {
          route_name: $route_name
          average_sailing: $average_sailing
          sailing_date: $sailing_date
          oversize_waits: $oversize_waits
          car_waits: $car_waits
        }
      ]
      on_conflict: {
        constraint: route_route_name_key
        update_columns: [
          average_sailing
          car_waits
          oversize_waits
          sailing_date
        ]
      }
    ) {
      returning {
        id
      }
    }
  }
`;

const upsertSailing = /* GraphQL */ `
  mutation upsertManySailings($objects: [sailing_insert_input!]!) {
    insert_sailing(
      objects: $objects
      on_conflict: {
        constraint: sailing_pkey
        update_columns: [
          scheduled_departure
          actual_departure
          eta
          sailing_status
          vessel
        ]
      }
    ) {
      returning {
        id
        scheduled_departure
        routeByrouteId {
          id
          departure_term
          route_num_str
        }
      }
    }
  }
`;

const upsertSailingPercent = /* GraphQL */ `
  mutation updateSailingPercentage($id: uuid, $percent_full: Int) {
    update_sailing(
      where: { id: { _eq: $id } }
      _set: { percent_full: $percent_full }
    ) {
      returning {
        id
        percent_full
      }
    }
  }
`;

const upsertParkingAndWaits = /* GraphQL */ `
  mutation updateParkingAndSailingWaits(
    $id: uuid
    $parking_full: Int
    $oversize_waits: Int
    $car_waits: Int
  ) {
    update_route(
      where: { id: { _eq: $id } }
      _set: {
        parking_full: $parking_full
        oversize_waits: $oversize_waits
        car_waits: $car_waits
      }
    ) {
      returning {
        id
        parking_full
        oversize_waits
        car_waits
      }
    }
  }
`;

module.exports = {
  upsertRoute,
  upsertSailing,
  upsertSailingPercent,
  upsertParkingAndWaits,
};
