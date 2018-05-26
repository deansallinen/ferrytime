import React from "react";
import RouteHeader from "./route-header";
import Schedule from "./schedule";

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false
    };
  }
  render() {
    return (
      <div className={this.props.className}>
        <RouteHeader routeName="Test Route" />
        <Schedule />
      </div>
    );
  }
}

export default Content;
