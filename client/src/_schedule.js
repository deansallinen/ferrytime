import React from 'react';
import Sailing from './_sailing';
import RouteHeader from './routeHeader';
import styled from 'styled-components';
import LoadingMessage from './loadingMessage';

const RouteSchedule = styled.div`
  grid-area: schedule;
`;

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      currentRoute: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.routeId !== state.prevId) {
      return {
        currentRoute: null,
        prevId: props.routeId
      };
    }
    return null;
  }

  componentDidMount() {
    this.loadRouteInfo(this.props.routeId);
    this.loadRouteSchedule(this.props.routeId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentRoute === null) {
      this.loadRouteInfo(this.props.routeId);
      this.loadRouteSchedule(this.props.routeId);
    }
  }

  loadRouteInfo(id) {
    fetch(`/api/routes/${id}`)
      .then(response => {
        return response.json();
      })
      .then(
        data => {
          this.setState({
            isLoaded: true,
            routeInfo: data[0]
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  loadRouteSchedule(id) {
    fetch(`/api/routes/${id}/schedule`)
      .then(response => {
        return response.json();
      })
      .then(
        data => {
          this.setState({
            isLoaded: true,
            routeSchedule: data[0]
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    if (this.state.currentRoute === null) {
      return <LoadingMessage />;
    } else {
      return (
        <RouteSchedule>
          <RouteHeader
            routeName={this.state.currentRoute.routeName}
            averageSailing={this.state.currentRoute.averageSailing}
          />
          {this.state.currentRoute.sailings.map(sailing => {
            return (
              <Sailing
                vessel={sailing.vessel}
                sailingDate={sailing.sailingDate}
                scheduledDeparture={sailing.scheduledDeparture}
                sailingStatus={sailing.sailingStatus}
                key={sailing.id}
              />
            );
          })}
        </RouteSchedule>
      );
    }
  }
}

export default Schedule;
