import React from "react";
import AllRoutesItem from "./allRoutesItem";

class AllRoutesMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: []
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
            items: data.map(route => route.routeName)
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
    const items = this.state.items;
    return <ul> {items.map(item => <li key={item}>{item}</li>)} </ul>;
  }
}

export default AllRoutesMenu;
