import React from "react";
import Sailing from "./sailing";
import RouteHeader from "./routeHeader";
import styled from "styled-components";
import LoadingMessage from "./loadingMessage";

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
    this.loadScheduleData(this.props.routeId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentRoute === null) {
      this.loadScheduleData(this.props.routeId);
    }
  }

  loadScheduleData(id) {
    fetch(`/api/route/${id}`)
      .then(response => {
        return response.json();
      })
      .then(
        data => {
          this.setState({
            isLoaded: true,
            currentRoute: data[0]
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
