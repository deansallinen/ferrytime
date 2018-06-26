import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  display: grid;
  margin: 1rem;
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
