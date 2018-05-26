import React from "react";
import Clock from "./clock";

const styles = {
  padding: "0 1rem",
  display: "flex",
  "justify-content": "space-between",
  "align-items": "baseline"
};

export default props => {
  return (
    <div style={styles}>
      <h2>{props.routeName}</h2>
      <Clock />
    </div>
  );
};
