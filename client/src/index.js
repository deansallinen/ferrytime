import React from "react";
import { render } from "react-dom";
import Schedule from "./schedule";
import RouteHeader from "./route-header";

const styles = {
  fontFamily: "sans-serif",
  margin: "0"
  // 'background-color': "#666"
};

const App = () => (
  <div style={styles}>
    <RouteHeader routeName="Test Route" />
    <Schedule />
  </div>
);

render(<App />, document.getElementById("root"));
