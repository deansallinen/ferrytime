import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

const SailingContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-areas: "time vessel status";
  grid-template-columns: 1fr 1fr 1fr;
  align-items: baseline;
`;

const SailingTime = styled.h2``;

const SailingStatus = styled.div``;

const SailingVessel = styled.p``;

const Sailing = props => {
  return (
    <SailingContainer>
      <SailingTime>{format(props.scheduledDeparture, "HH:mm")} </SailingTime>
      <SailingVessel>{props.vessel}</SailingVessel>
      {/* {props.sailingStatus && <span>Status: {props.sailingStatus}</span>} */}
      <SailingStatus>{props.sailingStatus}</SailingStatus>
    </SailingContainer>
  );
};

export default Sailing;
