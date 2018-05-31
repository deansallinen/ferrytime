import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

const SailingContainer = styled.div`
  display: grid;
  grid-template-areas: "time vessel status";
  grid-template-columns: 6rem 1fr auto;
  align-items: baseline;
  margin-right: 1.5rem;
`;

const SailingTime = styled.h2``;

const SailingStatus = styled.div`
  background: ${props =>
    props.status === "On Time" ? "white" : "palevioletred"};
  color: ${props => (props.status === "On Time" ? "green" : "white")};
  border: ${props =>
    props.status === "On Time" ? "2px solid green" : "2px solid palevioletred"};
  padding: 1rem;
  border-radius: 3px;
  text-align: right;
`;

const SailingVessel = styled.p``;

const Sailing = props => {
  return (
    <SailingContainer>
      <SailingTime>{format(props.scheduledDeparture, "HH:mm")} </SailingTime>

      <SailingVessel>{props.vessel}</SailingVessel>

      {props.sailingStatus && (
        <SailingStatus status={props.sailingStatus}>
          {props.sailingStatus}
        </SailingStatus>
      )}
    </SailingContainer>
  );
};

export default Sailing;
