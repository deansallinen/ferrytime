import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 1.5rem 0 0;
`

const RouteHeader = props => {
  return (
    <Header>
      <h2>{props.routeName}</h2>
      <p>{props.averageSailing}</p>
    </Header>
  )
}

export default RouteHeader
