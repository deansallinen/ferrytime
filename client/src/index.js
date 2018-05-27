import React from "react";
import { render } from "react-dom";
import "./index.css";
import RoutesMenu from "./routesMenu";
import styled from "styled-components";
import Schedule from "./schedule";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.state = {
      currentRoute: 1
    };
  }
  handleRouteChange(id) {
    this.setState({ currentRoute: id });
  }

  render() {
    return (
      <Wrapper>
        <RoutesMenu
          className="routesMenu"
          onRouteChange={this.handleRouteChange}
        />
        <Schedule routeId={this.state.currentRoute} />
      </Wrapper>
    );
  }
}

render(<App />, document.getElementById("root"));
