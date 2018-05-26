import React from "react";
import Sailing from "./sailing";
const data = require("./data.json");

const sailings = data.map(sailing => (
  <Sailing
    vessel={sailing.vessel}
    sailingDate={sailing.sailingDate}
    scheduledDeparture={sailing.scheduledDeparture}
    sailingStatus={sailing.sailingStatus}
    key={sailing.id}
  />
));

const styles = {
  // 'background-color': "#666"
};

class Schedule extends React.Component {
  render() {
    return <div style={styles}>{sailings}</div>;
  }
}

export default Schedule;
