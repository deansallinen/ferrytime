import React from "react";
import Clock from "./clock";
import styled from "styled-components";

const Header = styled.header`
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const RouteHeader = props => {
  return (
    <Header>
      <h2>{props.routeName}</h2>
      <Clock />
    </Header>
  );
};

export default RouteHeader;
