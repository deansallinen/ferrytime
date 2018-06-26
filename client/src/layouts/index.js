import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import AppMenu from '../components/menu'
import Header from '../components/header'
import './index.css'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 1500px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: 'header' 'schedule' 'menu';
  column-gap: 1.5rem;
`

const Layout = ({ children, data }) => (
  <Wrapper>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <AppMenu />
    <div>{children()}</div>
  </Wrapper>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
