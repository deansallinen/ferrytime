import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

const SailingContainer = styled.div`
  display: grid;
  grid-template-areas: 'time vessel status';
  grid-template-columns: auto 1fr 1fr 1fr 1fr;
  align-items: baseline;
  margin-right: 1.5rem;
`

const SailingTime = styled.h2``

const SailingStatus = styled.div`
  background: ${props =>
    props.status === 'On Time' ? 'white' : 'palevioletred'};
  color: ${props => (props.status === 'On Time' ? 'green' : 'white')};
  border: ${props =>
    props.status === 'On Time' ? '2px solid green' : '2px solid palevioletred'};
  padding: 1rem;
  border-radius: 3px;
  text-align: right;
`

const timeOf = date => {
  if (date) {
    return format(new Date(date).toLocaleString(), 'HH:mm')
  }
}

const SailingVessel = styled.p``

const Sailing = props => {
  return (
    <SailingContainer>
      <SailingTime>{timeOf(props.scheduledDeparture)}</SailingTime>
      <div>{timeOf(props.actualDeparture)}</div>
      <SailingVessel>{props.vessel}</SailingVessel>
      <div>{timeOf(props.eta)}</div>

      {props.sailingStatus && (
        <SailingStatus status={props.sailingStatus}>
          {props.sailingStatus}
        </SailingStatus>
      )}
    </SailingContainer>
  )
}

export default Sailing
