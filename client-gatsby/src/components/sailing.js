import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

const SailingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  margin: 1rem;
`

const SailingTime = styled.h2`
  font-family: monospace;
`

const SailingStatusContainer = styled.div``

const SailingStatus = styled.div`
  background: ${props =>
    props.status === 'On Time' ? 'white' : 'palevioletred'};
  color: ${props => (props.status === 'On Time' ? 'green' : 'white')};
  border: ${props =>
    props.status === 'On Time' ? '2px solid green' : '2px solid palevioletred'};
  padding: 0.5rem;
  border-radius: 3px;
  font-family: sans-serif;
`

const timeOf = date => {
  if (date) {
    return format(new Date(date).getTime(), 'HH:mm')
  }
}

const SailingVessel = styled.h6``

const Sailing = props => {
  return (
    <SailingContainer>
      <SailingTime>
        {timeOf(props.scheduledDeparture)} ==> {timeOf(props.eta)}
      </SailingTime>
      {/* <SailingTime>{timeOf(props.actualDeparture)}</SailingTime> */}
      {/* <SailingVessel>{props.vessel}</SailingVessel> */}
      {/* <SailingTime>{timeOf(props.eta)}</SailingTime> */}

      {props.sailingStatus && (
        <SailingStatusContainer>
          <SailingStatus status={props.sailingStatus}>
            {props.sailingStatus}
          </SailingStatus>
        </SailingStatusContainer>
      )}
    </SailingContainer>
  )
}

export default Sailing
