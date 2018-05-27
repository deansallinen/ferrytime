import React from "react";
import { render } from "react-dom";
import RoutesMenu from "./routesMenu";
import Clock from "./clock";
import styled from "styled-components";
import Schedule from "./schedule";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas: "header header" "menu schedule";
  column-gap: 1rem;
`;

const AppHeader = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

const Branding = styled.h1``;

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
        <AppHeader>
          <Branding>Ferry Tracker</Branding>
          <Clock />
        </AppHeader>
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
