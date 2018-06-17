import React, { Component } from 'react'
import styled from 'styled-components'
import RouteHeader from './routeHeader'
import Sailing from './sailing'
import NoSailings from './noSailings'

const RouteSchedule = styled.div`
  grid-area: schedule;
`

export default class FullSchedule extends Component {
  state = {
    loaded: false,
    data: [],
  }

  componentDidMount() {
    this.loadInfo()
  }

  loadInfo() {
    fetch(`/api/routes/${this.props.routeID}/sailings`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          loaded: true,
          data: data,
        }),
          error => {
            this.setState({ loaded: true, error })
          }
      })
  }

  render() {
    if (this.state.loaded === false) {
      return <div />
    } else if (this.state.data.length === 0) {
      return <NoSailings />
    } else {
      return (
        <RouteSchedule>
          <RouteHeader
            routeName={this.state.data[0].route_name}
            averageSailing={this.state.data[0].average_sailing}
          />
          {this.state.data.map(sailing => {
            return (
              <Sailing
                vessel={sailing.vessel}
                scheduledDeparture={sailing.scheduled_departure}
                actualDeparture={sailing.actual_departure}
                eta={sailing.eta}
                sailingStatus={sailing.sailing_status}
                key={sailing.id}
              />
            )
          })}
        </RouteSchedule>
      )
    }
  }
}
