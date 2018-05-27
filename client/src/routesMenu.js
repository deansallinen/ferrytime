import React from "react";
import styled from "styled-components";

const Menu = styled.ul`
  list-style-type: none;
  line-height: 2rem;
  padding-left: 0;
`;

const MenuItem = styled.li``;

class RoutesMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      activeRoute: 1,
      routes: []
    };
    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(e) {
    // e.preventDefault();
    this.props.onRouteChange(e.target.id);
  }

  componentDidMount() {
    fetch("/api/routes")
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(
        data => {
          this.setState({
            isLoaded: true,
            routes: data
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
    const routes = this.state.routes;
    return (
      <Menu>
        <MenuItem id="0">All Routes</MenuItem>
        {routes.map(route => (
          <MenuItem key={route.id}>
            <a onClick={this.changeRoute} id={route.id}>
              {route.routeName}
            </a>
          </MenuItem>
        ))}
      </Menu>
    );
  }
}

export default RoutesMenu;
