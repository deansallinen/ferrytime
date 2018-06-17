import React from 'react'
import Link from 'gatsby-link'
import FullSchedule from '../components/fullschedule'
import AppMenu from '../components/menu'

const IndexPage = () => (
  <div>
    <FullSchedule routeID="1" />
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage
