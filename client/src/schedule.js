import React from "react";
import Sailing from "./sailing";

class Schedule extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      sailings: []
    };
  }

  componentDidMount() {
    fetch("/api/sailings")
      .then(results => {
        return results.json();
      })
      .then(
        data => {
          this.setState({
            isLoaded: true,
            sailings: data.map(sailing => (
              <Sailing
                vessel={sailing.vessel}
                sailingDate={sailing.sailingDate}
                scheduledDeparture={sailing.scheduledDeparture}
                sailingStatus={sailing.sailingStatus}
                key={sailing.id}
              />
            ))
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
    return <div>{this.state.sailings}</div>;
  }
}

export default Schedule;
