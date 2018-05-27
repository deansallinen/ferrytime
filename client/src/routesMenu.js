import React from "react";
import styled from "styled-components";

const Menu = styled.div`
  grid-area: menu;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.a`
  cursor: pointer;
  padding: 1.5rem;

  &:hover {
    background: #eee;
  }
`;

class RoutesMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
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
        {/* <MenuItem id="0">All Routes</MenuItem> */}
        {routes.map(route => (
          <MenuItem onClick={this.changeRoute} id={route.id} key={route.id}>
            {" "}
            {route.routeName}
          </MenuItem>
        ))}
      </Menu>
    );
  }
}

export default RoutesMenu;
