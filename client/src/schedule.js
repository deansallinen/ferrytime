import React from "react";
import Sailing from "./sailing";
import RouteHeader from "./route-header";
import styled from "styled-components";

const RouteSchedule = styled.div``;

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
      return <h1>Loading...</h1>;
    } else {
      return (
        <RouteSchedule>
          <RouteHeader routeName={this.state.currentRoute.routeName} />
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
