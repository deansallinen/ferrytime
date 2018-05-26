import React from "react";
import AllRoutesItem from "./allRoutesItem";
import styled from "styled-components";

const Menu = styled.ul`
  list-style-type: none;
  line-height: 2rem;
  padding-left: 0;
`;

class RoutesMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      routeNames: []
    };
  }

  componentDidMount() {
    fetch("/api/routes")
      .then(results => {
        return results.json();
      })
      .then(
        data => {
          this.setState({
            isLoaded: true,
            routeNames: data.map(route => route.routeName)
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
    const routeNames = this.state.routeNames;
    return (
      <Menu>
        <AllRoutesItem key="All" name="All Routes" />
        {routeNames.map(routeName => (
          <AllRoutesItem key={routeName} name={routeName} />
        ))}
      </Menu>
    );
  }
}

export default RoutesMenu;
