import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const FerryRoute = props => (
  <Layout>
    {console.log(props)}
    <h1>{props.data.ftapi.route.routeName}</h1>
    <p>{props.data.ftapi.route.averageSailing}</p>
    <ul>
      {props.data.ftapi.route.sailings.map(sailing => (
        <li>{sailing.scheduledDeparture}</li>
      ))}
    </ul>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
  query PageQuery($routeName: String) {
    ftapi {
      route(routeName: $routeName) {
        id
        routeName
        averageSailing
        sailingDate
        sailings {
          id
          routeId
          scheduledDeparture
          actualDeparture
          eta
          sailingStatus
          vessel
          lastUpdated
        }
      }
    }
  }
`

export default FerryRoute
