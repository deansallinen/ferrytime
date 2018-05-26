import React from "react";
import { render } from "react-dom";
import Schedule from "./schedule";
import RouteHeader from "./route-header";
import "./index.css";
import AllRoutesMenu from "./allRoutesMenu";

const App = () => (
  <div className="app">
    <AllRoutesMenu className="allRoutesMenu" />
    <div className="content">
      <RouteHeader routeName="Test Route" />
      <Schedule />
    </div>
  </div>
);

render(<App />, document.getElementById("root"));
