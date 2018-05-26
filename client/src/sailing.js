import React from "react";

const styles = {
  "background-color": "#eee",
  padding: "1rem",
  margin: "1rem 0"
};

class Sailing extends React.Component {
  render() {
    return (
      <div style={styles}>
        <p>{this.props.vessel} </p>
        <p>
          {this.props.sailingDate} {this.props.scheduledDeparture}
        </p>
        <p>Status: {this.props.sailingStatus}</p>
      </div>
    );
  }
}

export default Sailing;
