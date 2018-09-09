import React from 'react'
import Clock from './clock'
import styled from 'styled-components'
import Link from 'gatsby-link'

const AppHeader = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`

const Branding = styled.h1``

const Header = ({ siteTitle }) => {
  return (
    <AppHeader>
      <h3>Menu</h3>
      <Branding>
        <Link
          to="/"
          style={{
            color: 'rebeccapurple',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </Branding>
      <Clock />
    </AppHeader>
  )
}

export default Header
