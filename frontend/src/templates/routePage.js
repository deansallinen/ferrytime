import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
// import {Link} from 'gatsby'
import { format } from 'date-fns'

import Layout from '../components/layout'
import SEO from '../components/seo'

const GET_ALL_SAILINGS = gql`
  query getAllSailings($route_id: uuid) {
    todays_sailings(
      where: { route_id: { _eq: $route_id } }
      order_by: { scheduled_departure: asc }
    ) {
      id
      scheduled_departure
      actual_departure
      eta
      percent_full
      sailing_status
      vessel
    }
  }
`

const Sailing = ({ sailing }) => {
  const {
    scheduled_departure,
    actual_departure,
    eta,
    percent_full,
    sailing_status,
    vessel,
  } = sailing
  return (
    <div className="mb-6">
      <div className="text-xl font-bold">
        {format(scheduled_departure, 'HH:mm')}
        {eta && <span> ~> {format(eta, 'HH:mm')}</span>}
      </div>
      <div className="text-grey-darker text-sm">
        {actual_departure && format(actual_departure, 'HH:mm')}
      </div>
      <div>{percent_full && `${percent_full} percent full`}</div>
      <div />
      <div>{sailing_status}</div>
      <div>{vessel}</div>
    </div>
  )
}

const Sailings = ({ sailings }) => {
  return (
    <div className="my-6">
      <h2 className="mb-4">Sailings</h2>
      {sailings.map(sailing => (
        <Sailing sailing={sailing} key={sailing.id} />
      ))}
    </div>
  )
}

const RouteInfo = ({
  route_name,
  average_sailing,
  car_waits,
  oversize_waits,
}) => {
  return (
    <div className="rounded-lg bg-white">
      <h1>{route_name}</h1>
      <p>{average_sailing}</p>
      <div className="my-2">
        <p>Car waits: {car_waits || 0}</p>
        <p>Oversize waits: {oversize_waits || 0}</p>
      </div>
    </div>
  )
}

function RoutePage(props) {
  const {
    pageContext,
    location: { state },
  } = props
  return (
    <Layout>
      <SEO
        title={pageContext.route_name}
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
      />

      <div className="">
        {/* <pre>{JSON.stringify(pageContext, null, 2)}</pre>
        <pre>{JSON.stringify(state, null, 2)}</pre> */}
        <Query
          query={GET_ALL_SAILINGS}
          pollInterval={60000}
          variables={{ route_id: pageContext.id }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <>
                  <RouteInfo {...pageContext} />
                  <Sailings sailings={state ? state.sailingsByrouteId : []} />
                </>
              )
            if (error) return `Error! ${error.message}`

            return (
              <>
                <RouteInfo {...pageContext} />
                <Sailings sailings={data.todays_sailings} />
              </>
            )
          }}
        </Query>
      </div>
    </Layout>
  )
}

export default RoutePage
