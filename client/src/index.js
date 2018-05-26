import React from "react";
import { render } from "react-dom";
import Content from "./content";
import "./index.css";
import RoutesMenu from "./routesMenu";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

// const Content = styled(Content)``;

const App = () => (
  <Wrapper>
    <RoutesMenu className="routesMenu" />
    <Content />
  </Wrapper>
);

render(<App />, document.getElementById("root"));
