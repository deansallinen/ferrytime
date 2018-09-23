// import React from 'react'
import Link from 'gatsby-link'
import FullSchedule from '../components/fullschedule'
import AppMenu from '../components/menu'

import React, { Component } from 'react'

export default class TM_FILENAME_BASE extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <FullSchedule routeID={this.props.pathContext.fields.route_id} />
  }
}

// export const query = graphql``
